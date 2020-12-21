import React, {useState, useEffect} from 'react';
import { accessToken, PlayContext, IfFollowPlaylist, FollowPlaylist, UnfollowPlaylist } from './Fetch';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';



const Playlist = (props) =>  {
    let colorFollow = "#FC1A0B"
    let colorUnfollow = "#7A7E70"

    const [name, setName] = useState("")
    const [owner, setOwner] = useState("")
    const [heartColor, setHeartColor] = useState(colorUnfollow)
    const [follow, setFollow] = useState(false)
    const [request, setRequest] = useState(false)
    let token = accessToken();

    if(!request) { // way too many requests
        // IfFollowPlaylist(token, props.item.id, props.userId)
        // .then((data) => {
        //     console.log("REQ")
        //     setRequest(true)
        //     if(data) {
        //         data.data[0] === true ?
        //             (setHeartColor(colorFollow),
        //             setFollow(true))
        //         :   (setHeartColor(colorUnfollow),
        //             setFollow(false))
        //     }
        // })
    }
            

    // const Follow = () => {
    //     FollowPlaylist(token, props.item.id)
    // }
    const handleFollow = () => {
        follow ?
            (setFollow(false),
            UnfollowPlaylist(token, props.item.id),
            setHeartColor(colorUnfollow))
        :   (setFollow(true),
            FollowPlaylist(token, props.item.id),
            setHeartColor(colorFollow))
        
    }
    const style = {
        backgroundImage: `url(${props.item.images[0].url})`,
        backgroundPosition: "center",
        backgroundSize: "auto"
    }
    const icon1 = {
        width: "2vw",
        height: "2vw"
    }
    const heart = {
        fill: heartColor,
    }
    return (
        <div className="personal-item hoverable" style={style} onClick={this.clickUnhoverable} title={props.item.name}>
            {/* <img
                id={this.props.item.id}
                src={require("../icons/personal-arrow.webp")}
                className="personal-arrow"
                onClick={() => {
                    this.props.setDetails(this.state.name, this.state.owner)
                }}>
            </img> */}
            <div
                className="play-playlist"
                title={"Play Playlist"}
                onClick={() => { 
                PlayContext(token, props.item.uri)
                let contextObject = {
                    type: "playlist",
                    item: props.item //contains all info for playlist, from parent component BestSearch
                }
                props.setContext({contextObject}) //add to the context Object state in Player component
            }}>
                <PlayCircleOutlineIcon style={icon1} />
            </div>
            <div className="heart">
                <FavoriteTwoToneIcon onClick={handleFollow} style={heart} />
            </div>
            
        </div>
    )
}


export default Playlist;