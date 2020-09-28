import React, {useState} from 'react'
 


const PauseDiv = (props) => {
    return (
        <div>
            {
            props.paused && !props.search
            ? <div className="paused-div fade-in" onClick={() => props.play()}>
                <span className="paused-indicator">{props.pausedNotEnded ? "PAUSED" : "ENDED"}</span>
                <span className="pause-help">Press "Space" to {props.pausedNotEnded ? "RESUME" : "REPLAY"}</span>
                <span className="pause-replay">Press "R" to replay</span>
              </div>
            : undefined
            }
        </div>
    )
}

export default PauseDiv;
