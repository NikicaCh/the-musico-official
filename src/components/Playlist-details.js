import React from 'react'


const PlaylistDetails = (props) => {
    return(
        <div className="personal-details">
            <h1>{props.name}</h1>
            {/* <img
            className="close-personal hide"
            src={require("../icons/pill-close.png")}
            onClick={this.closeDetails}>
            </img>
            <h1>Everyday favourites</h1>
            <span>2014</span> */}
        </div>
    )
}


export default PlaylistDetails;