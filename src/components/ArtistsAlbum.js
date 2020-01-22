import React, { useState } from 'react'
import {accessToken, PlayAlbum } from './Fetch'


const ArtistAlbum = (props) => {
    const token = accessToken();
    return(
        <div
            id={props.album.id}
            className="artist-album"
            onClick={() => {
                PlayAlbum(props.album.uri, token, props.deviceId)
            }}
            title={props.album.name}>
            <img src={props.album.images[1].url}></img>
            <div className="under-album"></div>
            <span></span>
        </div>
    )

}



export default ArtistAlbum;