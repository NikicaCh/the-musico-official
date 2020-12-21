import React from 'react';

const Logo = (props) => {
    return(
        <div className="player-logo-hover">
                <img className="musico-logo bottom" src={require(`../icons/musico-logo${props.color}.webp`)}></img>
                <img className="spotify-logo" title="Powered by SPOTIFY" src={require(`../icons/spotify.webp`)}></img>
        </div>
    )
}
    


export default Logo;
