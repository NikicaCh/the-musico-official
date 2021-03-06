import React, { Component } from 'react'
import queryString from 'query-string'
import $ from "jquery"

import Result from './searchResults/Result'
import {accessToken, SearchFor, FeaturingPlaylists, UsersTop, Categories} from './Fetch'
import BestSearch from './bestSearch'
import Cookies from 'universal-cookie'
import FeaPlaylists from './featuringPlaylists'
import Personal from './Personal'
import Pill from './pill'
import {Releases} from './Releases'
import { throws } from 'assert'
import CategoryCookie from './CategoryCookie'


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchValue:'',
          type: "",
          track: "",
          artist: "",
          max: "",
          maxImg: "",
          noData1: false,
          noData2: false,
          trackId: "",
          artistId: "",
          playlistScrolling: false,
          restTracks: [],
          restArtists: [], 
          pillLastClicked: "",
          best: false,
          personal: true,
          releases: false,
          reservedWords: [],
          searchedReserved: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.openArtist = this.openArtist.bind(this);
        this.blankSearch = this.blankSearch.bind(this);
        this.releasesRender = this.releasesRender.bind(this);
        // this.handleKeyPress = this.handleKeyPress.bind(this);
    };
    blankSearch() {
        this.setState({searchValue: "", type: "", track: "", artist: "", max: "", maxImg: "" , best: false, personal: true, releases: false})
    }
    releasesRender() {
        this.setState({searchValue: "", type: "", track: "", artist: "", max: "", maxImg: "" , personal: false, best: false,  releases: true})
    }
    search(token, value) {
        this.setState({personal: false, releases: false, best: true})

        { // categories
            let length = value.length;
            let reservedWords = this.state.reservedWords;
            let arrayOfFeaturing = []
            reservedWords.map((word) => { // alternative names, and multiple word names
                if(word.name.toUpperCase().slice(0, length) == value.toUpperCase()) {
                    arrayOfFeaturing.push(word)
                }
                this.setState({searchedReserved: arrayOfFeaturing})
            })  
        }

        let promise1 = SearchFor(token, value, "track", 50)
        .then((data) => {
            if(data && data.data && data.data.tracks && data.data.tracks.items){
                let array = data.data.tracks.items
                if(array.length) {
                    let maxPop = Math.max.apply(Math, array.map(function(track) { return track.popularity; }))
                    let mostPopularTrack = array.find((track) => { return track.popularity === maxPop}) // the most popular track object
                    this.setState({track: mostPopularTrack, trackId:mostPopularTrack.uri, restTracks: array})
                } 
            } else {
                this.setState({noData1: true})
            } 
        })
        let promise2 = SearchFor(token, value, "artist", 50)
            .then((data) => {
                if(data && data.data && data.data.artists && data.data.artists.items) {
                    let array = data.data.artists.items;
                    if(array.length) {
                        let maxPop = Math.max.apply(Math, array.map(function(artist) { return artist.popularity; }))
                        let mostPopularArtist = array.find((artist) => { return artist.popularity === maxPop}) // the most popular artist object
                        this.setState({artist: mostPopularArtist, artistId: mostPopularArtist.id, restArtists: array})
                    }
                } else {
                    this.setState({noData2: true}, () => {
                        if(this.state.noData1 == true) {
                            this.setState({track: "", artist: "", max: "", maxImg: "", type: ""});
                        }
                    })
                }
            }) 
            Promise.all([promise1, promise2])
            .then(() => {
                let trackPop = this.state.track.popularity;
                let artistPop = this.state.artist.popularity;
                if(artistPop + 10>= trackPop && this.state.artist.images.length) {
                    this.setState({max: this.state.artist.name, maxImg: this.state.artist.images[0].url, type: "artist" })
                } else if(trackPop > artistPop && this.state.track.album.images && this.state.track.album.images.length) {
                    this.setState({max: this.state.track.name, maxImg: this.state.track.album.images[0].url, type: "track"})
                }
            })
            if(value === "") {
                this.setState({personal: true})
            }
    }
    openArtist(token, value, id) {
        SearchFor(token, value, "artist", 50) 
        .then((data) => {
            if(data && data.data && data.data.artists && data.data.artists.items) {
                data.data.artists.items.map((item) => {
                    if(item.id == id) {
                        let img;
                        if(item.images.length) {
                            img = item.images[0].url 
                        } else {
                            img = "http://abs2018.lbsafricaclub.org/wp-content/uploads/2016/03/profile-placeholder.png"
                        }
                        this.setState({maxImg: img, type: "artist", artist: item, artistId: item.id, max: value})
                        this.setState({maxImg: img, type: "artist", artist: item, artistId: item.id, max: value})
                    }
                })
                $('html, .search').animate({
                    scrollTop: 0
                }, 800);            }
        })
    }
    handleChange(event) {
        let value = $(".search-input").val();
        if(value == "") {
            this.blankSearch()
            this.setState({searchedReserved: []})
        } else {
            let token = accessToken();
            this.setState({searchValue: value}, () => {
                this.search(token, value);
            })
            this.forceUpdate(); 
        }           
    }
    componentDidMount() {
        let token = accessToken();
        UsersTop(token,  "tracks", "short_term", 10)
        .then((data) => {
        })
        Categories(token).then((data) => {
            console.log("RESERVERD", data.data.categories.items)
            
            if(data && data.data && data.data.categories && data.data.categories.items) {
                let items = data.data.categories.items;
                let reservedWords = items.map((item) => {
                    return item
                })
                this.setState({reservedWords})
            }
        })
        let value = $(".search-input").val();
        if(this.props.search) {
            this.setState({searchValue: value}, () => {
                this.search(token, value);
            }) 
        }
    }
    render() {
        let cookies = new Cookies();
        let userId = this.props.userId
        let mostRecent1 = cookies.get(`mostRecent1${userId}`)
        if(!mostRecent1 || mostRecent1 == "undefined") {
            mostRecent1 = "khalid"
        }
        let mostRecent2 = cookies.get(`mostRecent2${userId}`)
        if(!mostRecent2 || mostRecent2 == "undefined") {
            mostRecent2 = "Drake"
        }
        let lastTrack = cookies.get(`lastTrack${userId}`)
        if(!lastTrack || lastTrack == "undefined") {
            lastTrack = "blinding lights"
        }
        let type;
        if(this.state.type === "track") {
            type = "track"
        } else {
            type = this.state.type;
        }
        let value = this.state.searchValue;
        let render = this.props.render;
        return (
            <div>
                {(render)
                ? <div id="search" className="search"> 
                <a onClick={() => {this.props.toggleRender()}}>
                    <img
                        className="search-close"
                        src={require("../icons/pill-close.png")}>
                    </img>
                </a>
                <div className="row">
                    <span className="search-title">Search here</span>
                </div>
                <div className="row search-inner">
                    <input 
                        value={this.state.searchValue}
                        className="search-input ml-5"
                        type="text"
                        onChange={this.handleChange}
                        placeholder="type to search">
                    </input>
                    <button className="search-btn">
                        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                        </svg>
                    </button>
                </div>
                <div className="row pills-row">
                    <Pill search={this.search} value="trending" icon={require("../icons/trending.webp")}/>
                    <Pill search={this.search} value={mostRecent1}/>
                    <Pill search={this.search} value={mostRecent2}/>
                    <Pill search={this.search} value={lastTrack} />
                    <Pill search={this.search} value="new releases" render={this.releasesRender} icon={require("../icons/new.webp")}/>
                    {/* <span id="pill-fire" className="pill"><img className="fire" src={require("../icons/trending.webp")}></img>trending<img className="pill-close" src={require("../icons/pill-close.png")}></img></span>
                    <span id="pill1" className="pill">{mostRecent1}<img className="pill-close" src={require("../icons/pill-close.png")}></img></span>
                    <span id="pill2" className="pill">{mostRecent2}<img className="pill-close" src={require("../icons/pill-close.png")}></img></span>
                    <span id="pill3" className="pill">{lastTrack}<img className="pill-close" src={require("../icons/pill-close.png")}></img></span>
                    <span id="pill-new" className="pill"><img className="fire" src={require("../icons/new.webp")}></img>new_releases<img className="pill-close" src={require("../icons/pill-close.png")}></img></span> */}
                </div>
                <div className="row categoryCookie-row">
                    {
                        this.state.searchedReserved.map((item) => {
                            return <CategoryCookie  deviceId={this.props.deviceId} key={item.name} item={item}/>
                        })
                    }
                </div>
                <div className="row">
                    { value
                    ? <span className="search-indicator">Showing results for "{value}"</span>
                    : <span></span>
                    }
                </div>
                <div>
                <div id="results" className="results">
                    <BestSearch
                        render={this.state.best}
                        state={this.props.state}
                        position={this.props.position}
                        currentPlaybackId={this.props.currentPlaybackId}
                        type={type}
                        image={this.state.maxImg}
                        name={this.state.max}
                        artistId={this.state.artistId}
                        deviceId={this.props.deviceId}
                        uniq={this.props.uniq}
                        trackId={this.state.trackId} 
                        userId={this.props.userId}
                        search={this.state.searchValue}
                        restTracks={this.state.restTracks}
                        restArtists={this.state.restArtists}
                        track={this.state.track}
                        artist={this.state.artist}
                        playing={this.props.playing}
                        replay={this.props.replay}
                        replayCounter={this.props.replayCounter}
                        player={this.props.player}
                        openArtist={this.openArtist}
                        blankSearch={this.blankSearch}
                        setContext={this.props.setContext}/>
                    <Personal
                        render={this.state.personal}
                        userId={this.props.userId}
                        deviceId={this.props.deviceId}
                        track={this.state.track}
                        artist={this.state.artist}
                        setContext={this.props.setContext}/>
                    <Releases 
                        render={this.state.releases}
                        blankSearch={this.blankSearch}
                        userId={this.props.userId}
                        deviceId={this.props.deviceId} />
                    {/* <FeaPlaylists /> */}
                    <div className="artist"></div>
                </div>                
                </div>
                </div>
                : undefined
                }
            
            </div>
        );
    };

}

export default Search;