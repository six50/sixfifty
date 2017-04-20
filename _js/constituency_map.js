import React from 'react';
import PropTypes from 'prop-types';
import * as Shapes from './constituency_shapes';


export default class ConstituencyMap extends React.Component {

  renderConstituency(constituency, key) {
    const party = this.props.constituencies[constituency];
    const colour = this.props.colours[party] || '#ffffff';

    if (!Shapes.GEOGRAPHIC_BORDERS[constituency]) {
      console.log(constituency);
    }

    if (this.props.geographic) {
      return (
        <path
          d={Shapes.GEOGRAPHIC_BORDERS[constituency]}
          fill={colour}
          stroke="#000000"
          strokeWidth="0.5"
          key={key}
        >
          <title>{this.constituencyName(constituency)}</title>
        </path>
      );
    } else {
      return (
        <polygon
          points={Shapes.HEXAGONS[constituency]}
          key={key}
          fill={colour}
          stroke="#999999"
          strokeWidth="3"
          title="foo"
        >
          <title>{this.constituencyName(constituency)}</title>
        </polygon>
      );
    }
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
    const width = this.props.geographic ? Shapes.GEOGRAPHIC_MAP_WIDTH : Shapes.HEXAGON_MAP_WIDTH;
    const height = this.props.geographic ? Shapes.GEOGRAPHIC_MAP_HEIGHT : Shapes.HEXAGON_MAP_HEIGHT;

    return (
      <div className="constituency-map">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {constituencies.map(this.renderConstituency.bind(this))}
          {this.props.geographic ? '' :
            Shapes.HEXAGON_BORDERS.map(this.renderHexagonalBorder.bind(this))
          }
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
  colours: PropTypes.object,
  geographic: PropTypes.bool
};
