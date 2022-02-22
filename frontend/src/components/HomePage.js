import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Typography, Grid, ButtonGroup } from "@material-ui/core";

const center = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

function HomePage(props) {
  const [roomCode, setRoomCode] = useState(null);

  return (
    <div style={center}>
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            Listen Together
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup variant="contained" color="primary">
            <Button
              variant="contained"
              color="primary"
              to="/create-room"
              component={Link}
            >
              Create Room
            </Button>
            <Button variant="contained" color="secondary">
              Join Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
