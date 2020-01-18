import React, { useState, useLayoutEffect, useEffect } from 'react'

import {accessToken, NextTrack, PreviousTrack, Play, Pause} from './Fetch'
import { CircleSlider } from "react-circle-slider";
import PlayArrowTwoToneIcon from '@material-ui/icons/PlayArrowTwoTone';
import PauseIcon from '@material-ui/icons/Pause';
import FastRewindTwoToneIcon from '@material-ui/icons/FastRewindTwoTone';
import FastForwardTwoToneIcon from '@material-ui/icons/FastForwardTwoTone';
import SkipNextTwoToneIcon from '@material-ui/icons/SkipNextTwoTone';
import SkipPreviousTwoToneIcon from '@material-ui/icons/SkipPreviousTwoTone';
import RemoveIcon from '@material-ui/icons/Remove';
import $ from 'jquery'




const PlayerInfo = (props) => {
    const token = accessToken();
    const [sliderSize, setSliderSize] = useState(75);
    const [color1, setColor1] = useState("#F7F015")
    const [color2, setColor2] = useState("#F6BD0C")

    useEffect(() => {
        if(props.playing) {
            setColor1("#F7F015")
            setColor2("#F6BD0C")
        } else {
            setColor1("#E8E2D0")
            setColor2("#E8E2D0")
        }
    })
    
    const handleInput = (value) => {
        props.handleVolumeChange(value)
    }

    const playPause = () => {
        if(props.playing) {
            Pause(token)
        } else {
            Play(token)   
        }
    }
    return (
        <div id="player-info" className="player-info">
            <div className="player-info-upper">
                <div onClick={() => {props.backwards(10)}}>
                    <FastRewindTwoToneIcon />
                </div>
                <RemoveIcon />
                <div omClick={() => {PreviousTrack(token)}}>
                    <SkipPreviousTwoToneIcon />
                </div>
            </div>
            <div
                id="player-info-circle"
                className="player-info-circle"
                onClick={playPause}>
                { props.playing ? <PauseIcon fontSize="large"/> : <PlayArrowTwoToneIcon fontSize="large"/>}
            </div>
            <div className="circle-slider">
                <CircleSlider
                    value={props.volume}
                    onChange={handleInput}
                    size={sliderSize}
                    circleWidth={3}
                    progressWidth={6}
                    knobRadius={8}
                    circleColor={"#E0E0E0"}
                    gradientColorFrom={color1}
                    gradientColorTo={color2}/>
            </div>
            <div className="player-info-lower">
                <div onClick={() => {NextTrack(token)}}>
                    <SkipNextTwoToneIcon />
                </div>
                <RemoveIcon />
                <div onClick={() => {props.forwards(10)}}>
                    <FastForwardTwoToneIcon />
                </div>
            </div>
        </div>
    )
}


export default PlayerInfo;