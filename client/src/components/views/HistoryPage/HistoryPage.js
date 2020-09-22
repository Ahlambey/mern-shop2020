// import React, { useEffect, useState } from "react";
// import Axios from "axios";
// import { response } from "express";

// export default function HistoryPage() {
//   const [History, setHistory] = useState([]);

//   useEffect(() => {
//     Axios.get("/api/users/getHisotry").then((response) => {
//       if (response.data.success) {
//         setHistory(response.data.history);
//       } else {
//         alert("Failed to get History");
//       }
//     });
//   }, []);

//   return (
//     <div style={{ width: "80px", margin: "3rem auto" }}>
//       <div style={{ textAlign: "center" }}>
//         <h1>History</h1>
//       </div>
//       <br />
//       <table>
//         <thead>
//           <tr>
//             <th>Payment Id</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Date of Purchase</th>
//           </tr>
//         </thead>
//         <tbody>
//           {History.map((item) => {
//             return (
//               <tr key={item._id}>
//                 <th>{item.paymentId}</th>
//                 <th>{item.price}</th>
//                 <th>{item.quantity}</th>
//                 <th>{item.dateOfPurchase}</th>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }
