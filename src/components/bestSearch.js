import React from 'react'
import {Featuring, accessToken, PlayTrack, getDevices} from './Fetch'
import $ from 'jquery'
import Cookies from 'universal-cookie'

import RestTracks from './restTracks'
import RestArtists from './restArtists'
import RestAlbums from './restAlbums'

class BestSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            featuring: [],
            deviceId: "",
            searched: "",
            type: "",
            name: "",
            restCondition: "artists",
            whatToRender: "default", // default and artist are the options
            arrayOfRestTracks: ""
        }
    }

    componentDidMount() {
        document.getElementById("results").addEventListener("wheel", (e) => {
            if(e.deltaY > 0) { //scroll down
            }
        })
        let token = accessToken();
        let userId = this.props.userId;
        getDevices(token)
        .then((data) => {
            if(data) {
                data.data.devices.forEach((device) => {
                    if(device.name === `MUSICO ${this.props.uniq}`) {
                        let deviceId = device.id;
                        this.setState({deviceId}, () => {
                            $("body").on('click', '.play-track', (e) => {
                                let token = accessToken();
                                // let userId = this.props.userId;
                                let trackId = e.target.getAttribute('id');
                                PlayTrack(trackId, token, this.state.deviceId);
                                if(this.state.type === "artist"){
                                    let cookies = new Cookies();
                                    if(cookies.get(`mostRecent1${userId}`) !== this.state.searched && cookies.get(`mostRecent2${userId}`) !== this.state.searched ) {
                                        cookies.set(`mostRecent2${userId}`, cookies.get(`mostRecent1${userId}`))
                                        cookies.set(`mostRecent1${userId}`, this.state.searched)
                                    }
                                } else {
                                    let cookies = new Cookies();
                                    cookies.set(`lastTrack${userId}`, this.state.searched)
                                }
                            }); 
                        });
                    }
                })
            }
        })
        
    }
    componentWillReceiveProps(nextProps) {
        this.setState(this.state)
        if(this.props.restTracks.length) {
            let tracks = this.props.restTracks;
            let sortedTracks =  tracks.sort(function(a, b){
                let keyA = a.popularity,
                    keyB = b.popularity;
                // Compare the 2 dates
                if(keyA < keyB) return 1;
                if(keyA > keyB) return -1;
                return 0;
            });
        }
        $("body").on("click", ".blank-search", () => {
            if(!$("#results").hasClass("hide")) {
                $("#results").attr("class", "results hide")
                $(".search-input").val("")
            }
        })
        $(".see-more").on("click", () => {
            //to be done
        })
        let token = accessToken();
        this.setState({searched: nextProps.search, type: nextProps.type, name: nextProps.max})
        if(nextProps.type == "artist") {
            this.setState(this.state)
            Featuring(this.props.artistId, token )
            .then((data) => {
                if(data) {
                    let array = data.data.tracks.slice(0, 8).map((track) => {
                        let name = track.name
                        if(track.name.length > 20) {
                            name = track.name.substring(0, 20) +"...";
                        }
                        return  <div className="col-md-3 col-sm-7 mt-2 mb-5">
                                    <div className="row w-100 ml-3 d-flex justify-content-center">
                                        <img
                                            src={track.album.images[0].url}
                                            className="featuring-img play-track mb-3"
                                            id={track.uri}>
                                        </img>
                                    </div>
                                    <div className="row w-100 ml-3 d-flex justify-content-center">
                                        <span title={track.name} className="featuring-title">{name}</span>
                                    </div>
                                    
                                </div>
                    })
                    this.setState({featuring: array})
                }
            })
        }

        if(this.props.restTracks && this.props.restTracks.length) {
            let arrayOfRestTracks;
            let restTracks = this.props.restTracks.map((track) => {
                console.log("GHAHGAGGG", track)
                if(track.type == "track") {
                    return track;
                }
            })
            arrayOfRestTracks = restTracks.slice(1, 6).map((track) => {
                return  <div className="small-best-holder ml-3 d-flex justify-content-center">
                            <img
                                src={track.album.images[0].url}
                                className="play-track small-best-search-img ml-4"
                                id={track.uri}>
                            </img>
                            <span className="small-best-search-title">{track.name}</span>
                        </div>
            })
            this.setState({arrayOfRestTracks})
        }
      }
    
    render() {
        let render = this.props.image;
        let featuring = false;
        let condition = this.state.restCondition;
        if(this.props.type == "artist") {
            featuring = true;
            let token = accessToken();
            
        } else {
            featuring = false
        }
        return (
            <div>
            {
                render
                ? <div className="container w-100 search-top">
                            <div className="row other-results-title">
                            <h2>Top result</h2> 
                            </div>
                            <img
                                className="blank-search"
                                src={require("../icons/pill-close.png")}>
                            </img>
                            <div
                                className="row w-100 dragable mb-5"> {/*this is the div where I should append the drag 'n' drop event */}
                                <div className="row w-100 drag-wrapper">
                                    <div className="drag-menu1"></div>
                                    <div className="drag-menu2"></div>
                                </div>
                                <div className="col-md-3 col-xs-6 mt-5 relative"> 
                                    <img id={this.props.trackId} src={this.props.image} className={`best-search-img ${this.props.type}-img`}></img>
                                    <figcaption><span className="best-search-title">{this.props.name}</span></figcaption>    
                                </div>
                                <div className="col-md-9 mt-5"> 
                            {
                                featuring 
                                ?   <div>
                                            <div id="first-page" className="row ml-3 mt-4 first-page" onClick={() => {
                                                }}>
                                                {this.state.featuring}
                                            </div>
                                            <img className="next-page-icon" alt="next-page" src={require("../icons/next-page.png")}></img>
                                            <img className="prev-page-icon" alt="prev-page" src={require("../icons/prev-page.png")}></img>
                                    </div> 
                                : <div></div>
                            }
                            {
                                (this.props.type == "play-track track")
                                ? <div className="other-track-imgs row ml-5">
                                    {this.state.arrayOfRestTracks}
                                    <span className="see-more">see more</span>
                                  </div> /*for other tracks*/
                                : <div></div>
                            }
                                </div>
                            </div> {/*Where the dragable div ends */}
                            <div></div> {/*This is the second dragable div */}
                            <div className="other-results-container">
                                <div className="row mt-5">
                                    <span
                                        className="condition"
                                        onClick={() => {
                                            $(".resttracks").removeClass("hide")
                                            $(".restartists").addClass("hide")
                                        }}>tracks</span>
                                    <span
                                        className="condition"
                                        onClick={() => {
                                            $(".restartists").removeClass("hide")
                                            $(".resttracks").addClass("hide")
                                        }}>artists</span>
                                        <span
                                        className="condition">albums</span>
                                </div>
                            </div>
                            <div id="rest-tracks" className="resttracks">
                                <RestTracks tracks={this.props.restTracks} device={this.props.deviceId}/>
                            </div>
                            <div id="rest-artists" className="restartists hide">
                                <RestArtists artists={this.props.restArtists} device={this.props.deviceId}/>
                            </div>
                            }
                    </div>                       
                :<div></div>
            }
            </div>
        )
    }
   
}

export default BestSearch;