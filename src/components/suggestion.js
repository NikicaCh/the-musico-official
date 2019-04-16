import React, {Component} from 'react'

class Suggestion extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return(
            <div className="suggestion visible">
                <div className="suggestion-timer"></div>
                <div className="suggestion-img"></div>
            </div>
        )
    }
}

export default Suggestion;
