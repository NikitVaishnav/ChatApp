import React from "react";

const Dashboard = () => {
  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background: "#343a40",
        color: "#f8f9fa",
        padding: 0,
      }}
    >
      <div className="row" style={{ height: "100vh" }}>
        {/* Sidebar */}
        <div
          className="col-12 col-md-4 col-lg-3 p-0"
          style={{
            background: "#23272f",
            borderRight: "1px solid #444",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <div className="p-3 border-bottom" style={{ borderColor: "#444" }}>
            <h4 style={{ color: "#0d6efd" }}>ChatApp</h4>
          </div>
          <div>
            {/* Example chat list */}
            <ul className="list-group list-group-flush">
              <li
                className="list-group-item"
                style={{
                  background: "#23272f",
                  color: "#f8f9fa",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <strong>Jane Doe</strong>
                <br />
                <small style={{ color: "#b0b3b8" }}>Hey, how are you?</small>
              </li>
              <li
                className="list-group-item"
                style={{
                  background: "#23272f",
                  color: "#f8f9fa",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <strong>John Smith</strong>
                <br />
                <small style={{ color: "#b0b3b8" }}>Let's catch up!</small>
              </li>
              {/* Add more chats here */}
            </ul>
          </div>
        </div>

        {/* Chat Window */}
        <div className="col-12 col-md-8 col-lg-9 d-flex flex-column p-0" style={{ height: "100%" }}>
          {/* Chat header */}
          <div
            className="p-3 border-bottom"
            style={{
              background: "#23272f",
              borderColor: "#444",
              minHeight: "60px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <strong>Jane Doe</strong>
            <span className="ms-2" style={{ color: "#0d6efd", fontSize: "0.9em" }}>
              online
            </span>
          </div>
          {/* Chat messages */}
          <div
            className="flex-grow-1 p-3"
            style={{
              overflowY: "auto",
              background: "#343a40",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/* Example messages */}
            <div style={{ alignSelf: "flex-start", maxWidth: "70%" }}>
              <div
                style={{
                  background: "#23272f",
                  color: "#f8f9fa",
                  borderRadius: "15px",
                  padding: "10px 16px",
                  marginBottom: "4px",
                }}
              >
                Hi there!
              </div>
              <small style={{ color: "#b0b3b8" }}>Jane • 10:00 AM</small>
            </div>
            <div style={{ alignSelf: "flex-end", maxWidth: "70%" }}>
              <div
                style={{
                  background: "#0d6efd",
                  color: "#fff",
                  borderRadius: "15px",
                  padding: "10px 16px",
                  marginBottom: "4px",
                }}
              >
                Hello! How are you?
              </div>
              <small style={{ color: "#b0b3b8" }}>You • 10:01 AM</small>
            </div>
            {/* Add more messages here */}
          </div>
          {/* Message input */}
          <form className="p-3 border-top" style={{ background: "#23272f", borderColor: "#444" }}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type your message..."
                style={{
                  background: "#181a20",
                  color: "#f8f9fa",
                  border: "1px solid #444",
                }}
              />
              <button className="btn btn-primary" type="submit" style={{ border: "none" }}>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;