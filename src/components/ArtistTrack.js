import React, {useState} from 'react'
import { accessToken, PlayTrack } from './Fetch';

const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

const ArtistTrack = (props) => {
    let token = accessToken();
    return( 
        <div
            className="artistTrack"
            onClick={() => { PlayTrack(props.id, token, props.deviceId); }} //fix the pausediv
        > 
            <img
                src={props.src}
                className="featuring-img"
                id={props.id}
                alt="featuring img"
                title={props.name}>
            </img>
            <span
                title={props.trackName}
                className={`featuring-title`}
                title={props.name}>
                {props.name}
            </span>
            <span
                title={props.trackName}
                className="featuring-duration"
                title={props.name}>
                {millisToMinutesAndSeconds(props.track.duration_ms)}
            </span>
        </div>
    )
}

export default ArtistTrack;