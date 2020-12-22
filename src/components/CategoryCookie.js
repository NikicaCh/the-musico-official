import React, {useState} from 'react'
import {accessToken, CategoryPlaylists, PlayAlbum} from './Fetch'

const CategoryCookie = (props) => {

    const [playlists, setPlaylists] = useState([])

    return (
        <div title={props.item.name} className={`category-cookie ${props.item.name}`}
            onClick={() => {
                let token = accessToken()
                CategoryPlaylists(token, props.item.id, 10)
                .then((data) => {
                    if(data && data.data && data.data.playlists && data.data.playlists.items && data.data.playlists.items[0] !== undefined) { // double check for playlists existance
                        setPlaylists(data.data.playlists.items)
                        PlayAlbum(data.data.playlists.items[0].uri, token, props.deviceId)
                    }
                })
            }}>
            <img src={props.item.icons[0].url}></img>
        </div>
    )
}


export default CategoryCookie;