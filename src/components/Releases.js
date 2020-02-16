import React, {useState} from 'react'
import {NewReleases, accessToken} from './Fetch'
import NewRelease from './NewRelease'
import MainRelease from './MainRelease'



export const Releases = (props) => {


    //////INCLUDE LIKE SEEDS, with genres, and country

    const [albums, setAlbums] = useState([])
    const [singles, setSingles] = useState([])
    const [request, setRequest] = useState(false)
    const [main, setMain] = useState({})
    
    
    let token = accessToken();
    if(props.render && !request) {
        NewReleases(token)
        .then((data) => {
            if(data) {
                data.data.albums.items.map((item) => {
                    if(item.album_type === "album") {
                        setAlbums((albums) => [...albums, item])
                    } else if(item.album_type === "single") {
                        setSingles((singles) => [...singles, item])
                    }
                    setRequest(true)
                })               
            }
        })

    }

    const handleClick = (item) => {
        setMain(item)
    }
    
    return (
        <div>
            {props.render
            ? <div className="releases">
                <h1 className="featuring-playlists">New Releases</h1>
                <img //BLANK SEARCH BUTTON
                    className="blank-search"
                    onClick={props.blankSearch}
                    src={require("../icons/pill-close.png")}
                    alt="pill close">
                </img>
                <div className="releases-lists">
                    {singles.slice(0, 10).map((single, key) => {
                        return <NewRelease item={single} key={key} name={single.name} deviceId={props.deviceId} handleClick={handleClick} type="single"/>
                    })}
                    {albums.slice(0, 10).map((album, key) => {
                        return <NewRelease item={album} key={key} name={album.name}  deviceId={props.deviceId} handleClick={handleClick} type="album"/>
                    })}
                </div>
                {
                    (main !== {} && main.images)
                    ? <MainRelease item={main} deviceId={props.deviceId}/>
                    : undefined
                }
                
            </div>
            : undefined}
        </div>
    )
}