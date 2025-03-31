// import React, { useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import Navbar from "../components/Navbar";
// import Logout from "../components/Logout";



// export default function Admin() {
//   const [user, setUser] = useState(null);
//   const auth = getAuth();

//   // Listen for authentication state changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
//       if (loggedInUser) {
//         setUser(loggedInUser); // Store the logged-in user's details
//       } else {
//         setUser(null); // No user is logged in
//       }
//     });

//     return () => unsubscribe(); // Cleanup listener on unmount
//   }, [auth]);

//   return (
//     <div>
//       <Navbar />
      
//       <div className="admin-container">
//         <h2>Admin Dashboard</h2>
        
//         <div className="user-info">
//           <h3>Logged-in User:</h3>
//           {user ? (
//             <p><strong>Email:</strong> {user.email}</p>
//           ) : (
//             <p>No user is logged in</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import { getDatabase, ref, onValue, update } from "firebase/database";
// import Navbar from "../components/Navbar";

// export default function Admin() {
//   const [user, setUser] = useState(null);
//   const [users, setUsers] = useState([]); // Store all users
//   const auth = getAuth();
//   const db = getDatabase();

//   // Function to update user status and last login time
//   const updateUserStatus = (uid, status) => {
//     if (uid) {
//       const userRef = ref(db, `users/${uid}`);
//       const timestamp = new Date().toISOString(); // Current timestamp
//       update(userRef, {
//         status: status,
//         lastLogin: timestamp, // Always update last login time
//       });
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
//       if (loggedInUser) {
//         setUser(loggedInUser);
//         updateUserStatus(loggedInUser.uid, "online"); // Set user to online
//       } else {
//         setUser(null);
//       }
//     });

//     // Set user offline when browser is closed or refreshed
//     const handleUnload = () => {
//       if (user) {
//         updateUserStatus(user.uid, "offline");
//       }
//     };

//     window.addEventListener("beforeunload", handleUnload);

//     return () => {
//       unsubscribe();
//       window.removeEventListener("beforeunload", handleUnload);
//     };
//   }, [auth, db, user]);

//   // Fetch all users from Firebase
//   useEffect(() => {
//     const usersRef = ref(db, "users");
//     onValue(usersRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         setUsers(Object.values(data)); // Convert object to array
//       }
//     });
//   }, [db]);

//   // Logout function
//   const handleLogout = () => {
//     if (user) {
//       updateUserStatus(user.uid, "offline"); // Set user offline before logout
//       signOut(auth);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="admin-container">
//         <h2>Admin Dashboard</h2>

//         {/* Logged-in User Info */}
//         <div className="user-info">
//           <h3>Logged-in User:</h3>
//           {user ? <p><strong>Email:</strong> {user.email}</p> : <p>No user is logged in</p>}
//         </div>

//         {/* List of all users */}
//         <div className="users-list">
//           <h3>System Users</h3>
//           <table className="users-table">
//             <thead>
//               <tr>
//                 <th>Email</th>
//                 <th>Status</th>
//                 <th>Last Login</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((usr, index) => (
//                 <tr key={index}>
//                   <td>{usr.email}</td>
//                   <td style={{ color: usr.status === "online" ? "green" : "red" }}>
//                     {usr.status}
//                   </td>
//                   <td>{usr.lastLogin ? new Date(usr.lastLogin).toLocaleString() : "N/A"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Logout Button */}
//         {user && <button className="logout-btn" onClick={handleLogout}>Logout</button>}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, update } from "firebase/database";
import Navbar from "../components/Navbar";
import Slidebar from "../components/Slidebar";
import "./Admin.css";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]); // Store all users
  const auth = getAuth();
  const db = getDatabase();

  // Function to update user status, last login, and logout time
  const updateUserStatus = (uid, status) => {
    if (uid) {
      const userRef = ref(db, `users/${uid}`);
      const timestamp = new Date().toISOString(); // Get current timestamp

      const updates = status === "online"
        ? { status: "online", lastLogin: timestamp }
        : { status: "offline", lastLogout: timestamp };

      update(userRef, updates);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser);
        updateUserStatus(loggedInUser.uid, "online"); // Set user to online
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  // Fetch all users from Firebase
  useEffect(() => {
    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUsers(Object.values(data)); // Convert object to array
      }
    });
  }, [db]);

  // Logout function
  const handleLogout = () => {
    if (user) {
      updateUserStatus(user.uid, "offline"); // Set user offline before logout
      signOut(auth);
    }
  };

  // Handle logout when browser/tab is closed
  useEffect(() => {
    const handleUnload = () => {
      if (user) {
        updateUserStatus(user.uid, "offline"); // Update logout time on close
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [user]);

  return (
    <div className="bg-admin">
      <Navbar/>
      <div className="container-admin">
        <div className="left-section-admin"><Slidebar/></div>
          <div className="right-section-admin">
        <h2 className="heading-admin">Administrators</h2>
            <div className="admin-page">

        {/* Logged-in User Info */}
        <div className="user-info">
          <h3>Logged-in User:</h3>
          {user ? <p><strong>Email:</strong> {user.email}</p> : <p>No user is logged in</p>}
        </div>

        {/* List of all users */}
        <div className="users-list">
          <h3>System Users</h3>
          <table className="users-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Last Logout</th>
              </tr>
            </thead>
            <tbody>
              {users.map((usr, index) => (
                <tr key={index}>
                  <td>{usr.email}</td>
                  <td style={{ color: usr.status === "online" ? "green" : "red" }}>
                    {usr.status}
                  </td>
                  <td>{usr.lastLogin ? new Date(usr.lastLogin).toLocaleString() : "N/A"}</td>
                  <td>{usr.lastLogout ? new Date(usr.lastLogout).toLocaleString() : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}
