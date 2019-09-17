import React, {Component} from 'react';
import { accessToken, PlayContext } from './Fetch';
import {FavoriteBorderIcon} from '@material-ui/icons/Favorite';



class Playlist extends Component  {

    constructor(props) {
        super(props)

        this.state = {
            name: "",
            owner: ""
        }
    }

    componentDidMount() {
        this.setState({name: this.props.item.name, owner: this.props.item.owner.display_name})
    }



    render() {
        let token = accessToken()
        const style = {
            backgroundImage: `url(${this.props.item.images[0].url})`,
            backgroundPosition: "center",
            backgroundSize: "auto"
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
                <img onClick={() => { 
                    PlayContext(token, this.props.item.uri)
                }} src={require("../icons/play-playlist.webp")} className="play-playlist"></img>
                {/* <FavoriteBorderIcon /> */}
            </div>
        )
    }
}


export default Playlist;