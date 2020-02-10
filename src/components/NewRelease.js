import React, {useState} from 'react'


const NewRelease = (props) => {
    return (
        <div className="newReleaseElement" title={props.name}>
            <h1>{`${props.name.slice(0,20)}...`}</h1>
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