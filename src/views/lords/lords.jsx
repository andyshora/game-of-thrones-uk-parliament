// Imports

import React from 'react';
import { apiService } from '../../services/api-service';
import _ from 'lodash';

console.log(apiService);

// Styles
import './lords.css';

const val = (d, key) => typeof d === 'object' && key in d ? d[key]._value : '';
const count = (d, key) => key in d ? d[key].length : 0;

/**
 * Lords ViewName
 */
const Lords = React.createClass({
  displayName: 'Lords',
  getInitialState() {
    return {
      data: null,
      interests: null
    };
  },
  componentDidMount() {
    apiService.getLords().then(data => this.setState({ data }));
    apiService.getLordsInterests().then((d, i) => {
      const interests = {};
      _.each(d, item => {
        const key = item._about;
        if (item.hasRegisteredInterest.length) {
          interests[key] = item.hasRegisteredInterest;
        }
      })
      this.setState({
        interests
      });
    });
  },
  _getRegisteredInterests(key) {
    const { interests } = this.state;
    if (interests && key in interests) {
      return _.map(interests[key], (interest, i) => {
        return <li key={`interest-${i}`}>{val(interest, 'registeredInterestCategory')} - {val(interest, 'registeredInterest')}</li>
      });
    }
  },
  /**
   * render - render the component
   * @return {ReactElement} markup
   */
  render() {
    const { data } = this.state;
    console.log('data', data);
    const content = data && data.length
      ? _.map(data, (d, i) => {
        return (
          <div className='lord' key={`lord-${i}`}>
            <h3>{val(d, 'givenName')} {val(d, 'familyName')} <i>{val(d, 'fullName')}</i></h3>
            <p>{d.gender._value}</p>
            <p>Twitter: {val(d, 'twitter')}</p>
            <p>Registered Interests: {count(d, 'hasRegisteredInterest')}</p>
            <ul>{this._getRegisteredInterests(d._about)}</ul>
          </div>
        );
      })
      : 'Loading...';
    return (
      <div className='lords'>{content}</div>
    );
  }
});

export default Lords;
