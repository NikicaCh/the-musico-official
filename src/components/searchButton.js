import React from 'react'
import $ from 'jquery'

class SearchButton extends React.Component {
    constructor(props) {
        super(props);

        this.searchModal = this.searchModal.bind(this)
    }

    searchModal() {
        // $("#search").toggleClass("hide")
        // if($(".paused-div").hasClass("visible")) {
        //     $(".paused-div").removeClass("visible")
        //     $(".paused-div").addClass("hide")
        // } else {
        //     $(".paused-div").removeClass("hide")
        //     $(".paused-div").addClass("visible")
        // } 
        this.props.toggleRender()   
    }
    render() {
        return(
            <div>
                <span
                    className={`search-div${this.props.color}`}
                    onClick={this.searchModal}
                    >browse
                </span>
                {/* <img className="eject" src={require("../icons/eject.webp")} alt="eject"></img>         */}
            </div>
        )
    }
}

export default SearchButton;
