import React from 'react'
import { accessToken } from './Fetch';


class RestArtists extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            artists: ""
        }
    }

    componentWillReceiveProps() {
        let artists = this.props.artists.map((artist) => {
            let source;
            if(artist.images.length !== 0) {
                source = artist.images[0].url
            } else {
                source="http://abs2018.lbsafricaclub.org/wp-content/uploads/2016/03/profile-placeholder.png"
            }
            return(
                <div
                    className="rest-artist-div"
                    id={artist.id}
                    onClick={() => {
                        let token = accessToken();
                        let id = artist.id;
                        let value = artist.name
                        this.props.openArtist(token, value, id) //Open artist
                    }}>
                    <img src={source}></img>
                    <div className="row">
                        <h1 className="artist-value"
                            id={artist.name}
                            >{artist.name}</h1>
                    </div> 
                </div>
            )
        })
        this.setState({artists})
    }

    render() {
        return(
            <div className="container">
                <div className="rest-artists row">
                    {this.state.artists}
                </div>
            </div>
        )
    }
}


export default RestArtists;