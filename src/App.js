import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageForm from './components/ImageForm/ImageForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import 'tachyons'
import ParticlesBg from 'particles-bg';
import React, { Component } from 'react'


const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: "signin",
  signedIn: false,
  user: {
    id: '',
    name: '',
    email: "",
    entries: 0,
    joined: ""
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: "signin",
      signedIn: false,
      user: {
        id: '',
        name: '',
        email: "",
        entries: 0,
        joined: ""
      }
    }
  }

  loadUser = (updatedUser) => {
    this.setState({
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        entries: updatedUser.entries,
        joined: updatedUser.joined
      }
    })
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(` Width ${width}, Height: ${height}`)
    console.log("Raw Data ", data)
    console.log("1st Data ", clarifaiFace)
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    console.log("Box: ", box)
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  returnRequestOptions = (imgURL) => {
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '7553547b182541f786ade4aa6552f0df';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'alcoranpaul';
    const APP_ID = 'face-recognition';
    // Change these to whatever model and image URL you want to use
    // const MODEL_ID = 'face-detection';
    const IMAGE_URL = imgURL;

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };
    return requestOptions;

  }

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", this.returnRequestOptions(this.state.input))
      .then(response => response.json())
      .then(result => {
        if (result) {
          fetch('http://localhost:3000/image', {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          }) //Local host route for image
            .then(res => res.json())
            .then(count => {
              this.setState(
                Object.assign(this.state.user, { entries: count })
              )
            })
        }
        this.displayFaceBox(this.calculateFaceLocation(result));
      })
      .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === "signin") {
      this.setState(initialState)
    }
    else if (route === "home") {
      this.setState({ signedIn: true })
    }
    this.setState({ route: route });
  }

  render() {
    const { signedIn, box, imageURL, route } = this.state;
    return (
      <div className="App" >
        <ParticlesBg color="#00f2ff" type="cobweb" className="particles" bg={true} />
        <Navigation isSignedIn={signedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <div>
            <Logo />
            <Rank userName={this.state.user.name} userEntries={this.state.user.entries} />
            <ImageForm onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={box} imageURL={imageURL} />
          </div>
          :
          (route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />)
        }
      </div>
    );
  }

}

export default App;
