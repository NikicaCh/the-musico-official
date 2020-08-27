import React, {useState} from 'react'
 


const PauseDiv = (props) => {
    return (
        <div>
            {
            !props.playing && !props.search
            ? <span></span> 
            :<div className="paused-div fade-in">
                <span className="paused-indicator">{props.pausedNotEnded ? "PAUSED" : "ENDED"}</span>
                <span className="pause-help">Press "Space" to {props.pausedNotEnded ? "RESUME" : "REPLAY"}</span>
                <span className="pause-replay">Press "R" to replay</span>
            </div>
            }
        </div>
    )
}

export default PauseDiv;
