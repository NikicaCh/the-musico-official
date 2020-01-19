import React from 'react'
import {Featuring, accessToken, PlayTrack, getDevices, Pause, RelatedArtists, ArtistsAlbums, Seeds} from './Fetch'
import $ from 'jquery'
import Cookies from 'universal-cookie'

import RestTracks from './restTracks'
import RestArtists from './restArtists'
import Artist from './Artist'
import ArtistTrack from './ArtistTrack'
import ArtistAlbum from './ArtistsAlbum'

class BestSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            featuring: [],
            albums: [],
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
            arrayOfRelatedArtists: []
        }

        this.featuring = this.featuring.bind(this),
        this.albums = this.albums.bind(this),
        this.seeds = this.seeds.bind(this),
        this.related = this.related.bind(this)
    }

    featuring = () => {
        if(this.props.type !== "") {
            let token = accessToken();
            Featuring(this.props.artistId, token )
            .then((data) => {
                if(data) {
                    let index = 0;
                    let arrayOfUris = []
                    data.data.tracks.map((track) => {
                        return arrayOfUris.push(track.uri)
                    })
                    this.setState({arrayOfUris}, () => {
                        this.seeds()
                    })
                    let array = data.data.tracks.slice(0, 10).map((track) => {
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
                        return  <ArtistTrack track={track} index={index} src={src} id={track.uri} deviceId={this.state.deviceId} trackName={track.name} name={name}/>
                    })
                    this.setState({featuring: array, arrayOfUris})
                }
            })
        }
    }

    albums = () => {
        let token=accessToken();
        ArtistsAlbums(token, this.props.artistId)
        .then((data) => {
            if(data) {
                let ids = [];
                let arrayOfAlbums = [];
                data.data.items.map((item) => {
                    if(ids.indexOf(item.id) == -1) {
                        arrayOfAlbums.push(item);
                        ids.push(item.id)
                    }
                    
                })
                let albums = arrayOfAlbums.map((album) => {
                    
                    return <ArtistAlbum album={album} deviceId={this.state.deviceId} />
                })
                this.setState({albums})
            }
        })
    }

    seeds = () => {
        // let token = accessToken();
        // if(this.props.artist !== "") {
            let genres = this.props.artist.genres.slice(0, 5)
        //     let uris = ""
            console.log("GENRES:", genres, )
        //     Seeds(token, this.props.artist.id, genres, uris )
        //     .then((data) => {
        //         if(data) {
        //             console.log(data.data)
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
        // }
    }

    related = () => {
        let token = accessToken();
        RelatedArtists(token, this.props.artistId)
            .then((data) => {
                let arrayOfRelatedArtists = data.data.artists.map((artist) => {
                    return <span id={artist.id} className="related-artist" onClick={(e) => {
                            let target = e.target;
                            let value = target.innerHTML;
                            let token = accessToken();
                            this.props.openArtist(token, value, artist.id)
                    }}>{artist.name}</span>
                })
                this.setState({arrayOfRelatedArtists})
            })
    }

    componentDidMount() {
        document.getElementById("results").addEventListener("wheel", (e) => {
            if(e.deltaY > 0) { //scroll down
            }
        })
        let token = accessToken();
        let userId = this.props.userId;
        this.featuring();
        this.albums();
        this.related();
        getDevices(token)
        .then((data) => {
            if(data) {
                data.data.devices.forEach((device) => {
                    if(device.name === `MUSICO ${this.props.uniq}`) {
                        let deviceId = device.id;
                        this.setState({deviceId}, () => {
                            // $("body").on('click', '.play-track', (e) => {
                            //     if(this.props.type === "artist"){
                            //         let slicedFromStarting = this.state.arrayOfUris.slice(this.state.arrayOfUris.indexOf(trackId))
                            //         PlayTrack(slicedFromStarting, token, this.state.deviceId);
                            //         this.setState({context: "search artist", currentId: trackId})
                            //         let cookies = new Cookies();
                            //         let data1 = cookies.get(`mostRecent1${userId}`)
                            //         let data2 = this.props.artist.name
                            //         if(data1 !== data2 && cookies.get(`mostRecent2${userId}`) !== data2 ) {
                            //             cookies.set(`mostRecent2${userId}`, data1, {expires: new Date(Date.now()+2592000)})
                            //             cookies.set(`mostRecent1${userId}`, data2, {expires: new Date(Date.now()+2592000)})
                            //         }
                            //     } else {
                            //         let slicedFromStarting = this.state.restTracksUris.slice(this.state.restTracksUris.indexOf(trackId))
                            //         PlayTrack(slicedFromStarting, token, this.state.deviceId);
                            //         this.setState({context: "search track"})
                            //         let cookies = new Cookies();
                            //         cookies.set(`lastTrack${userId}`, this.props.track.name, {expires: new Date(Date.now()+2592000)}) //the track name
                            //     }
                            // }); 
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
        let token = accessToken();
        this.setState({type: this.props.type, name: this.props.max}, () => {
            this.featuring();
            this.albums();
            this.related();
        })
        

        if(this.props.restTracks && this.props.restTracks.length) {
            let arrayOfRestTracks;
            let restTracks = this.props.restTracks.map((track) => {
                if(track.type === "track") {
                    return track;
                }
            })
        }
        if(this.props.artist !== "") { //not making requests without search value
            
        }
        
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
            {
                render
                ? <div>
                    <Artist //this is the top result artist (if artist is type )
                        trackId={this.props.trackId}
                        deviceId={this.state.deviceId}
                        image={this.props.image}
                        type={this.props.type}
                        name={this.props.name}
                        featuring={this.state.featuring}
                        albums={this.state.albums}
                        arrayOfRestTracks={this.state.arrayOfRestTracks}
                        blankSearch={this.props.blankSearch}
                        arrayOfRelatedArtists={this.state.arrayOfRelatedArtists}
                        />
                        {this.props.type === "artist" 
                    ? <div className="row related-artists">{this.state.arrayOfRelatedArtists.slice(0, 5)}</div>
                    : undefined
                    }
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