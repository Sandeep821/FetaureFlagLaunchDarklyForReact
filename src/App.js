import React, { Component } from 'react';
import './App.css';
import LDClient from 'ldclient-js';

class App extends Component {
  constructor() {
    super()
    this.state = {
      selectedSortOrder: null,
      vehicle: [
        { name: 'ATLAS', msrp: '50000' },
        { name: 'PASSAT', msrp: '60000' },
        { name: 'TIGUAN', msrp: '55000' },
        { name: 'GOLF', msrp: '52000' },
        { name: 'JETTA', msrp: '42000' },
        { name: 'BEETLE', msrp: '320000' },
      ]
    }
  }
  componentDidMount() {
    const user = {
      key: 'user01'
    }
    this.ldclient = LDClient.initialize('5fb5df8a638e9208ac37bcaa', user)
    this.ldclient.on('ready', this.onLaunchDarklyUpdated.bind(this))
    this.ldclient.on('change', this.onLaunchDarklyUpdated.bind(this))
  }
  onLaunchDarklyUpdated() {
    console.log('newBrand01Theme FLAG : ', this.ldclient.variation('newBrand01Theme'))
    this.setState({
      featureFlags: {
        newBrand01Theme: this.ldclient.variation('newBrand01Theme')
      }
    })
  }
  render() {
    if (!this.state.featureFlags) {
      return <div className="App">Loading....</div>
    }

    return (
      <div className="App" style={{height:'1000px', backgroundColor: this.state.featureFlags.newBrand01Theme ? 'grey' : 'white'}}>
        <div style={{marginTop:'50px'}}><h1>Launchdarkly feature flag POC 01</h1></div>
        <div><h2>BRAND_01 SITE</h2></div>
        <ul style={{marginTop:'100px'}}>
          {this.state.vehicle.map((car, index) =>
             <div key={index} style={{padding:'50px', display:'inline', margin:'10px', backgroundColor: this.state.featureFlags.newBrand01Theme ? 'white' : '#b7b5b5'}}><strong>{car.name}</strong></div>
          )}
        </ul>
      </div>
    );
  }
}

export default App;