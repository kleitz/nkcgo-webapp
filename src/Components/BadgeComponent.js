import React, { Component } from 'react';

export default class BadgeComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      badges: props.badges
    };
    console.log('initial Props');
    console.log(props.badges);
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps.VenuesData');
    console.log(nextProps.badges);
    this.setState({ badges: nextProps.badges });  
  }

  goTo(route) {
    // alert(route);
    this.props.history.replace(`/${route}`)
  }

  render() {

    return (
        <div>
        {
          this.state.badges.map((mybadge) => (
            <div
              key={mybadge.key}
            >
              <img
                alt=""
                src={mybadge.image}
              />
              <p>{mybadge.badgeName}</p>
            </div>
          ))
      }
      </div>
    );
  }
}