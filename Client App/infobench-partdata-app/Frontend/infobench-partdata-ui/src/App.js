//------------------------------------------------------------------------

import React, { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
// import PostToNode from "./component/nodecommunication.js"  Above is Component
import {handlebarPost} from "./component/nodecommunication.js"

function App() {
  const taskName = "HandleBar Connection Checking";
  const inputRef = useRef(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [stepDescriptions, setStepDescriptions] = useState({});
  const [fade, setFade] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Set actual viewport height as CSS var
  useEffect(() => {
    const setHeight = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      );
    };
    window.addEventListener("resize", setHeight);
    setHeight();
    return () => window.removeEventListener("resize", setHeight);
  }, []);

  // auto focus on mount
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);


  // auto focus whenever clicking anywhere
  useEffect(() => {
    const handleGlobalClick = () => {
      if (inputRef.current) inputRef.current.focus();
    };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  // initial image load
  useEffect(() => {
    loadStepImage(1);
  }, []);

  const loadStepImage = async (step) => {
    setLoading(true);
    setFade(false);

    setTimeout(async () => {
      try {
        const res = await fetch(
          `http://192.168.1.216:5000/api/steps/image/${encodeURIComponent(
            taskName
          )}/${step}`
        );
        if (!res.ok) throw new Error("No image");
        const blob = await res.blob();
        setImageUrl(URL.createObjectURL(blob));
        setCurrentStep(step);
        setFade(true);
      } catch (err) {
        // no image → complete cycle
        handleProcessComplete();
      }
      setLoading(false);
    }, 200);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://192.168.1.216:5000/api/tasks");
        const data = await response.json();
        const task = data.find((t) => t.taskName === taskName);
        if (task && task.Steps) {
          const map = {};
          task.Steps.forEach((s) => (map[s.stepNumber] = s.description));
          setStepDescriptions(map);
        }
      } catch {}
    })();
  }, []);

  const handleScan = (e) => {
    e.preventDefault();
    const scanned = parseInt(e.target.stepInput.value);

    if (scanned === currentStep) {
      // mark this step complete
      setCompletedSteps((prev) => [...prev, scanned]);

      // load next step image
      loadStepImage(currentStep + 1);
    }

    e.target.reset();
  };

  // Because it is calling api so Async and await keyword is used --------------------------------
  const handleProcessComplete =  async() => {
    // ensure last step is shown as completed
    setCompletedSteps((prev) => {
      if (!prev.includes(currentStep)) {
        return [...prev, currentStep];
      }
      return prev;
    });

    setModalMessage("🎉 Process Completed Successfully!");

    setShowModal(true);

     // Call API here after popup   which is handlebarPost is if
     //  functional component we can call after Process completed
  await handlebarPost("ok"); //--------------------CALL Function

  //Give Not ok feedback after few sec for new cycle
  setTimeout(async () => {
  try {
    await handlebarPost("nk");
  } catch (error) {
    console.error("handlebarPost failed:", error);
  }
}, 2000);

    setTimeout(() => {
      setModalMessage("🔄 New Cycle Started");
      setTimeout(() => {
        setShowModal(false);
        setCompletedSteps([]);
        loadStepImage(1);
      
      }, 2000);
    }, 3000);
  };
//--------------------------After last step mark as green then only cycle completed popup should be come----



  return (
    <div
      style={{
        width: "100vw",
        height: "var(--app-height)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#4783f3",
          color: "white",
          textAlign: "center",
          padding: "18px",
          fontSize: "44px",
          fontWeight: "700",
        }}
      >
        OPERATOR GUIDANCE & CONFIRMATION SYSTEM
      </div>

      {/* MAIN */}
      <div
        style={{
          display: "flex",
          flex: 1,
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* LEFT SCROLL PANEL */}
        <div
          style={{
            width: "35%",
            padding: "10px",
            borderRight: "4px solid #007bff",
            overflowY: "auto",
          }}
        >
          <form onSubmit={handleScan}>
            <input
              ref={inputRef}
              type="text"
              name="stepInput"
              placeholder="Scan Step Number"
              required
              style={{
                width: "100%",
                fontSize: "30px",
                padding: "10px",
                border: "2px solid #007bff",
                borderRadius: "6px",
              }}
            />
          </form>

          {Object.keys(stepDescriptions).map((step) => (
            <div
              key={step}
              style={{
                marginTop: "15px",
                padding: "10px",
                backgroundColor:
                  parseInt(step) === currentStep
                    ? "#ffc107"
                    : completedSteps.includes(parseInt(step))
                    ? "#28a745"
                    : "#6c757d",
                color: "white",
                fontSize: "28px",
                borderRadius: "6px",
              }}
            >
              Step {step} - {stepDescriptions[step]}
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            width: "65%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* IMAGE FIXED DIV */}
          <div
            style={{
              height: "55%",
              display: "flex",
              padding : "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {imageUrl ? (
              <img
                key={imageUrl}
                src={imageUrl}
                alt=""
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                  opacity: fade ? 1 : 0,
                  transition: "opacity 0.5s",
                }}
              />
            ) : (
              <h3>{loading ? "Loading..." : "No Image"}</h3>
            )}
          </div>

          {/* QR DIV */}
          <div
            style={{
              height: "45%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3 style={{ fontSize: "26px", fontWeight: "700" }}>
              Scan To Confirm Step {currentStep}
            </h3>
            <QRCodeCanvas
              value={currentStep.toString()}
              size={180}
              bgColor="#fff"
              fgColor="#000"
            />
          </div>
        </div>

        {/* VERTICAL HANDLE BAR TEXT */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "140px",
            background: "linear-gradient(180deg, #eff2f7, #03041e)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontSize: "40px",
              fontWeight: "700",
              color: "#efeef4",
              letterSpacing: "2px",
            }}
          >
            HANDLE-BAR CONNECTIONS
          </div>
           {/* <PostToNode/> */}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          style={{
            backgroundColor: "rgb(68, 238, 96)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            color: "white",
            fontSize: "60px",
            fontWeight: "800",
          }}
        >
          {modalMessage}
        </div>
      )}
     
    </div>
  );
}

export default App;
