import React from 'react'
import $ from 'jquery'

class Legend extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            label: "",
        }
    }

    componentDidMount() {
        $(".legend-button").on("mouseover", (e) => {
            e.target.style.opacity = 1;
            let id = (e.target.className.substr(-1))
            if(id == 1) {
                this.setState({label: "volume up"})
            } else if(id == 2) {
                this.setState({label: "search"})
            } else if(id == 3) {
                this.setState({label: "repeat"})
            } else if(id == 4) {
                this.setState({label: "play/pause"})
            } else if(id == 5) {
                this.setState({label: "prev track"})
            } else if(id == 6) {
                this.setState({label: "volume down"})
            } else if(id == 7) {
                this.setState({label: "next track"})
            }
        })
        $(".legend-button").on("mouseleave", (e) => {
            this.setState({label: ""})
            e.target.style.opacity = .5;
        })
    }

    render() {
        // let legendDiv = {
        //     .legend-div {
        //         position: absolute;
        //         width: auto;
        //         height: auto;
        //         z-index: 5;
        //         top: 90%;
        //         left: 65%;
        //         color: white;
        //       }
        // }
        return (
            <div className="legend-div">
                <div className="container row legend-up">
                    <div className="col-sm-2 mr-2 w-20 legend-button btn-1"><span>{String.fromCharCode(8593)}</span></div>
                </div>
                <div className="container row legend-middle">
                    <div className="col-sm-2 mr-2 w-20 legend-button btn-2"><span>S</span></div>
                    <div className="col-sm-2 mr-2 w-20 legend-button btn-3"><span>R</span></div>
                    <div className="col-sm-4 mr-2 w-60 legend-button btn-4"><span>Space</span></div>
                </div>
                <div className="container row legend-down">
                    <div className="col-sm-2 mr-2 w-20 legend-button btn-5"><span>{String.fromCharCode(8592)}</span></div>
                    <div className="col-sm-2 mr-2 w-20 legend-button btn-6"><span>{String.fromCharCode(8595)}</span></div>
                    <div className="col-sm-2 mr-2 w-20 legend-button btn-7"><span>{String.fromCharCode(8594)}</span></div>
                </div>
                <div className="legend-label">
                    {(this.state.label !== "") 
                    ? this.state.label
                    : <div></div>}
                </div>
            </div>
        )
    }
    
}

export default Legend;