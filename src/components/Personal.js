import React from 'react'
import $ from 'jquery'
import { accessToken ,FeaturingPlaylists, PlayContext, UsersPlaylists, NewReleases} from './Fetch'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Axios from 'axios'


//COMPONENTS
import PlaylistRow from './PlaylistRow'



class Personal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            arrayOfFeaturingPlaylists: [],
            featuringDetails: "",
            arrayOfPersonalPlaylists: [],
            newUser: false
        } 
    } 
    
    
    componentDidMount() {
        let token = accessToken();
        let array;
        
        
        FeaturingPlaylists(token)
        .then((data) => {
            if(data) {
                let arrayOfFeaturingPlaylists = data.data.playlists.items.slice(0, 6).map((item) => {
                    return item              
                })
                this.setState({arrayOfFeaturingPlaylists})
            }
        })
        .catch(err => console.log(err))
        UsersPlaylists(token, this.props.userId)
        .then((data) => {
            if(data) {
                let arrayOfPersonalPlaylists = data.data.items.map(item => {
                    return item
                })
                this.setState({arrayOfPersonalPlaylists})
            }
        })
        
    }

    
    

    render() {

        const addIcon = {
            margin: "auto"
        } 
        return (
            <div>
            {(this.props.render)
                ? <div className="personal">
                <div className="personal-section">
                    <PlaylistRow data={this.state.arrayOfFeaturingPlaylists} title={"Featuring Playlists"} userId={this.props.userId} deviceId={this.props.deviceId} setContext={this.props.setContext}/>
                    {
                        this.state.arrayOfPersonalPlaylists.length > 0
                        ? <div><PlaylistRow data={this.state.arrayOfPersonalPlaylists.slice(0,5)} title={"Made For You"} userId={this.props.userId} deviceId={this.props.deviceId} setContext={this.props.setContext}/>
                          <PlaylistRow data={this.state.arrayOfPersonalPlaylists.slice(5,10)} userId={this.props.userId} deviceId={this.props.deviceId} setContext={this.props.setContext}/></div>
                        : <div>
                            <h1 className="first-playlist">Create your first playlist</h1>
                            <div className="new-playlist">
                                <AddCircleIcon style={this.addIcon}/>
                            </div>
                          </div>
                    }
                    
                </div>            
                </div>
                : <div className="nopersonal"></div>
            }
            </div>
        )
    }
}



export default Personal;