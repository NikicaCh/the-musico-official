import React from 'react'
import { accessToken , profile } from './Fetch'
import $ from 'jquery'
import Axios from 'axios';

const linkToRedirectInDevelopment = "http://localhost:8888/login";
const linkToRedirectInProduction = "https://themusico-redirect.herokuapp.com/login";

class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            initials: "",
            profileLogout: false
        }
        this.logout = this.logout.bind(this)
    }
    logout = () => {
        window.open("https://accounts.spotify.com/en/logout")
        setTimeout(() => {
            window.location.replace(linkToRedirectInDevelopment)
        }, 500)
    }

    componentDidMount() {
        let token = accessToken();
        profile(token)
        .then((data) => {
            if(data) {
                console.log("PROFILE", data.data.display_name)
                let {display_name} = data.data;
                let initials = display_name.charAt(0)
                this.setState({initials})
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
                : <div className="profile-circle">
                <span className="initials">{this.state.initials}</span>
                </div>
            }   

            
            </div>)
            
            
            
        
    }
}

export default Profile;