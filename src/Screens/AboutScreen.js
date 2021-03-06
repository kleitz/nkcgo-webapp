import React, { Component } from 'react';
import appConfig from '../Config/params';

const style = {
  width: '100%',
  height: '100%',
  margin: '0px'
}

const line1 = "NKCGo, the Ultimate Guide to North Kansas City, MO!";
const line2 = "Check-in at dozens of points of interests along our famous mile-and-a-half Pint Path, track your progress among new local discoveries, and win prizes during NKC events like September's Swift Mile, our summertime Arts in the Park, and the long-running Snake Saturday Parade in March!";
const line3 = "The NKCGo app is your guide to entertainment, events, points of interest and the community of North Kansas City. From restaurants and bars, breweries and distilleries, retail and entertainment venues, parks and community spaces to art installations and historical points of interest, North Kansas City has it all!";
const line4 = "Brought to you by Northland Festivals/Snake Saturday & The Swift Mile Street Festival."


export default class AboutScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { width: '0', height: '0' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return (
      <div>
           <p style={styles.aboutText}>{line1} </p>
           <p style={styles.aboutText}>{line2} </p>
           <p style={styles.aboutText}>{line3} </p>
           <p style={styles.aboutText}>{line4} </p>
      </div>

      );
  }
}

const styles = {
  aboutText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  }

};
