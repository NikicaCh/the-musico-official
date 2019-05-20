import React from 'react';
import '../App.css';

const Photo = props => {
   
    return (
    <div id="main-player" className="main-player">
        <img onDragStart={(e) => {e.preventDefault()}} id="under-image" className="under-image" src={props.src} alt=""  align="middle"/>
        <div id="hexagon" className="hexagon">
            <div id="hexagon-inner" className="hexagon-inner">
                <img onDragStart={(e) => {e.preventDefault()}} src={props.src} id="hexagon-inner-in" className="hexagon-inner-in" />
            </div>
        </div>
    </div>
    )
}

export default Photo;