import React, {Component} from 'react';
import './app.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import FaceRecognition from './components/facerecognition/facerecognition';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
import Signin from './components/signin/signin';
import Register from './components/register/register';
import Particles from 'react-particles-js';


const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    // fetch('https://stark-brushlands-72162.herokuapp.com/imageurl', {
      fetch('http://localhost:3002/imageurl', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
    })
  })
  .then(response => response.json())
    .then(response => {
      if (response) {
        // fetch('https://stark-brushlands-72162.herokuapp.com/image', {
          fetch('http://localhost:3002/image', {
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
        })
      })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, {entries: count}))
      })
      .catch(console.log('error'));
    }
      
      this.displayFaceBox(this.calculateFaceLocation(response))
  })
    .catch(err => console.log(err));
  }
  


  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    }
    else if(route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;

  return (
    <div className="App">
      <Particles 
        className="particles"
        params={particlesOptions} 
      />
      <Navigation 
        isSignedIn={this.state.isSignedIn} 
        onRouteChange={this.onRouteChange} 
      />
        { route === 'home' 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : (
              route === 'signin' 
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
    </div>
    );
  }
}

export default App;
