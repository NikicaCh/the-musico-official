import React, { useState, useEffect } from 'react'



const MainRelease = (props) => {
    const [artists, setArtists] = useState([])

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