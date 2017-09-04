import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
const UI_IMAGES_BASE_URL = 'https://s3.us-east-2.amazonaws.com/swiftmile-app-assets/';

export default class SnapComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      snaps: props.snaps
    };
    console.log('initial Props');
    console.log(props.snaps);
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps.snaps');
    console.log(nextProps.snaps);
    this.setState({ snaps: nextProps.snaps });  
  }

  goTo(route) {
    // alert(route);
    this.props.history.replace(`/${route}`)
  }

  render() {

    return (
        <div>
        {
          this.state.snaps.map((snap) => (
            <div
              key={snap.key}
            >
              <img
                alt=""
                src={UI_IMAGES_BASE_URL + snap.image_url}
              />
              <p>{snap.venue}</p>
            </div>
          ))
      }
      </div>
    );
  }
}