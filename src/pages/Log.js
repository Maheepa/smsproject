import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import "./Log.css";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const logsRef = ref(db, "logs");

    onValue(logsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const logsList = Object.keys(data)
          .map((key) => ({ id: key, ...data[key] }))
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by newest first
        setLogs(logsList);
      } else {
        setLogs([]);
      }
    });
  }, []);

  return (
    <div>
      <Navbar />
      
      <div className="log-container">
        <h2>Recent Logs</h2>
        <table className="log-table" border={0}>
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.user}</td>
                  <td>{log.description}</td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No logs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
