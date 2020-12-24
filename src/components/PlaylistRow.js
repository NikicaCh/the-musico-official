import React, { Component } from 'react'


import Playlist from './Playlist'
import PlaylistDetails from './Playlist-details'




class PlaylistRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            playlists: [],
            detailsName: "",
            detailsOwner: ""
        }

        this.setDetails = this.setDetails.bind(this);
    }

    setDetails = (name, owner) => {
        this.setState({detailsName: name, detailsOwner: owner})
    }

    componentDidMount() {
        let playlists = this.props.data.map((playlist) => {
            return playlist
        })
        this.setState({playlists})
    }

    render() {
        return(
            <div className="playlist-row">
                <h1 className="featuring-playlists">{this.props.title}</h1>
                {this.props.data.map((item, index) => (<Playlist key={`playlist${index}`} item={item} setDetails={this.setDetails} deviceId={this.props.deviceId} userId={this.props.userId} setContext={this.props.setContext}/>))}
                <PlaylistDetails
                    name={this.state.detailsName}
                    owner={this.state.detailsOwner} />
            </div>
        )
    }
}



export default PlaylistRow;