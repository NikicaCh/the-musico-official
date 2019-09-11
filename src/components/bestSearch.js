import React from 'react'
import {Featuring, accessToken, PlayTrack, getDevices, Pause, RelatedArtists} from './Fetch'
import $ from 'jquery'
import Cookies from 'universal-cookie'

import RestTracks from './restTracks'
import RestArtists from './restArtists'
import PauseDiv from './pause'

class BestSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            featuring: [],
            deviceId: "",
            type: "",
            name: "",
            restCondition: "artists",
            whatToRender: "default", // default and artist are the options
            arrayOfRestTracks: "",
            restTracksUris: [],
            indexOfPlayingTrack: "",
            context: "", 
            arrayOfUris: [],
            currentId: "",
            currentPlaybackId: "",
            replayed: false,
            pausedState: "Paused",
            arrayOfRelatedArtists: []
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
                                let index = e.target.parentElement.getAttribute("id")
                                this.setState({indexOfPlayingTrack: index})
                                let trackId = e.target.getAttribute('id');
                                if($(e.target).hasClass("rest")) {
                                    PlayTrack(trackId, token, this.state.deviceId);
                                }
                                else if(this.props.type === "artist"){
                                    let slicedFromStarting = this.state.arrayOfUris.slice(this.state.arrayOfUris.indexOf(trackId))
                                    PlayTrack(slicedFromStarting, token, this.state.deviceId);
                                    this.setState({context: "search artist", currentId: trackId})
                                    let cookies = new Cookies();
                                    let data1 = cookies.get(`mostRecent1${userId}`)
                                    let data2 = this.props.artist.name
                                    if(data1 !== data2 && cookies.get(`mostRecent2${userId}`) !== data2 ) {
                                        cookies.set(`mostRecent2${userId}`, data1, {expires: new Date(Date.now()+2592000)})
                                        cookies.set(`mostRecent1${userId}`, data2, {expires: new Date(Date.now()+2592000)})
                                    }
                                } else {
                                    let slicedFromStarting = this.state.restTracksUris.slice(this.state.restTracksUris.indexOf(trackId))
                                    PlayTrack(slicedFromStarting, token, this.state.deviceId);
                                    this.setState({context: "search track"})
                                    let cookies = new Cookies();
                                    cookies.set(`lastTrack${userId}`, this.props.track.name, {expires: new Date(Date.now()+2592000)}) //the track name
                                }
                            }); 
                        });
                    }
                })
            }
        })
        
    }
    componentWillReceiveProps() {
        // if(this.props.restTracks.length) {
        //     let tracks = this.props.restTracks;
        //     let sortedTracks =  tracks.sort(function(a, b){
        //         let keyA = a.popularity,
        //             keyB = b.popularity;
        //         // Compare the 2 dates
        //         if(keyA < keyB) return 1;
        //         if(keyA > keyB) return -1;
        //         return 0;
        //     });
        // }
        $("body").on("click", ".blank-search", () => {
            this.props.blankSearch();
        })
        $(".see-more").on("click", () => {
            //to be done
        })
        let token = accessToken();
        this.setState({type: this.props.type, name: this.props.max}, () => {
            if(this.props.type === "artist") {
                Featuring(this.props.artistId, token )
                .then((data) => {
                    if(data) {
                        let index = 0;
                        let arrayOfUris = []
                        data.data.tracks.map((track) => {
                            return arrayOfUris.push(track.uri)
                        })
                        let array = data.data.tracks.slice(0, 8).map((track) => {
                            let name = track.name
                            if(track.name.length > 20) {
                                name = track.name.substring(0, 20) +"...";
                            }
                            index ++;
                            let src;
                            if(track.album.images.length) {
                                src = track.album.images[0].url;
                            } else {
                                src = "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                            }
                            return  <div
                                        className="col-md-3 col-sm-7 mt-2 mb-5">
                                        <div
                                            id={`suggestion${index}`}  
                                            className="row w-100 ml-3 d-flex justify-content-center">
                                            <img
                                                src={src}
                                                className="featuring-img play-track mb-3"
                                                id={track.uri}
                                                alt="featuring img">
                                            </img>
                                        </div>
                                        <div className="row w-100 ml-3 d-flex justify-content-center">
                                            <span title={track.name} className={`featuring-title suggestion${index}`}>{name}</span>
                                        </div>
                                    </div>
                        })
                        this.setState({featuring: array, arrayOfUris})
                    }
                })
            }
        })
        

        if(this.props.restTracks && this.props.restTracks.length) {
            let arrayOfRestTracks;
            let restTracks = this.props.restTracks.map((track) => {
                if(track.type === "track") {
                    return track;
                }
            })
            let restTracksUris = [];
            arrayOfRestTracks = restTracks.slice(1, 6).map((track) => {
                restTracksUris.push(track.uri);
                let src;
                let artistName;
                if(track.album.images.length) {
                    src = track.album.images[0].url
                } else {
                    src = "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                }
                if(track.artists.length) {
                    artistName = track.artists[0].name
                } else {
                    artistName = ""
                }
                return  <div className="small-best-holder ml-3 d-flex justify-content-center">
                            <img
                                src={src}
                                className="play-track small-best-search-img ml-4"
                                id={track.uri}
                                alt="best search img">
                            </img>
                            <span className="small-best-search-title">{track.name}</span>
                            <span className="small-best-search-artist">{artistName}</span>
                        </div>
            })
            restTracksUris.unshift(this.props.trackId)
            this.setState({restTracksUris})
            this.setState({arrayOfRestTracks})
        }
        RelatedArtists(token, this.props.artistId)
        .then((data) => {
            let arrayOfRelatedArtists = data.data.artists.map((artist) => {
                return <span id={artist.id} className="related-artist" onClick={(e) => {
                        let target = e.target;
                        let value = target.innerHTML;
                        let token = accessToken();
                        this.props.openArtist(token, value, artist.id)
                        console.log("hello", value)
                }}>{artist.name}</span>
            })
            this.setState({arrayOfRelatedArtists})
        })
      }
    
    render() {
        let render = this.props.image;
        let featuring = false;
        if(this.props.type === "artist") {
            featuring = true;
            
        } else {
            featuring = false
        }
        return (
            <div>
            <PauseDiv 
                playing={this.props.playing}
                pausedState={this.state.pausedState} />
            {
                render
                ? <div className="container w-100 search-top">
                            <div className="row other-results-title">
                            <h2>Top result</h2> 
                            </div>
                            <img
                                className="blank-search"
                                src={require("../icons/pill-close.png")}
                                alt="pill close">
                            </img>
                            <div
                                className="row w-100 dragable mb-5"> {/*this is the div where I should append the drag 'n' drop event */}
                                <div className="col-md-3 col-xs-6 mt-5 relative"> 
                                    <img id={this.props.trackId} src={this.props.image} className={`play-track best-search-img ${this.props.type}-img`} alt="best search"></img>
                                    <figcaption><span className="best-search-title">{this.props.name}</span></figcaption>    
                                </div>
                                <div className="col-md-9 mt-5"> 
                            {
                                featuring 
                                ?   <div>
                                            <div id="first-page" className="row ml-3 mt-4 first-page" onClick={() => {
                                                }}>
                                                {this.state.featuring.length 
                                                ? this.state.featuring
                                                : <span className="nothing">Nothing to show here yet...</span>
                                                }
                                            </div>
                                            <img className="next-page-icon" alt="next-page" src={require("../icons/next-page.png")}></img>
                                            <img className="prev-page-icon" alt="prev-page" src={require("../icons/prev-page.png")}></img>
                                    </div> 
                                : <div></div>
                            }
                            {
                                (this.props.type === "track")
                                ? <div className="other-track-imgs row ml-5">
                                    {this.state.arrayOfRestTracks}
                                    <span className="see-more">see more</span>
                                  </div> /*for other tracks*/
                                : <div></div>
                            }
                                </div>
                            </div> {/*Where the dragable div ends */}
                            <div></div> {/*This is the second dragable div */}
                            {this.props.type === "artist" 
                            ? <div className="row related-artists">{this.state.arrayOfRelatedArtists.slice(0, 5)}</div>
                            : <span></span>
                            }
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