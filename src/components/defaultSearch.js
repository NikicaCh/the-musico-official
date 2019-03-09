import React, {Component} from 'react'

import {accessToken ,UsersTop} from './Fetch'


class DefaultSearch extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        let token = accessToken()
        UsersTop(token, "artists", "medium_term", 50)
        .then((data) => {
            if(data) {
                console.log("DEFAULT",data.data.items)
            }
        })
    }

    render() {
        return(
            <div className="default-search"></div>
        )
    }
}

export default DefaultSearch;