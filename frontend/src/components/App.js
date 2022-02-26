import React, { Component } from "react";
import { render } from "react-dom";
import YoutubePlayer from "./YoutubePlayer";
import HomePage from "./HomePage";
import CreateRoomPage from "./CreateRoomPage";
// import { useState } from "react";
import Room from "./Room";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Routes,
} from "react-router-dom";
import { useState, useEffect } from "react";

const center = {
  position: "absolute",
  top: "50%",
  left: "50%",
};

function App() {
  const [roomCode, setroomCode] = useState("null_value");

  function handlerRoomCode(e) {
    console.log("room code handler called.");
    console.log(typeof e);
    setroomCode(e.target);
    console.log("val of room code in app: ");
    console.log(roomCode);
  }

  // useEffect(() => {
  //   async function getRoomCode() {
  //     fetch("api/user-in-room")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setroomCode(data.room_code);
  //       })
  //       .then(console.log(roomCode));
  //   }
  // }, []);

  return (
    <Router>
      <div className="center">
        {/* <h1>React App.</h1> */}
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/player" element={<YoutubePlayer />} />
          <Route
            path="/create-room"
            element={
              <CreateRoomPage
                roomCode={roomCode}
                handlerRoomCode={handlerRoomCode}
              />
            }
          />
          <Route
            path="/room/:roomCode"
            element={<Room roomCode={roomCode} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
