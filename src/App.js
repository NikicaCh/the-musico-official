import React, { Component } from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import {accessToken, getDevices} from './components/Fetch';
import Cookies from 'universal-cookie';
import './App.css';
import queryString from 'query-string';
import Home from './components/Home';
import Player from './components/Player';
import AboutPage from './components/AboutPage';
import CookiePolicy from './components/cookiePolicy'
import NotFound from './components/NotFound'



//import components
import Logo from './components/logo'
import WiderScreen from './components/widerscreen';


class App extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      token: '',
      refresh: 0,
      narrowScreen: false
    }
    this.handleRedirect = this.handleRedirect.bind(this)
    this.refresToken = this.refresToken.bind(this)
    this.screenWidth = this.screenWidth.bind(this)
  }

  screenWidth = () => {
    if(window.innerWidth < 1200) {
      this.setState({ narrowScreen: true });
    } else {
      let update_width  = window.innerWidth-100;
      let update_height = Math.round(update_width/4.4);
      this.setState({ narrowScreen: false });
    }
  }

  handleRedirect = () => {
    window.location.replace("http://localhost:3001/login");
  }
  refresToken = async () => {
    const response = await fetch('http://localhost:3001/token');
    const json = await response.json();
    const cookies = new Cookies();
    cookies.remove("access", ["Expires=Thu, 01 Jan 1970 00:00:01 GMT;"])
    cookies.set("access", json.access_token)
  }
  
  componentDidMount() {
    this.screenWidth();
    window.addEventListener("resize", this.screenWidth);
  }
  componentWillUnmount() {
    const cookies = new Cookies();
    cookies.remove("access", ["Expires=Thu, 01 Jan 1970 00:00:01 GMT;"])
  }
  render() {
    document.title = "The Musico";
    const linkToRedirectInDevelopment = "http://localhost:8888/login";
    const linkToRedirectInProduction = "https://themusico-redirect.herokuapp.com/login";
    const linkEnv = linkToRedirectInProduction;
    let token = accessToken();
    getDevices(token)
    let date = new Date();
    Date.prototype.addHours= function(h){
      this.setHours(this.getHours()+h);
      return this;
    } //to add one hour on access_date cookie
    const cookies = new Cookies();
    let parsed = queryString.parse(document.location.search)
    if(parsed.spotify) {
      cookies.set("access", parsed.spotify)
      cookies.set("genius", parsed.genius)
      cookies.set("access_time", date.toString())
      window.location.replace("/")
    } else if( typeof cookies.get("access_time") === "undefined" || new Date(cookies.get("access_time").toString()).addHours(1).toString() < new Date().toString()) {
      window.location.replace(linkEnv)   
    }
    this.timer = setInterval(() =>  {
      window.location.replace(linkEnv)   
    }, 2500000);
    return (
      <div id="app" className="App">     
      <BrowserRouter>
      <Switch>
       { /*The home route */}
        <Route exact path="/home" render ={ () => {
          return(
            <div>
              <Logo color="" />
              <Home/>
            </div>
          );
        }
        }
        />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/cookie" component={CookiePolicy} />
        <Route exact path="/" render = { () => {
          return (
            <div>
              <Logo color={"-black"} />
              <Player/>
            </div>
            );
          }
        }
        />
        <Route path="/" component={NotFound} />
      </Switch>
    </BrowserRouter>
      {
        (this.state.narrowScreen === true)
        ? <WiderScreen />
        :<div></div>
      }   
      </div>
    );
  }
}

export default App;
