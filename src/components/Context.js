import React from 'react'
import { useState, useEffect } from 'react'
import CircularStatic from './progress'


const Context = (props) => {

    const [lock, setLock] = useState(false)
    const [click, setClick] = useState(true)
    const [name, setName] = useState("")
    const [obj, setObj] = useState({})


    useEffect(() => {
        if(props.state && !props.state.track_window.next_tracks.length && !props.state.track_window.previous_tracks.length && click) {
            setLock(true)
        } else if( props.state && !props.state.track_window.next_tracks.length && !props.state.track_window.previous_tracks.length && !click) {
            setLock(false)
        } else {
            setLock(false)
        }

        if(props.contextObject && props.contextObject.contextObject) {
            setName(props.state.context.metadata.context_description || props.contextObject.contextObject.item.name)
            setObj(props.contextObject.contextObject)
        } else if(props.state && props.state.context && props.state.context.metadata) {
            setName(props.state.context.metadata.context_description)
        }
    }, [props.state.track_window, props.contextObject]) 



 
    
    return (
        <div className="context" >
            <img onClick={() => {
                setClick(!click)
            }} className={lock ? "context-div context-div-rotate" : "context-div"} src={require("../icons/infinite.png")} title={lock ? "context locked" : `listening to ${name}`}></img>
            <div className="context-progress"> 
            {
                !props.search && props.state.track_window && !props.state.track_window.next_tracks.length && !props.pausedNotEnded && !props.playing
                ?<CircularStatic/>
                : undefined
            }
            </div>
        {   
            !lock && name!== "" ?
            <div className="black-stripe">
                <p>{name} - {props.currentPlaybackName}</p>
                <p>{name} - {props.currentPlaybackName}</p>
            </div>
            : undefined
        }
        
        </div>
    )
}


export default Context