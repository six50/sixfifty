import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash.sortby';

import { PARTIES } from '../../utils/election';

const ROWS = 10;
const COLUMNS = 65;
const MARGIN = 3;
const SEAT_SIZE = 10;
const RENDER_WIDTH = (COLUMNS * SEAT_SIZE) + ((COLUMNS - 1) * MARGIN);
const RENDER_HEIGHT = (ROWS * SEAT_SIZE) + ((ROWS - 1) * MARGIN);

if ((ROWS * COLUMNS) != 650) throw "Invalid seat count";


export default class SeatDistribution extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // if (this.props.url) {
    //   window.dataHub.get(this.props.url, {}, (response) => {
    //     response.json().then((data) => {
    //       const datum = data[1][data[1].length - 1];
    //       this.setState({data: this.formatData(datum)});
    //     });
    //   });
    // }
  }

  calculateRegionPaths() {
    const paths = [];

    for (let c = 0; c < COLUMNS; c++) {
      for (let r = 0; r < ROWS; r++) {
        paths.push({
          x: (c * SEAT_SIZE) + (c * MARGIN),
          y: (r * SEAT_SIZE) + (r * MARGIN),
          width: SEAT_SIZE,
          height: SEAT_SIZE,
        });
      }
    }

    return paths;
  }

  * calculateSeats() {
    const paths = this.calculateRegionPaths();

    for (const [party, seats] of this.props.partySeats) {
      for (let i = 0; i < seats; i++) {
        const path = paths.shift();
        yield {
          ...path,
          colour: this.props.colours[party] || this.props.colours['oth'],
          name: this.props.names[party],
          key: `${party}-${i}`
        }
      }
    }
  }

  render() {
    return (
      <div className="seat-distribution">
        <svg width="100%" viewBox={`0 0 ${RENDER_WIDTH} ${RENDER_HEIGHT}`}>
          {Array.from(this.calculateSeats()).map(seat => (
            <rect key={seat.key} x={seat.x} y={seat.y} width={seat.width} height={seat.height} style={{
              fill: seat.colour
            }} />
          ))}
        </svg>
      </div>
    );
  }
}

SeatDistribution.propTypes = {
  partySeats: PropTypes.array,
  colours: PropTypes.object,
  url: PropTypes.string
};
