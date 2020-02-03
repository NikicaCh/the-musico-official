import React, {useState, useEffect} from 'react';
import { accessToken, PlayContext, IfFollowPlaylist, FollowPlaylist, UnfollowPlaylist } from './Fetch';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';



const Playlist = (props) =>  {
    const [name, setName] = useState("")
    const [owner, setOwner] = useState("")
    const [heartColor, setHeartColor] = useState("#7A7E70")
    const [follow, setFollow] = useState("false")
    let token = accessToken();


    const Follow = () => {
        FollowPlaylist(token, props.item.id)
        .try((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    const handleFollow = () => {
        if(follow) {
            UnfollowPlaylist(token, props.item.id)
        } else {
            FollowPlaylist(token, props.item.id)
        }
    }
    useEffect(() => {
        setName(props.item.name)
        setOwner(props.item.owner.display_name)
        IfFollowPlaylist(token, props.item.id, props.userId)
        .then((data) => {
            if(data) {
                if(data.data === true) {
                    setHeartColor("#FC1A0B")
                    setFollow("true")
                } else {
                    setHeartColor("#7A7E70")
                    setFollow("false")
                }
            }
        })        
        
    })
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
        <div className="personal-item hoverable" style={style} onClick={this.clickUnhoverable}>
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