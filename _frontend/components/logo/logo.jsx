import React from 'react';
import PropTypes from 'prop-types';

import { PARTIES } from '../../utils/election';

const RENDER_SIZE = 100;


export default class Logo extends React.Component {
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

  calculateSectors() {
    const colours = this.props.colours;

    var l = RENDER_SIZE / 2;
    var a = 0 // Angle
    var aRad = 0; // Angle in Rad
    var aCalc = 0;
    var z = 0; // Size z
    var x = 0; // Side x
    var y = 0; // Side y
    var X = 0; // SVG X coordinate
    var Y = 0; // SVG Y coordinate
    var R = 0; // Rotation
    var arcSweep = 0;

    const parties = [...PARTIES, 'oth'];

    return parties.map((key) => {
      const percentage = this.state.data[key];
      a = 360 * percentage;
      aCalc = (a > 180) ? 360 - a : a;
      aRad = aCalc * Math.PI / 180;
      z = Math.sqrt(2 * l * l - (2 * l * l * Math.cos(aRad)));
      if(aCalc <= 90) {
        x = l * Math.sin(aRad);
      }
      else {
        x = l * Math.sin((180 - aCalc) * Math.PI / 180 );
      }

      y = Math.sqrt(z*z - x*x);
      Y = y;

      if (a <= 180) {
        X = l + x;
        arcSweep = 0;
      }
      else {
        X = l - x;
        arcSweep = 1;
      }

      const Rout = R;
      R = R + a;

      if (isNaN(Y)) {
        debugger;
      }

      return {
        percentage: this.state.data[key],
        colour: colours[key],
        arcSweep: arcSweep,
        L: l,
        X: X,
        Y: Y,
        R: Rout
      };
    });
  }

  renderSector(sector, key) {
    return (
      <path
        fill={sector.colour}
        d={`M${sector.L}, ${sector.L} L${sector.L},0 A${sector.L}, ${sector.L} 0 ${sector.arcSweep},1 ${sector.X}, ${sector.Y} z`}
        transform={`rotate(${sector.R}, ${sector.L}, ${sector.L})`}
        key={key}
      />
    );
  }

  render() {
    return (
      <div className="logo">
        <svg width={RENDER_SIZE} height={RENDER_SIZE} viewBox="0 0 100 100">
          {this.calculateSectors().map(this.renderSector.bind(this))}
          <circle
            cx={RENDER_SIZE * 0.5}
            cy={RENDER_SIZE * 0.5}
            r={RENDER_SIZE * 0.28}
            fill='#ffffff'
          />
        </svg>
      </div>
    );
  }
}

Logo.propTypes = {
  data: PropTypes.object,
  colours: PropTypes.object,
  url: PropTypes.string
};
