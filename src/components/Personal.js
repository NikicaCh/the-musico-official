import React from 'react'
import $ from 'jquery'
import { accessToken ,FeaturingPlaylists} from './Fetch'


class Personal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            arrayOfFeaturingPlaylists: []
        }
        this.playlistDetails = this.playlistDetails.bind(this);
        this.closeDetails = this.closeDetails.bind(this);
        this.clickUnhoverable = this.clickUnhoverable.bind(this);
    }
    clickUnhoverable = (e) => {
        if(!$(e.target).hasClass("hoverable") && $(e.target).hasClass("personal-item")) {
            $(".personal-item").removeClass("item-unselected")
            $(".personal-item").removeClass("item-selected")
            $(e.target).addClass("item-selected")
        }
    }
    playlistDetails = (e) => {
        $('.personal-details').addClass("maximized")
        $(".personal-item").removeClass("hoverable")
        $(".close-personal").removeClass("hide")
        console.log("playlist id:",e.target.id)
        $(".personal-item").removeClass("item-selected")
        $(".personal-item").removeClass("item-unselected")
        $(e.target).parent().addClass("item-selected")
    }
    closeDetails = () => {
        $('.personal-details').removeClass("maximized")
        $(".personal-item").addClass("hoverable")
        $(".close-personal").addClass("hide")
        $(".personal-item").removeClass("item-selected")
        $(".personal-item").addClass("item-unselected")
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
                        <div className="personal-item hoverable" style={style} onClick={this.clickUnhoverable}>
                        <img id={item.id} src={require("../icons/personal-arrow.webp")} className="personal-arrow" onClick={this.playlistDetails}></img>
                        <img src={require("../icons/play-playlist.webp")} className="play-playlist"></img>
                        </div>
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
                    <h1 className="featuring-playlists">Featuring Playlists</h1>
                    {this.state.arrayOfFeaturingPlaylists}
                </div>
                <div className="personal-details">
                    <img
                    className="close-personal hide"
                    src={require("../icons/pill-close.png")}
                    onClick={this.closeDetails}>
                    </img>
                    <h1>Everyday favourites</h1>
                    <span>2014</span>
                </div>
                <div className="personal-section">
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