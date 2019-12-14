import React, { useState } from 'react'

import {accessToken, NextTrack, PreviousTrack} from './Fetch'



const PlayerInfo = (props) => {
    const token = accessToken();
    return (
        <div className="player-info">
                {
                    props.context != ""
                    ? <div className="circle-upper"><img src={require("../icons/next.png")} onClick={() => NextTrack(token)}></img></div>
                    : <div></div>
                }
                    <input
                        id="volume-slider"
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        defaultValue={props.volume}>
                    </input>
            <div className="circle-left"><img src={require("../icons/rewind.png")} onClick={() => this.backwards(10)}></img></div>
            <div className="circle-right"><img src={require("../icons/fast-forward.png")} onClick={() => this.forwards(10)}></img></div>
            <div
                className="player-info-circle"
                onClick={this.playPause}>
                <img src={ props.playing ? require('../icons/pause.png') : require('../icons/play.png')}></img>
            </div>
                {
                    props.context != ""
                    ? <div className="circle-down"><img src={require("../icons/back.png")} onClick={() => PreviousTrack(token)}></img></div>
                    : <div></div>
                }
            
        </div>
    )
}


export default PlayerInfo;