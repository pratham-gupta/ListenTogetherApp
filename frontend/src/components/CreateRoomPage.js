// import { FormLabel, RadioGroup } from "@material-ui/core";
import React, { useState, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { FormHelperText } from "@mui/material";
import { ButtonGroup } from "@material-ui/core";
import { Link } from "react-router-dom";

function CreateRoomPage(props) {
  const [guestcanpause, setguestcanpause] = useState(false);
  const [maxusers, setmaxusers] = useState(4);
  const [votestoskip, setvotestoskip] = useState(1);
  const [roomtype, setroomtype] = useState("");
  const [roomCode, setroomCode] = useState(null);

  const RenderCreateRoomButton = () => {
    return (
      <Grid container spacing={1}>
        <Grid container item xs={12} align="center" spacing={0}>
          <Grid item xs={12} align="center" spacing={0}>
            <ButtonGroup>
              <Button
                variant="contained"
                color="primary"
                to="/"
                component={Link}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCreateRoomButtonPressed}
              >
                Create
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const handleRoomTypeChange = (e) => {
    setroomtype(e.target.value);
  };

  const handleMaxUsersChange = (e) => {
    setmaxusers(e.target.value);
  };

  const handleVotesToSkipChange = (e) => {
    setvotestoskip(e.target.value);
  };

  const handleGuestCanPauseChange = (e) => {
    setguestcanpause(e.target.value === "true" ? true : false);
  };

  const handleCreateRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        guest_can_pause: guestcanpause,
        votes_to_skip: votestoskip,
        max_users: maxusers,
        room_type: roomtype,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then(console.log(requestOptions))
      .then((response) => response.json())
      // .then((data) => console.log(data))
      // .then((data) => console.log(data.room_code))
      .then((data) => {
        console.log(data.room_code);
        props.handlerRoomCode(data.room_code);
        console.log(data);
      }); //redirect to room page using the code gotten in response.
  };

  return (
    <div>
      <h1> create room page</h1>

      <Grid container spacing={12} align="center">
        {/* choice field to ask room type,
        Choices: "Virtual party", "House Party" */}
        <FormControl component="fieldset">
          <Grid item spacing={12} align="center">
            <FormLabel id="demo-radio-buttons-group-label-playback">
              Room Type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={roomtype}
              name="radio-buttons-group-playback"
              value={roomtype}
              onChange={handleRoomTypeChange}
            >
              <FormControlLabel
                value="HP"
                control={<Radio color="primary" />}
                label="house party"
              />
              <FormControlLabel
                value="VP"
                control={<Radio color="secondary" />}
                label="virtual party"
              />
            </RadioGroup>
            {/* </FormControl> */}
          </Grid>

          {/* Item2: choice field to ask whether a user can play or pause or not. */}

          <Grid item spacing={12} align="center">
            {/* <FormControl component="fieldset"> */}
            <FormLabel id="demo-radio-buttons-group-label">
              Guest Control of Playback State
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={"false"}
              name="radio-buttons-group"
              onChange={handleGuestCanPauseChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
              />
            </RadioGroup>
            {/* </FormControl> */}
          </Grid>

          <Grid item spacing={12}>
            {/* <FormControl component="fieldset"> */}
            <TextField
              id="outlined-basic"
              required={true}
              type="number"
              defaultValue={votestoskip}
              onChange={handleVotesToSkipChange}
              variant="outlined"
              inputProps={{ min: 1, style: { textAlign: "center" } }}
            ></TextField>
            <FormHelperText>
              <div align="center">Votes Required To Skip Song.</div>
            </FormHelperText>
          </Grid>

          <Grid item spacing={12}>
            {/* <FormControl component="fieldset"> */}
            <TextField
              id="outlined-basic"
              required={true}
              type="number"
              defaultValue={maxusers}
              onChange={handleMaxUsersChange}
              variant="outlined"
              inputProps={{ min: 1, style: { textAlign: "center" } }}
            ></TextField>
            <FormHelperText>
              <div align="center">Max Users Allowed in Room</div>
            </FormHelperText>
          </Grid>
        </FormControl>
        <RenderCreateRoomButton />
      </Grid>
    </div>
  );
}

export default CreateRoomPage;
