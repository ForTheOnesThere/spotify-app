import { Component } from 'react';
import './App.css';

const clientId = 'ebcbc13ca3b34ed6a4cf0bf4d7579df9';
const redirect = 'http%3A%2F%2Flocalhost:3000%2F';



class App extends Component {
  constructor(){
    super()
    this.state = {
      code: ''
    }
  }

  componentDidMount(){
    this.parseUrl()
  }

  parseUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    this.setState({code: urlParams.get('code')})
    return
  }

  render(){
    return (
      this.state.code===null
      ? <div className="App">
          <button onClick={()=>window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirect}&show_dialog=true`)}>Connect to Spotify</button>
        </div>
      : <div className="App">
          <p>
            Connected to Spotify.
          </p>
          <p>
            The code is {this.state.code}
          </p>
        </div>
    )
  }
}

export default App;
