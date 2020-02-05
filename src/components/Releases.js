import React, {useState} from 'react'
import {NewReleases, accessToken} from './Fetch'

export const Releases = (props) => {

    const [albums, setAlbums] = useState([])
    const [request, setRequest] = useState(0)
    let token = accessToken();
    if(props.render && request < 1) {
        NewReleases(token)
        .then((data) => {
            if(data) 
            setAlbums(data.data.albums.items)
            setRequest(request + 1)
            console.log("NEW RELEASES:",data.data.albums.items)
        })
    }
   
    return (
        <div>
            {props.render
            ? <div className="releases">HELLO WORLD</div>
            : undefined}
        </div>
    )
}