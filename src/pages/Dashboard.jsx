// import React from "react";
// import "./Dashboard.css";
// function Dashboard() {
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   return (
//     <div>
//       <h1>Welcome to Dashboard 🎉</h1>

//       <button onClick={handleLogout}>
//         Logout
//       </button>
//     </div>
//   );
// }

// export default Dashboard;
import React from "react";
import "./Dashboard.css";

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <h1>Welcome to Dashboard 🎉</h1>

        <p>You are successfully logged in.</p>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
