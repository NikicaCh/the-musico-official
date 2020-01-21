import React from 'react'
import ExplicitTwoToneIcon from '@material-ui/icons/ExplicitTwoTone';
const Explicit = (props) => {
    return(
        <div>
        {(props.explicit)
            ?<div title={"Explicit version"} className="explicit"><ExplicitTwoToneIcon style={{ fill: '#F6F337' }}/></div>
            :undefined
            }
        </div>
    )
}

export default Explicit;