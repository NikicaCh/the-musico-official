import React from 'react'
import $ from 'jquery'
import { accessToken ,FeaturingPlaylists} from './Fetch'


class Personal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            arrayOfFeaturingPlaylists: []
        }
        this.playlistDetails = this.playlistDetails.bind(this)
    }

    playlistDetails = () => {
        $('.personal-details').addClass("maximized")
        $(".personal-item").removeClass("hoverable")
    }
    componentDidMount() {
        let token = accessToken();
        FeaturingPlaylists(token)
        .then((data) => {
            if(data) {
                console.log("DATAAAA",data.data.playlists.items)
                let arrayOfFeaturingPlaylists = data.data.playlists.items.slice(0, 5).map((item) => {
                    const style = {
                        backgroundImage: `url(${item.images[0].url})`
                    }
                    return (
                        <div className="personal-item hoverable" style={style} onClick={this.playlistDetails}><img src={require("../icons/personal-arrow.webp")} className="personal-arrow"></img></div>
                    )
                })
                this.setState({arrayOfFeaturingPlaylists})
            }
        })

    }

    

    render() {
        return (
            <div className="personal">
                <div className="personal-section">
                    <h1>Featuring Playlists</h1>
                    {this.state.arrayOfFeaturingPlaylists}
                </div>
                <div className="personal-details"></div>
                <div className="personal-section-2">
                    <div className="personal-item hoverable"><img src={require("../icons/personal-arrow.webp")} className="personal-arrow"></img></div>
                    <div className="personal-item hoverable"><img src={require("../icons/personal-arrow.webp")} className="personal-arrow"></img></div>
                    <div className="personal-item hoverable"><img src={require("../icons/personal-arrow.webp")} className="personal-arrow"></img></div>
                    <div className="personal-item hoverable"><img src={require("../icons/personal-arrow.webp")} className="personal-arrow"></img></div>
                    <div className="personal-item hoverable"><img src={require("../icons/personal-arrow.webp")} className="personal-arrow"></img></div>
                </div>
            </div>
        )
    }
}



export default Personal;