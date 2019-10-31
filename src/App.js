import React, {Component} from 'react';
import './App.scss';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
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

  render() {
  return (
    <div className="App">
      <Particles 
        className="particles"
        params={particlesOptions} />
      <Navigation />
      <Logo />
      <ImageLinkForm onInputChange={this.onInputChange}/>
      <Rank />
      {/* <FaceRecognition /> */}
    </div>
  );
  }
}

export default App;
