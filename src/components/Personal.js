import React from 'react'
import $ from 'jquery'
import { accessToken ,FeaturingPlaylists, PlayContext, UsersPlaylists} from './Fetch'
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
        } 
    } 
    
    
    componentDidMount() {
        let token = accessToken();
        let array;
        
        
        FeaturingPlaylists(token)
        .then((data) => {
            if(data) {
                let arrayOfFeaturingPlaylists = data.data.playlists.items.slice(0, 5).map((item) => {
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
        return (
            <div>
            {(this.props.personal)
                ? <div className="personal">
                <div className="personal-section">
                    <PlaylistRow data={this.state.arrayOfFeaturingPlaylists} title={"Featuring Playlists"}/>
                    <PlaylistRow data={this.state.arrayOfPersonalPlaylists.slice(0,5)} title={"Made For You"}/>
                    <PlaylistRow data={this.state.arrayOfPersonalPlaylists.slice(5,10)}/>
                </div>            
                </div>
                : <div className="nopersonal"></div>
            }
            </div>
        )
    }
}



export default Personal;