import React from 'react'
import { accessToken , profile } from './Fetch'
import $ from 'jquery'
import Axios from 'axios';

const linkToRedirectInDevelopment = "http://localhost:8888/login";
const linkToRedirectInProduction = "https://musico-back.herokuapp.com/login";

let linkEnv = linkToRedirectInProduction

class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            initials: "",
            profileLogout: false,
            image: "",
            display_name: "",
            conditionImage: ""
        }
    }


    componentDidMount() {
        let token = accessToken();
        profile(token)
        .then((data) => {
            if(data) {
                console.log("PROFILE", data.data)
                let {display_name} = data.data;
                let initials = display_name.charAt(0)
                if(data.data.images && data.data.images.length) {
                    let image = data.data.images[0].url
                    this.setState({image, conditionImage:image})
                }
                this.setState({initials, display_name})
            }
        })
        $(".profile-img").on("mouseover", () => {
            this.setState({conditionImage: require("../icons/logout.webp")})
        })
        $(".profile-img").on("mouseleave", () => {
            console.log("LEAVE")
            this.setState({conditionImage: this.state.image})
        })
    }
    render() {
        let {profileLogout} = this.state;
        return(
            <div className="logout-area" onClick={() => {
                let wnd = window.open("https://accounts.spotify.com/en/logout", "_blank")
                setTimeout(() => {
                    window.location.replace(linkEnv)
                    wnd.close()
                }, 100)}}>
            {
                (profileLogout)
                ? <div className="logout-icon"><img
                    src={require("../icons/logout.webp")}></img></div>
                : <div>
                <img
                    className="profile-img"
                    title={this.state.display_name}
                    src={this.state.conditionImage}
                    alt="profile-img"></img>
                </div>
            }   

            
            </div>)
            
            
            
        
    }
}

export default Profile;