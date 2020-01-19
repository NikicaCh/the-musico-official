import React, {useState} from 'react'
import { accessToken, PlayTrack } from './Fetch'

const Artist = (props) => {
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
                        PlayTrack(props.trackId, token, props.deviceId);}} //Should be playing all artist's songs, instead of track.id, also fix the pause div
                    src={props.image} 
                    className={`best-search-img ${props.type}-img`} 
                    alt="best search">
                </img>
                <span className="best-search-title">{props.name}</span>
            </div>
            {
            props.featuring 
            ?   
                <div className="first-page" onClick={() => {
                    }}>
                    {props.featuring.length 
                    ? props.featuring
                    : <span className="nothing">Nothing to show here yet...</span>
                    }
                </div>
                
            : undefined
            }
            {
                true
                ? <div className="artist-albums">{props.albums.slice(0, 10)}</div>
                : undefined
            }
            {
                (props.type !== "track")
                ? <div className="other-track-imgs">
                    {props.arrayOfRestTracks}
                </div>
                : undefined
            }
        </div> 
    )
}



export default Artist;