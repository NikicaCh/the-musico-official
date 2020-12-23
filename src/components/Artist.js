import React, {useState} from 'react'
import { accessToken, PlayTrack, PlayAlbum } from './Fetch'

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
                        PlayAlbum(props.props.uri, token, props.deviceId, true) // better approach, playing artist as context
                        // PlayTrack(props.uris, token, props.deviceId); //Should be playing all artist's songs, instead of track.id, also fix the pause div
                        // let contextObject = {
                        //     type: "artist",
                        //     item: props.props //contains all info for artist, from parent component BestSearch
                        // }
                        // props.setContext({contextObject}) //add to the context Object state in Player component
                    }} 
                    src={props.image} 
                    className={`best-search-img artist-img`}
                    alt="best search">
                </img>
                <span className="best-search-title">{props.name}</span>
            </div>
            {
            props.featuring 
            ?   
                <div className="featuring-tracks">
                    {props.featuring.length 
                    ? props.featuring
                    : <span className="nothing">Nothing to show here yet...</span>
                    }
                </div>
                
            : undefined
            }
            {
                true
                ? <div className="artist-albums">{props.albums.slice(0, 10)}</div> //artist's albums
                : undefined
            }
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



export default Artist;