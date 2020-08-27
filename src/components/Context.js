import React from 'react'
import { useState, useEffect } from 'react'
import CircularStatic from './progress'


const Context = (props) => {

    const [lock, setLock] = useState(false)
    const [click, setClick] = useState(true)

    useEffect(() => {
        if(props.state && !props.state.track_window.next_tracks.length && !props.state.track_window.previous_tracks.length && click) {
            setLock(true)
        } else if( props.state && !props.state.track_window.next_tracks.length && !props.state.track_window.previous_tracks.length && !click) {
            setLock(false)
        } else {
            setLock(false)
        }
    }, [props.state.track_window]) 


        
    
    

    return (
        <div className="context" >
            <img onClick={() => {
                setClick(!click)
            }} className={lock ? "context-div context-div-rotate" : "context-div"} src={require("../icons/infinite.png")} title={lock ? "context locked" : "context lock"}></img>
            <div className="context-progress"> 
            {
                !props.search && props.state.track_window && !props.state.track_window.next_tracks.length && !props.pausedNotEnded && !props.playing
                ?<CircularStatic/>
                : undefined
            }
            </div>
            
        </div>
    )
}


export default Context