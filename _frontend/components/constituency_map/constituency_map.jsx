import React from 'react';
import PropTypes from 'prop-types';
import * as Shapes from './constituency_shapes';


export default class ConstituencyMap extends React.Component {

  renderConstituency(constituency) {
    const party = this.props.constituencies[constituency];
    const colour = this.props.colours[party] || '#ffffff';

    return (
      <polygon
        points={Shapes.HEXAGONS[constituency]}
        key={constituency}
        fill={colour}
        stroke="#999999"
        strokeWidth="3"
        title="foo"
      >
        <title>{this.constituencyName(constituency)}</title>
      </polygon>
    );
  }

  renderHexagonalBorder(path, key) {
    return (
      <path
        stroke="#000000"
        strokeWidth="5"
        fill="none"
        d={path}
        key={key}
      />
    );
  }

  render() {
    const constituencies = Object.keys(Shapes.HEXAGONS);
    const width = Shapes.HEXAGON_MAP_WIDTH;
    const height = Shapes.HEXAGON_MAP_HEIGHT;

    return (
      <div className="constituency-map">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {constituencies.map(this.renderConstituency.bind(this))}
          {Shapes.HEXAGON_BORDERS.map(this.renderHexagonalBorder.bind(this))}
        </svg>
      </div>
    );
  }

  constituencyName(constituency) {
    return constituency.replace(/_/g, ' ').replace(/\s+/g, ' ');
  }

}

Map.propTypes = {
  constituencies: PropTypes.object,
  colours: PropTypes.object
};
