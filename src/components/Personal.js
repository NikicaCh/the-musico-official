import React from 'react'
import $ from 'jquery'
import { accessToken ,FeaturingPlaylists, PlayContext, UsersPlaylists} from './Fetch'
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
        
        UsersPlaylists(token, this.props.userId)
        .then((data) => {
            if(data) {
                let arrayOfPersonalPlaylists = data.data.items.map(item => {
                    return item
                })
                this.setState({arrayOfPersonalPlaylists})
            }
        })
        FeaturingPlaylists(token)
        .then((data) => {
            if(data) {
                let arrayOfFeaturingPlaylists = data.data.playlists.items.map((item) => {
                    let condition = this.state.arrayOfPersonalPlaylists.forEach((personal) => {
                        if(personal.uri === item.uri) {
                            return true
                        } else {
                            return false
                        }
                    })
                    console.log("COND",condition)
                    // if(!condition){ return item}
                    return item
                })
                this.setState({arrayOfFeaturingPlaylists})
            }
        })
        .catch(err => console.log(err))
        
        
    }

    
    

    render() {

        const addIcon = {
            width: "2vw",
            height: "2vw",
            position: "relative",
            top: "41%",
            left: "41%"
        } 
        return (
            <div>
            {(this.props.render)
                ? <div className="personal">
                <div className="personal-section">
                    <PlaylistRow data={this.state.arrayOfFeaturingPlaylists.slice(0,5)} title={"Featuring Playlists"} userId={this.props.userId} deviceId={this.props.deviceId} setContext={this.props.setContext}/>
                    {
                        this.state.arrayOfPersonalPlaylists.length > 0
                        ? <div><PlaylistRow data={this.state.arrayOfPersonalPlaylists.slice(0,5)} title={"Made For You"} userId={this.props.userId} deviceId={this.props.deviceId} setContext={this.props.setContext}/>
                          <PlaylistRow data={this.state.arrayOfPersonalPlaylists.slice(5,10)} userId={this.props.userId} deviceId={this.props.deviceId} setContext={this.props.setContext}/></div>
                        : <div>

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