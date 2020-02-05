import Axios from 'axios';
import queryString from 'query-string';
import stringSimilarity  from 'string-similarity';
import $ from 'jquery';
import Cookies from 'universal-cookie';

const linkToRedirectInDevelopment = "http://localhost:8888/login";
const linkToRedirectInProduction = "https://themusico-redirect.herokuapp.com/login";

export const Port = async () => {
    const response = await fetch('/port')
    const port = await response.json()
    return port;
}

//Get the accessToken from the cookies(not cookies anymore, localstorage now 01/2020)
export const accessToken = () => {
    let token = localStorage.getItem("access")
    return token;
}

export const getGeniusKey = () => {
    let genius = localStorage.getItem("genius");
    return genius;
}

//Get playlists promise
export const fetchPlaylists  = token => { 
    let promise = Axios('https://api.spotify.com/v1/me/playlists', {
        headers: { 'Authorization': 'Bearer ' + token },
    })
    return promise;
} 

export const fetchSongsFromPlaylist = (token, playlistId, userId) => {
    let promise = Axios(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
        headers: { 'Authorization': 'Bearer ' + token },
    })
    return promise;
}

export const SearchFor = (token, searchValue, type, limit) => {
    let promise = Axios(`https://api.spotify.com/v1/search/?q=${searchValue}&type=${type}&limit=${limit}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
        return promise;
}
export const getDevices = (token) => {
    let promise = Axios('https://api.spotify.com/v1/me/player/devices', {
            headers: { 
                'Accept': 'application/json' ,
                'Content-Type': 'application/json' ,
                'Authorization': 'Bearer ' + token },
        })
        .catch(err => {
            if(err.response.status == 401) {
                window.location.replace(linkToRedirectInProduction)
            }
        });
        return promise;
}
export const getCurrentPlayback = (token) => {
    let promise = Axios('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: { 
                'Authorization': 'Bearer ' + token },
        })
        .catch(err => console.log(err));
        return promise;
}

export const RecentlyPlayed = (token, limit) => {
    let promise = Axios('https://api.spotify.com/v1/me/player/recently-played?limit=' + limit, {
            headers: {
                'Authorization': 'Bearer ' + token },
        })
        .catch(err => console.log(err));
    return promise;
}

// export const Recommended = (token) => {
//     let promise = Axios('https://api.spotify.com/v1/recommendations' + limit, {
//             headers: {
//                 'Authorization': 'Bearer ' + token },
//         })
//         .catch(err => console.log(err));
//     return promise;
// }
// export const Search = token => {

// }

export const UsersPlaylists = (token, user) => {
    let promise = Axios(`https://api.spotify.com/v1/users/${user}/playlists`, {
            headers: {
                'Accept': 'application/json' ,
                'Content-Type': 'application/json' ,
                'Authorization': 'Bearer ' + token },
        })
        .catch(err => console.log(err));
    return promise;
}

export const Pause = (token) => {
    fetch('https://api.spotify.com/v1/me/player/pause', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token },
    });
}

export const Play = (token) => {
    fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token },
    });
}

export const PlayContext = (token, uri) => {
    fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token },
        body: JSON.stringify({
            "context_uri": `${uri}`,
            "offset": {
              "position": 0
            },
            "position_ms": 0
          })
    });
}

export const PreviousTrack = (token) => {
    fetch('https://api.spotify.com/v1/me/player/previous', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
    })
}

export const NextTrack = (token) => {
    fetch('https://api.spotify.com/v1/me/player/next', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token },
    });
}

export const Shuffle = (token) => {
    Axios.put('https://api.spotify.com/v1/me/player/shuffle', {
        headers: {
            'Authorization': 'Bearer ' + token },
    });
}

export const SeekPosition = (token, ms) => {
    fetch('https://api.spotify.com/v1/me/player/seek?position_ms=' + ms, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token },
});
}
export const Volume = (token, percent) => {
    fetch('https://api.spotify.com/v1/me/player/volume?volume_percent=' + percent, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token },
});
}

export const Lyrics = (trackName, artist, token) => {
    let track = trackName.replace(/ *\([^)]*\) */g , "");
    if(track.indexOf("Remastered") !== -1) {
        track = track.substring(0, track.indexOf("Remastered"));
    }
    let promise = Axios(`https://api.genius.com/search?q=${artist}-${track}`, {
        method: 'GET',
        params: {
            'Authorization': 'Bearer ' + token,
            'access_token': token
        }
    })
    .catch((err) => { console.log(err) })
    return promise;
}

export const ScrapeLyrics = (url) => {
    
}

export const TransferPlayback = (token, id) => {
    fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token ,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "device_ids": [
              `${id}`
            ]
          })
    });
}

export const getUser = (token) => {
    let promise = Axios('https://api.spotify.com/v1/me', {
            headers: { 
                'Authorization': 'Bearer ' + token },
        })
        .catch(err => console.log(err));
        return promise;
}

export const ReportLyrics = (trackId, userId, userEmail) => {
    Axios.post('http://localhost:8888/reportLyrics', {
        data: {
            trackId: {trackId},
            userId: {userId},
            userEmail: {userEmail}
        }
    })
}

export const Featuring = (id, token) => {
    let promise = Axios(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=SE`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    return promise;
}

export const NewReleases = (token) => {
    let promise = Axios(`https://api.spotify.com/v1/browse/new-releases?limit=5`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    return promise;
}

export const FeaturingPlaylists = (token) => {
    let promise = Axios(`https://api.spotify.com/v1/browse/featured-playlists?limit=20`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    return promise;
}

export const PlaylistsTracks = (token, id, limit) => {
    let promise = Axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=${limit}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    return promise
}

export const GetPlaylist = (token, id) => {
    let promise = Axios(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    return promise
}

export const IfFollowPlaylist = (token, id, user) => {
    let promise = Axios(`https://api.spotify.com/v1/playlists/${id}/followers/contains?ids=${user}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    return promise;
}

export const FollowPlaylist = (token, id) => {
    fetch(`https://api.spotify.com/v1/playlists/${id}/followers`, {
    method: 'PUT',
    headers: {
        'Authorization': 'Bearer ' + token ,
        'Content-Type': 'application/json',
    },
    });
}

export const UnfollowPlaylist = (token, id) => {
    fetch(`https://api.spotify.com/v1/playlists/${id}/followers`, {
    method: 'DELETE',
    headers: {
        'Authorization': 'Bearer ' + token ,
        'Content-Type': 'application/json',
    }});
}

export const UsersTop = (token, type, time_range, limit) => {
    let promise = Axios(`https://api.spotify.com/v1/me/top/${type}?time_range=${time_range}&limit=${limit}&offset=21`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    return promise;
}

export const PlayTrack = (trackUri, token, deviceId) => {
    let uri = trackUri;
    if(typeof(trackUri) === "string") {
        uri = [`${trackUri}`]
    }
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: 'PUT',
    headers: {
        'Authorization': 'Bearer ' + token ,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "uris": uri })
    });
}

export const PlayAlbum = (uri, token, deviceId) => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: 'PUT',
    headers: {
        'Authorization': 'Bearer ' + token ,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "context_uri": uri})
    });
}

export const profile = (token) => {
    let promise = Axios("https://api.spotify.com/v1/me", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return promise;
}

export const RelatedArtists = (token, artistId) => {
    let promise = Axios(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return promise;
}

export const ArtistsAlbums = (token, artistId) => {
    let promise = Axios(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=10`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return promise;
}

export const Seeds = (token, artists, genres, tracks) => {
    let promise = Axios(`https://api.spotify.com/v1/recommendations?seed_artists=${artists}&seed_genres=${genres}&seed_tracks=${tracks}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return promise;
}
// let moving = document.getElementById("background-image");
        //     const windowWidth = window.innerWidth / 2 ;
        //     const windowHeight = window.innerHeight / 2 ;
        
        //     moving.addEventListener('mousemove', (e) => {
        //     const mouseX = e.clientX / windowWidth;
        //     const mouseY = e.clientY / windowHeight;
          
        //     moving.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
        // });