import React, {useState} from 'react'
import {NewReleases, accessToken} from './Fetch'
import NewRelease from './NewRelease'

export const Releases = (props) => {


    //////INCLUDE LIKE SEEDS, with genres, and country

    const [albums, setAlbums] = useState([])
    const [singles, setSingles] = useState([])
    const [request, setRequest] = useState(false)
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
                
                console.log("NEW RELEASES:",data.data.albums.items)
            }
            
        })
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
                    {singles.slice(0, 10).map((single) => {
                        return <NewRelease item={single} name={single.name}/>
                    })}
                    {albums.slice(0, 10).map((album) => {
                        return <NewRelease item={album} name={album.name} />
                    })}
                </div>
                <div className="releases-main"></div>
            </div>
            : undefined}
        </div>
    )
}