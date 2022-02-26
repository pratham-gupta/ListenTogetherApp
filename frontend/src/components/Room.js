import React from "react";
import Grid from "@material-ui/core/Grid";
import YoutubePlayer from "./YoutubePlayer";
import SearchAppBar from "./Navbar";

function Room(props) {
  return (
    <div className="center">
      <Grid container alignItems="center">
        <Grid item align="center" xs={12}>
          <SearchAppBar />
        </Grid>
        <Grid item align="center" xs={12}>
          <YoutubePlayer />
        </Grid>
        <h1> this is room page. {props.roomCode}</h1>
      </Grid>
    </div>
  );
}

export default Room;
