import React, {useState} from 'react'
import {  accessToken, PlayTrack, PlayAlbum } from './Fetch'


const NewRelease = (props) => {
    let token = accessToken()
    return (
        <div onClick={()=> {
            props.handleClick(props.item)
            // if(props.item.album_type ===  "album") {

            // } else {
            //     PlayTrack(props.item.uri, token, props.devideId)
            // }
        }} className="newReleaseElement" title={props.name}>
            <h1>{`${props.name.slice(0,25)}...`}</h1>
            {
                (props.item.album_type === "single")
                ? <img src={props.item.images[0].url}></img>
                : undefined
            }
            {
                (props.item.album_type === "album")
                ?<div title={`${props.item.total_tracks} tracks`} className="numberOfTracks">{props.item.total_tracks}</div>
                : undefined
            }
        </div>
    )
}


export default NewRelease;