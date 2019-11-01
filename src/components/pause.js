import React, {useState} from 'react'
 


const PauseDiv = (props) => {
    return (
        <div>
            {
            !props.playing
            ? <span></span> 
            :<div className="paused-div fade-in visible">
                <span className="paused-indicator">PAUSED</span>
                <span className="pause-help">`Press "Space" to resume`</span>
                <span className="pause-replay">`Press "R" to replay`</span>
            </div>
            }
        </div>
    )
}

export default PauseDiv;
