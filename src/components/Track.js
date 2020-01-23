import React, { useState } from 'react'
import { PlayTrack, accessToken } from './Fetch'  

const Track = (props) => {

    let token = accessToken();

    return (
        <div className="artistDiv">
            <img //BLANK SEARCH BUTTON
                className="blank-search"
                onClick={props.blankSearch}
                src={require("../icons/pill-close.png")}
                alt="pill close">
            </img>
            <div className={`best-search-img`}>
                <img 
                    id={props.trackId}
                    onClick={() => {
                        PlayTrack(props.trackId, token, props.deviceId);}} //it will only play the specific track only, not an array of uris
                    src={props.image} 
                    className={`best-search-img track-img`} 
                    alt="best search">
                </img>
                <span className="best-search-title">{props.name}</span>
            </div>
            {
            props.featuring 
            ?   
                <div className="featuring-tracks" onClick={() => { // artist's featuring tracks
                    }}>
                    {props.featuring.length 
                    ? props.featuring
                    : <span className="nothing">Nothing to show here yet...</span>
                    }
                </div>
                
            : undefined
            }
            {/* {
                true
                ? <div className="artist-albums">{props.albums.slice(0, 10)}</div> //artist's albums
                : undefined
            } */}
            {/* {
                (props.type !== "track")
                ? <div className="other-track-imgs">
                    {props.arrayOfRestTracks}
                </div>
                : undefined
            } */}
        </div> 
    )

}



export default Track;

