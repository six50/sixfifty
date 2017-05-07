import React from 'react';
import PropTypes from 'prop-types';

import { PARTIES } from '../../utils/election';


export default class CurrentPolls extends React.Component {
  constructor(props) {
    super(props);
    if (props.data) {
      this.state = {data: this.formatData(props.data)};
    } else {
      this.state = {data: {}};
    }
  }

  componentWillMount() {
    if (this.props.url) {
      window.dataHub.get(this.props.url, {}, (response) => {
        response.json().then((data) => {
          const datum = data[1][data[1].length - 1];
          this.setState({data: this.formatData(datum)});
        });
      });
    }
  }

  formatData(data) {
    let oth = 1.0;

    for (const key of PARTIES) {
      oth -= data[key];
    }

    if (oth < 0.000001) {
      // Protect against crappy JS numbers
      oth = 0;
    }

    return {...data, oth: oth};
  }

  render() {
    const parties = [...PARTIES, 'oth'];

    return (
      <ul className="parties">
        {parties.map((key) => (
          <li className="party" key={key}>
            <span className="colour" style={{backgroundColor: this.props.colours[key]}}></span>
            <span className="name">
              {this.props.names[key]}
            </span>
            <span className="percent pull-right">
              {(this.state.data[key] * 100.0).toFixed(1)}%
            </span>
          </li>
        ))}
    </ul>
    );
  }
}

CurrentPolls.propTypes = {
  data: PropTypes.object,
  colours: PropTypes.object,
  names: PropTypes.object,
  url: PropTypes.string
};
