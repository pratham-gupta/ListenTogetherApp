import React from "react";
import Grid from "@material-ui/core/Grid";

function Room(props) {
  return (
    <Grid container>
      <h1> this is room page. {props.roomCode}</h1>
    </Grid>
  );
}

export default Room;
