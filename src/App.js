import React, {Component} from 'react';
import './App.scss';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
  apiKey: 'd505dd7e86464d1da1865f5017f2e742'
 });

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

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      console.log(response);
    },
    function(err) {
      // there was an error
    }
  );
  }

  render() {
  return (
    <div className="App">
      <Particles 
        className="particles"
        params={particlesOptions} />
      <Navigation />
      <Logo />
      <ImageLinkForm 
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit}
        />
      <Rank />
      {/* <FaceRecognition /> */}
    </div>
  );
  }
}

export default App;
