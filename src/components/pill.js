import React, { useState } from 'react'
import {accessToken} from './Fetch'
import $ from 'jquery'


const Pill = (props) => {
    const [value, setValue] = useState(props.value);
    const [icon, setIcon] = useState(props.icon);
    const CloseIcon = require("../icons/pill-close.png");

    const handlePillClick = (e) => {
        if(e.target.className !== "pill-close" && value !== "trending" && value !== "new releases") {
            const token = accessToken();
            props.search(token, value)
        }
        else if(value === "new releases") {
            props.render();
        }
    }

    const deletePill = (e) => {
        console.log(e.target.parentNode.remove())
    }
    return(
        <div className="pill" onClick={handlePillClick}>
            { (icon)
            ? <img className="fire" src={icon}></img>
            : undefined
            }
            {value}
            <img className="pill-close" src={CloseIcon} onClick={deletePill}></img>
        </div>
    )
}


export default Pill;