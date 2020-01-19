import React from 'react'
import ExplicitTwoToneIcon from '@material-ui/icons/ExplicitTwoTone';
const Explicit = (props) => {
    return(
        <div>
        {(props.explicit)
            ?<div title={"Explicit version"} className="explicit"><ExplicitTwoToneIcon style={{ fill: '#e3e64b' }}/></div>
            :<div></div>}
        </div>
    )
}

export default Explicit;