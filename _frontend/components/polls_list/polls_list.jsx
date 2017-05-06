import React from 'react';
import PropTypes from 'prop-types';


export default class Model extends React.Component {
  render() {
    return (
      <div className="model">
        Hello, world
      </div>
    );
  }
}

Model.propTypes = {
  names: PropTypes.object,
  colours: PropTypes.object,
  polls: PropTypes.array
};
