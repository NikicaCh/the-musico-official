import React, {Component} from 'react'

class PauseDiv extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title: "Paused",
            span1: `Press "Space" to resume`,
            span2: `Press "R" to replay`,
        }
    }

    componentDidMount(prevProps) {
    }

    render() {
        let playing = this.props.playing
        return(
            <div>
                {
                    playing
                    ? <span></span>
                    :<div className="paused-div fade-in visible">
                        <span className="paused-indicator">{this.props.pausedState}</span>
                        <span className="pause-help">{this.state.span1}</span>
                        <span className="pause-replay">{this.state.span2}</span>
                    </div>
                }
            </div>            
        )
    }
}

export default PauseDiv;