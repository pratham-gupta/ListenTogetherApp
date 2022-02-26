import Youtube from "react-youtube";
import React from "react";

function YoutubePlayer() {
  const checkElapsedTime = (e) => {
    console.log(e.target.playerInfo.playerState);
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
    console.log(duration, currentTime);
  };

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div>
      <Youtube
        videoId="kNlNAJywDs0"
        containerClassName="embed embed-youtube"
        onStateChange={(e) => checkElapsedTime(e)}
        opts={opts}
      />
    </div>
  );
}

export default YoutubePlayer;
