import React, { useState, useEffect } from 'react'
import { accessToken, PlayTrack, PlayAlbum } from './Fetch'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'




const MainRelease = (props) => {
    const [artists, setArtists] = useState([])

    const icon = {
        width: "3vw",
        height: "3vw"
    }
    let token = accessToken();

    useEffect(() => {
        let arrayOfArtists = []
        props.item.artists.map((artist) => {
        arrayOfArtists.push(<h1>{artist.name}</h1>)
        })
        setArtists(arrayOfArtists)
    }, props.item.id) // the useEffect function is called only when this props is changed, the difference when there is no second param to useEffect
    
    return (
        <div className="releases-main">
            <img src={props.item.images[0].url}></img>
            <div
                className="play-release"
                title={"Play Playlist"}
                onClick={() => {
                        PlayAlbum(props.item.uri, token, props.deviceId)
                // PlayContext(token, props.item.uri)
            }}>
                <PlayCircleOutlineIcon style={icon} />
            </div>
            {
                <div className="release-artists">
                    <h2 className="release-title" title={props.item.name}>{`${props.item.name.slice(0,17)}...`}</h2>
                    {artists}
                    <span>{props.item.release_date}</span>
                </div>
            }
        </div>
    )
}


export default MainRelease;