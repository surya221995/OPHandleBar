// import React, { useState } from "react";

// const PostToNode = () => {
//   const [message, setMessage] = useState("");
//   const [status, setStatus] = useState("");

//   const handleSend = async () => {
//     try {
//       const response = await fetch("http://192.168.1.216:1880/handlebar-status", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           message: message,
//           time: new Date().toISOString(),
//         }),
//       });

//       if (response.ok) {
//         setStatus("Data sent successfully ✅");
//         setMessage("");
//       } else {
//         setStatus("Error sending data ❌");
//       }
//     } catch (error) {
//       setStatus("Server not reachable ❌");
//       console.error(error);
//     }
//   };

//   return (
//     <div style={{ border: "1px solid gray", padding: 20 }}>
//       <h3>Send Data to Node-RED</h3>

//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Enter message"
//       />

//       <button onClick={handleSend} style={{ marginLeft: 10 }}>
//         Send
//       </button>

//       <p>{status}</p>
//     </div>
//   );
// };

// export default PostToNode;

// Above is the componenet to call this api after process completed successfully ! we need to define this as Function
//so , define not define component define it as function

// nodecommunication.js
export const handlebarPost = async (message) => {
  try {
    const response = await fetch(
      "http://192.168.1.216:1880/handlebar-status",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          time: new Date().toISOString(),
        }),
      }
    );

    if (!response.ok) throw new Error("Error sending data");
    return { status: "success" };
  } catch (err) {
    console.error(err);
    return { status: "error" };
  }
};