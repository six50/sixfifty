import React from 'react';
import PropTypes from 'prop-types';

import ConstituencyMap from '../constituency_map/constituency_map';

const MODEL_PARTY_TRANSLATIONS = {
  'Lab': 'lab',
  'C': 'con',
  'LD': 'ld',
};

export default class Model extends React.Component {
  constructor(props) {
    super(props);

    this.predictions = {};

    for (let prediction of props.predictions) {
      let winner = MODEL_PARTY_TRANSLATIONS[prediction.winner] || 'oth';
      let name = prediction.constituency
        .replace(/\&/g, 'and')
        .replace(/\s+/g, '_')
        .replace(/_+/g, '_')
        .replace(',', '');

      this.predictions[name] = winner;
    }
  }

  render() {
    return (
      <div className="model">
        <ConstituencyMap
          constituencies={this.predictions}
          colours={this.props.colours}
        />
      </div>
    );
  }
}

Model.propTypes = {
  predictions: PropTypes.array,
  colours: PropTypes.object
};
