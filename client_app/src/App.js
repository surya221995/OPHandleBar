// import React, { useState, useEffect } from "react";

// function App() {
//   const taskName = "HandleBar";

//   const [currentStep, setCurrentStep] = useState(1);
//   const [completedSteps, setCompletedSteps] = useState([]);
//   const [imageUrl, setImageUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const totalSteps = 4;

//   const loadStepImage = async (step) => {
//     setLoading(true);
//     setImageUrl("");
// // ************ POSTMAN *********
//  //http://localhost:5000/api/steps/image/:taskName/:stepNumber
//  //params :
//  //[{"key":"taskName","value":"HandleBar"}]
//  //[{"key":"stepNumber","value":"1"}] 
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/steps/image/${encodeURIComponent(
//           taskName
//         )}/${step}`
//       );

//       if (!response.ok) {
//         throw new Error("Step not found");
//       }

//       const blob = await response.blob();
//       const imageObjectURL = URL.createObjectURL(blob);
//       setImageUrl(imageObjectURL);
//       setCurrentStep(step);
//     } catch (err) {
//       handleProcessComplete();
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadStepImage(1);
//   }, []);

//   const handleScan = (e) => {
//     e.preventDefault();
//     const scannedStep = parseInt(e.target.stepInput.value);

//     if (scannedStep === currentStep) {
//       setCompletedSteps((prev) => [...prev, scannedStep]);
//       loadStepImage(currentStep + 1);
//     }

//     e.target.reset();
//   };

//   const handleProcessComplete = () => {
//     setModalMessage("🎉 Process Completed Successfully!");
//     setShowModal(true);

//     setTimeout(() => {
//       setModalMessage("🔄 New Cycle Started");

//       setTimeout(() => {
//         setShowModal(false);
//         setCompletedSteps([]);
//         loadStepImage(1);
//       }, 2000);
//     }, 3000);
//   };

//  return (
//   <div className="bg-light vh-100 vw-100 d-flex flex-column">

//     {/* HEADER */}
//     <div className="bg-primary text-white text-center py-3 shadow">
//       <h2 className="fw-bold m-0">OPERATOR GUIDANCE & CONFIRMATION SYSTEM</h2>
//       <h4 className="m-0">{taskName}</h4>
//     </div>

//     {/* MAIN CONTENT */}
//     <div className="flex-grow-1 container-fluid d-flex flex-column justify-content-center">

//       {/* Scanner */}
//       <div className="row justify-content-center mt-4">
//         <div className="col-md-6">
//           <form onSubmit={handleScan}>
//             <div className="input-group input-group-lg">
//               <input
//                 type="text"
//                 name="stepInput"
//                 className="form-control text-center fw-bold"
//                 placeholder="Scan Current Step Number"
//                 autoFocus
//                 required
//               />
//               <button
//                 className="btn btn-success px-4"
//                 type="submit"
//                 disabled={loading}
//               >
//                 {loading ? "Loading..." : "Scan"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* IMAGE */}
//       {imageUrl && (
//         <div className="text-center my-4 flex-grow-1 d-flex flex-column justify-content-center">
//           <h3 className="text-success fw-bold mb-3">
//             Showing Step {currentStep}
//           </h3>
//           <img
//             src={imageUrl}
//             alt={`Step ${currentStep}`}
//             className="img-fluid mx-auto rounded shadow"
//             style={{
//               maxHeight: "60vh",
//               objectFit: "contain"
//             }}
//           />
//         </div>
//       )}

//       {/* STEP PROGRESS */}
//       <div className="row text-center px-5 pb-4">
//         {[1, 2, 3, 4].map((step) => (
//           <div className="col-3" key={step}>
//             <div
//               className={`py-4 rounded fw-bold ${
//                 completedSteps.includes(step)
//                   ? "bg-success text-white"
//                   : "bg-white border border-2"
//               }`}
//               style={{
//                 fontSize: "50px",
//                 transition: "0.3s",
//               }}
//             >
//               Step - {step}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* FULLSCREEN MODAL */}
//     {showModal && (
//       <div
//         className="modal fade show d-block"
//         style={{
//           backgroundColor: "rgba(0,0,0,0.8)"
//         }}
//       >
//         <div className="modal-dialog modal-dialog-centered modal-fullscreen">
//           <div className="modal-content d-flex justify-content-center align-items-center text-center">
//             <h1 className="display-2 fw-bold text-success">
//               {modalMessage}
//             </h1>
//           </div>
//         </div>
//       </div>
//     )}

//   </div>
// );

// }

// export default App;


// ----------------------------------------------------------------
// import React, { useState, useEffect } from "react";

// function App() {
//   const taskName = "HandleBar";

//   const [currentStep, setCurrentStep] = useState(1);
//   const [completedSteps, setCompletedSteps] = useState([]);
//   const [imageUrl, setImageUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [stepDescriptions, setStepDescriptions] = useState({});

//   const totalSteps = 4;

//   const loadStepImage = async (step) => {
//     setLoading(true);
//     setImageUrl("");

//     // ************ POSTMAN *********
//     // http://localhost:5000/api/steps/image/:taskName/:stepNumber
//     // params :
//     // [{"key":"taskName","value":"HandleBar"}]
//     // [{"key":"stepNumber","value":"1"}]

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/steps/image/${encodeURIComponent(
//           taskName
//         )}/${step}`
//       );

//       if (!response.ok) {
//         throw new Error("Step not found");
//       }

//       const blob = await response.blob();
//       const imageObjectURL = URL.createObjectURL(blob);
//       setImageUrl(imageObjectURL);
//       setCurrentStep(step);
//     } catch (err) {
//       handleProcessComplete();
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load first image
//   useEffect(() => {
//     loadStepImage(1);
//   }, []);

//   // ✅ Fetch step descriptions from API
//   useEffect(() => {
//     const fetchTaskSteps = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/tasks");
//         const data = await response.json();

//         const task = data.find((t) => t.taskName === taskName);

//         if (task && task.Steps) {
//           const stepMap = {};
//           task.Steps.forEach((step) => {
//             stepMap[step.stepNumber] = step.description;
//           });
//           setStepDescriptions(stepMap);
//         }
//       } catch (error) {
//         console.error("Failed to load task descriptions", error);
//       }
//     };

//     fetchTaskSteps();
//   }, []);

//   const handleScan = (e) => {
//     e.preventDefault();
//     const scannedStep = parseInt(e.target.stepInput.value);

//     if (scannedStep === currentStep) {
//       setCompletedSteps((prev) => [...prev, scannedStep]);
//       loadStepImage(currentStep + 1);
//     }

//     e.target.reset();
//   };

//   const handleProcessComplete = () => {
//     setModalMessage("🎉 Process Completed Successfully!");
//     setShowModal(true);

//     setTimeout(() => {
//       setModalMessage("🔄 New Cycle Started");

//       setTimeout(() => {
//         setShowModal(false);
//         setCompletedSteps([]);
//         loadStepImage(1);
//       }, 2000);
//     }, 3000);
//   };

//   return (
//     <div className="bg-light vh-100 vw-100 d-flex flex-column">

//       {/* HEADER */}
//       <div className="bg-primary text-white text-center py-3 shadow">
//         <h2 className="fw-bold m-0">
//           OPERATOR GUIDANCE & CONFIRMATION SYSTEM
//         </h2>
//         <h4 className="m-0">{taskName}</h4>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="flex-grow-1 container-fluid d-flex flex-column justify-content-center">

//         {/* Scanner */}
//         <div className="row justify-content-center mt-4">
//           <div className="col-md-6">
//             <form onSubmit={handleScan}>
//               <div className="input-group input-group-lg">
//                 <input
//                   type="text"
//                   name="stepInput"
//                   className="form-control text-center fw-bold"
//                   placeholder="Scan Current Step Number"
//                   autoFocus
//                   required
//                 />
//                 <button
//                   className="btn btn-success px-4"
//                   type="submit"
//                   disabled={loading}
//                 >
//                   {loading ? "Loading..." : "Scan"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* IMAGE */}
//         {imageUrl && (
//           <div className="text-center my-4 flex-grow-1 d-flex flex-column justify-content-center">
//             <h3 className="text-success fw-bold mb-3">
//               Showing Step {currentStep}
//             </h3>
//             <img
//               src={imageUrl}
//               alt={`Step ${currentStep}`}
//               className="img-fluid mx-auto rounded shadow"
//               style={{
//                 maxHeight: "60vh",
//                 objectFit: "contain",
//               }}
//             />
//           </div>
//         )}

//         {/* STEP PROGRESS */}
//         <div className="row text-center px-5 pb-4">
//           {[1, 2, 3, 4].map((step) => (
//             <div className="col-3" key={step}>
//               <div
//                 className={`py-4 rounded fw-bold ${
//                   completedSteps.includes(step)
//                     ? "bg-success text-white"
//                     : "bg-white border border-2"
//                 }`}
//                 style={{
//                   fontSize: "28px",
//                   transition: "0.3s",
//                 }}
//               >
//                 {/* ✅ Show Description Instead of Step Name */}
//                 {stepDescriptions[step] || `Step ${step}`}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* FULLSCREEN MODAL */}
//       {showModal && (
//         <div
//           className="modal fade show d-block"
//           style={{
//             backgroundColor: "rgba(0,0,0,0.8)",
//           }}
//         >
//           <div className="modal-dialog modal-dialog-centered modal-fullscreen">
//             <div className="modal-content d-flex justify-content-center align-items-center text-center">
//               <h1 className="display-2 fw-bold text-success">
//                 {modalMessage}
//               </h1>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

//-------------------------------------------PHOTO AT RIGHT SIDE AND STEP+DESCRIPTIO AT LEFT SIDE -------
// import React, { useState, useEffect } from "react";
import React, { useState, useEffect, useRef } from "react"; //useref for autofocus


function App() {
  const taskName = "HandleBar Connection Checking";
  const inputRef = useRef(null);  //for auto focus


  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [stepDescriptions, setStepDescriptions] = useState({});
  const [fade, setFade] = useState(true);   // ✅ NEW


  const totalSteps = 6;

  // For Auto Focus on Mount
  useEffect(() => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
}, []);

// For Focus When Clicking Anywhere
useEffect(() => {
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  window.addEventListener("click", handleClick);

  return () => {
    window.removeEventListener("click", handleClick);
  };
}, []);


  // const loadStepImage = async (step) => {
  //   setLoading(true);
  //   setImageUrl("");

  //   // ************ POSTMAN *********
  //   // http://localhost:5000/api/steps/image/:taskName/:stepNumber
  //   // params :
  //   // [{"key":"taskName","value":"HandleBar"}]
  //   // [{"key":"stepNumber","value":"1"}]

  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/api/steps/image/${encodeURIComponent(
  //         taskName
  //       )}/${step}`
  //     );

  //     if (!response.ok) {
  //       throw new Error("Step not found");
  //     }

  //     const blob = await response.blob();
  //     const imageObjectURL = URL.createObjectURL(blob);
  //     setImageUrl(imageObjectURL);
  //     setCurrentStep(step);
  //   } catch (err) {
  //     handleProcessComplete();
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // following logic image effect only appling for single image ------------------------
//   const loadStepImage = async (step) => {
//   setLoading(true);
//   setFade(false);          // fade out first

//   try {
//     const response = await fetch(
//       `http://localhost:5000/api/steps/image/${encodeURIComponent(
//         taskName
//       )}/${step}`
//     );

//     if (!response.ok) {
//       throw new Error("Step not found");
//     }

//     const blob = await response.blob();
//     const imageObjectURL = URL.createObjectURL(blob);

//     setImageUrl(imageObjectURL);
//     setCurrentStep(step);

//     // small delay so transition triggers properly
//     setTimeout(() => {
//       setFade(true);       // fade in
//     }, 50);

//   } catch (err) {
//     handleProcessComplete();
//   } finally {
//     setLoading(false);
//   }
// };


const loadStepImage = async (step) => {
  setLoading(true);
  setFade(false);   // 🔹 fade out current image

  setTimeout(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/steps/image/${encodeURIComponent(
          taskName
        )}/${step}`
      );

      if (!response.ok) {
        throw new Error("Step not found");
      }

      const blob = await response.blob();
      const imageObjectURL = URL.createObjectURL(blob);

      setImageUrl(imageObjectURL);
      setCurrentStep(step);

      setFade(true);   // 🔹 fade in new image

    } catch (err) {
      handleProcessComplete();
    } finally {
      setLoading(false);
    }
  }, 300);   // match this with transition duration
};

  useEffect(() => {
    loadStepImage(1);
  }, []);

  useEffect(() => {
    const fetchTaskSteps = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks");
        const data = await response.json();

        const task = data.find((t) => t.taskName === taskName);

        if (task && task.Steps) {
          const stepMap = {};
          task.Steps.forEach((step) => {
            stepMap[step.stepNumber] = step.description;
          });
          setStepDescriptions(stepMap);
        }
      } catch (error) {
        console.error("Failed to load descriptions", error);
      }
    };

    fetchTaskSteps();
  }, []);

  const handleScan = (e) => {
    e.preventDefault();
    const scannedStep = parseInt(e.target.stepInput.value);

    if (scannedStep === currentStep) {
      setCompletedSteps((prev) => [...prev, scannedStep]);
      loadStepImage(currentStep + 1);
    }

    e.target.reset();
  };

  const handleProcessComplete = () => {
    setModalMessage("🎉 Process Completed Successfully!");
    setShowModal(true);

    setTimeout(() => {
      setModalMessage("🔄 New Cycle Started");

      setTimeout(() => {
        setShowModal(false);
        setCompletedSteps([]);
        loadStepImage(1);
      }, 2000);
    }, 3000);
  };

  return (
    <div className="bg-light vh-100 d-flex flex-column">

      {/* HEADER */}
      <div className="bg-primary text-white text-center shadow"
          style={{
      background: "linear-gradient(160deg, #4783f3, #4783f3)", // Professional Blue
      alignItems: "center",
      padding: "70px 20px", // top/bottom 60px, left/right 20px
      justifyContent: "center",
      boxShadow: "-4px 0 12px rgba(0,0,0,0.3)",
    }}>
        <h1 className="fw-bold m-0"
        style={{ fontSize:"70px"}}>
          OPERATOR GUIDANCE & CONFIRMATION SYSTEM
        </h1>
        
      </div>



      {/* MAIN LAYOUT */}
      <div className="container-fluid flex-grow-1 mt-4">
        <div className="row h-100">

   

          {/* LEFT SIDE - STEP DESCRIPTION */}
          <div className="col-md-4 border-end bg-white p-5">

                         {/* SCANNER */}
      <div className="`mb-5 p-3 rounded shadow-sm fw-bold" >
        <form onSubmit={handleScan}>

          <div className="`mb-5 p-3 rounded shadow-sm fw-bold">
            <input
              ref={inputRef}   // ✅ attach ref For Auto Focus
              type="text"
              name="stepInput"
              className="form-control text-center fw-bold p-3"
              placeholder="Scan Current Step Number"
              autoFocus
              required
              style={{
                padding: "20px",
                fontSize: "40px",
                borderRadius: "12px",
                border: "2px solid #007bff",
                backgroundColor: "#f8f9fa",
                color: "#333",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                textAlign: "center"
              }}
            />
            {/* <button
              className="btn btn-success `mb-5 p-3 rounded shadow-sm fw-bold"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Scan"}
            </button> */}
          </div>
        </form>
      </div>

            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div
                key={step}
                // spacing  mb-5 padding -3
                className={`mb-5 p-3 rounded shadow-sm fw-bold ${step === currentStep
                    ? "bg-warning"
                    : completedSteps.includes(step)
                      ? "bg-success text-white"
                      : "bg-secondary text-white"
                  }`}
                style={{
                  fontSize: "50px",
                  transition: "0.3s",
                   margin: "150px 10px 500px 10px" ,
                }}
              >
                Step {step} - {stepDescriptions[step] || "Loading..."}
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - IMAGE */}
          {/* <div className="col-md-8 d-flex align-items-center justify-content-center bg-light">
            <div>
              <h4 className="m-0">HADNLE-BAR CONNECTIONS </h4>
            </div>
            
            {imageUrl ? (
              // <img
              //   src={imageUrl}
              //   alt={`Step ${currentStep}`}
              //   className="img-fluid rounded shadow"
              //   style={{
              //     maxHeight: "80vh",
              //     objectFit: "contain",
              //   }}
              // />


  // following img for smooth transition Effect
              <img
  src={imageUrl}
  alt={`Step ${currentStep}`}
  className="img-fluid rounded shadow"
  style={{
    maxHeight: "80vh",
    objectFit: "contain",
    opacity: fade ? 1 : 0,
    transition: "opacity 0.6s ease-in-out",
  }}/>

  //-----------------------------------------------
//   <img
//   key={imageUrl}   // 🔥 VERY IMPORTANT (forces re-render)
//   src={imageUrl}
//   alt={`Step ${currentStep}`}
//   className="img-fluid rounded shadow"
//   style={{
//     maxHeight: "80vh",
//     objectFit: "contain",
//     opacity: fade ? 1 : 0,
//     transform: fade ? "scale(1)" : "scale(0.95)",
//     transition: "opacity 0.3s ease, transform 0.3s ease",
//   }}
// />

            ) : (
              <h3 className="text-muted">
                {loading ? "Loading Image..." : "No Image Available"}
              </h3>
            )}
          </div> */}

<div className="col-md-8 position-relative d-flex align-items-center justify-content-center bg-light">

  {/* Professional Vertical Side Panel */}
  <div
    style={{
      position: "absolute",
      right: "0",
      top: "0",
      bottom: "0",
      width: "140px",  // 🔥 Increased Width
      background: "linear-gradient(180deg, #eff2f7, #03041e)", // Professional Blue
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "-4px 0 12px rgba(0,0,0,0.3)",
    }}
  >
    <h4
      style={{
        color: "#efeef4",
        writingMode: "vertical-rl",

// writing-mode: vertical-rl; /* vertical, right-to-left */
// writingmode: "vertical-lr", /* vertical, left-to-right */
// writing-mode: sideways-rl; /* sideways text, rotated */
// writingmode: "sideways-lr",

        transform: "rotate(180deg)",
        fontWeight: "700",
        fontSize: "70px",   // 🔥 Bigger Font
        letterSpacing: "3px",
        textAlign: "center",
      }}
    >
      HANDLE-BAR CONNECTIONS
    </h4>
  </div>

  {/* Centered Image */}
  {imageUrl ? (
    <img
      key={imageUrl}
      src={imageUrl}
      alt={`Step ${currentStep}`}
      className="img-fluid rounded shadow"
      style={{
        maxHeight: "80vh",
        objectFit: "contain",
        opacity: fade ? 1 : 0,
        transition: "opacity 0.6s ease-in-out",
      }}
    />
  ) : (
    <h3 className="text-muted">
      {loading ? "Loading Image..." : "No Image Available"}
    </h3>
  )}
</div>



        </div>
      </div>

      {/* FULLSCREEN MODAL */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.8)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-fullscreen">
            <div className="modal-content d-flex justify-content-center align-items-center text-center">
              <h1 className="display-2 fw-bold text-success">
                {modalMessage}
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

