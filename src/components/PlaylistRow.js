import React, { useState } from 'react'
import { useEffect } from 'react'


import Playlist from './Playlist'
import PlaylistDetails from './Playlist-details'




const PlaylistRow = (props) => {
        const [playlists, setPlaylists] = useState([])

        useEffect(() => {
            if(props.title === "Featuring Playlists") { // featuring playlists
                let array = props.data;
                let array1 = []
                props.data.map((playlist) => {
                    if(props.array2.indexOf(playlist) === -1) {
                        array1.push(playlist)
                    }
                  })
                setPlaylists(array1.slice(0,5))
            } else {
                let array = props.data.map((playlist) => {
                    return playlist
                })
                setPlaylists(array)
            }
            
        }, [props.data])
        

        return(
            <div className="playlist-row">
                <h1 className="featuring-playlists">{props.title}</h1>
                {playlists.map((item, index) => (<Playlist key={`playlist${index}`} item={item} deviceId={props.deviceId} userId={props.userId} setContext={props.setContext}/>))}
            </div>
        )
    }

export default PlaylistRow;