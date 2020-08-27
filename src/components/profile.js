import React from 'react'
import { accessToken , profile } from './Fetch'
import $ from 'jquery'
import Axios from 'axios';

const linkToRedirectInDevelopment = "http://localhost:8888/login";
const linkToRedirectInProduction = "https://musico-back.herokuapp.com/login";

class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            initials: "",
            profileLogout: false,
            image: "",
            display_name: ""
        }
        this.logout = this.logout.bind(this)
    }
    logout = () => {
        window.open("https://accounts.spotify.com/en/logout")
        setTimeout(() => {
            window.location.replace(linkToRedirectInProduction)
        }, 500)
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
                    this.setState({image})
                }
                this.setState({initials, display_name})
            }
        })
        // $(".logout-area").on("mouseover", () => {
        //     this.setState({profileLogout: true})
        // })
        $(".logout-area").on("mouseleave", () => {
            console.log("LEAVE")
            this.setState({profileLogout: false})
        })
    }
    render() {
        let {profileLogout} = this.state;
        return(
            <div className="logout-area">
            {
                (profileLogout)
                ? <div className="logout-icon"><img
                    onClick={this.logout}
                    src={require("../icons/logout.webp")}></img></div>
                : <div>
                <img className="profile-img" title={this.state.display_name} src={this.state.image}></img>
                </div>
            }   

            
            </div>)
            
            
            
        
    }
}

export default Profile;