import React from 'react';
import { VictoryLine, VictoryAxis, VictoryChart, VictoryVoronoiContainer } from 'victory';
import SixFiftyTheme from '../../utils/victory_theme';
import _map from 'lodash.map';
import _sortBy from 'lodash.sortby';
import dateFormat from 'dateformat';


const DATA = {"average":[{"date":"2017-05-01","CON":"0.45","LAB":"0.28","LIB":"0.12","UKIP":"0.08","GREEN":"0.06","OTHER":"0.01"},{"date":"2017-05-02","CON":"0.45","LAB":"0.28","LIB":"0.12","UKIP":"0.08","GREEN":"0.06","OTHER":"0.01"},{"date":"2017-05-03","CON":"0.45","LAB":"0.28","LIB":"0.12","UKIP":"0.08","GREEN":"0.06","OTHER":"0.01"},{"date":"2017-05-04","CON":"0.45","LAB":"0.28","LIB":"0.12","UKIP":"0.08","GREEN":"0.06","OTHER":"0.01"},{"date":"2017-05-05","CON":"0.45","LAB":"0.28","LIB":"0.12","UKIP":"0.08","GREEN":"0.06","OTHER":"0.01"}],"polls":[{"date":"2017-05-01","pollster":"ComRes/Sundar Mirror","sample_dates":["2017-04-19","2017-04-20"],"sample_size":"1000","results":{"CON":"0.378","LAB":"0.312","LIB":"0.081","UKIP":"0.129","GREEN":"0.038","OTHER":"0.000"}},{"date":"2017-05-02","pollster":"ComRes/Sundar Mirror","sample_dates":["2017-04-19","2017-04-20"],"sample_size":"2074","results":{"CON":"0.378","LAB":"0.312","LIB":"0.081","UKIP":"0.129","GREEN":"0.038","OTHER":"0.000"}},{"date":"2017-05-03","pollster":"ComRes/Sundar Mirror","sample_dates":["2017-04-19","2017-04-20"],"sample_size":"3000","results":{"CON":"0.378","LAB":"0.312","LIB":"0.081","UKIP":"0.129","GREEN":"0.038","OTHER":"0.000"}},{"date":"2017-05-04","pollster":"ComRes/Sundar Mirror","sample_dates":["2017-04-19","2017-04-20"],"sample_size":"500","results":{"CON":"0.378","LAB":"0.312","LIB":"0.081","UKIP":"0.129","GREEN":"0.038","OTHER":"0.000"}},{"date":"2017-05-05","pollster":"ComRes/Sundar Mirror","sample_dates":["2017-04-19","2017-04-20"],"sample_size":"2074","results":{"CON":"0.378","LAB":"0.312","LIB":"0.081","UKIP":"0.129","GREEN":"0.038","OTHER":"0.000"}}]};
const COLOURS = {"con":"#0F80D6","lab":"#D20004","ld":"#FEAA09","grn":"#5EC500","ukip":"#5E0D78","snp":"#FFFF00","pc":"#337D1E","oth":"#999999","dup":"#D46A4C","ind":"#CCCCCC","sdlp":"#99FF66","sf":"#008800","uup":"#9999FF"};
const DATA_NAME_MAP = {CON: 'con', LAB: 'lab', LIB: 'ld', UKIP: 'ukip', GREEN: 'grn', OTHER: 'oth'}


class Scrubber extends React.Component {
  // This renders the scrubber component at a position on the graph.

  renderParty(party, key) {
    const votes = parseFloat(this.props.datum[party]) * 100.0;

    return (
      <text
        key={key}
        x={this.props.x + 5}
        y={this.props.scale.y(votes) + 3}
        style={{
          textAnchor: 'start',
          fontSize: '8px',
          strokeWidth: 1,
          stroke: 'white',
          paintOrder: 'stroke'
        }}
      >
        {`${votes.toFixed(1)}% ${party}`}
      </text>
    );
  }

  render() {
    return (
      <g>
        <rect
          x={this.props.x}
          y="50"
          width="500"
          height="200"
          style={{ fill: 'rgba(255,255,255,0.9)' }}
        />
        {Object.keys(DATA_NAME_MAP).map(this.renderParty.bind(this))}
        <path
          d={`M${this.props.x},250 L${this.props.x},50`}
          style={{ strokeWidth: 1, stroke: 'black' }}
        />
      </g>
    );
  }
}

export default class PollsVisualisation extends React.Component {
  renderParty(data, party, key) {
    return (
      <VictoryLine
        key={key}
        data={data}
        x="date"
        y={x => x[party] * 100.0}
        style={{
          data: {
            stroke: COLOURS[DATA_NAME_MAP[party]]
          }
        }}
      />
    );
  }

  render() {
    const data = _sortBy(DATA.average, x => x.date);
    const dates = _map(data, x => x.date);

    if (!data) {
      return;
    }

    const parties = Object.keys(data[0]);
    const dateIndex = parties.indexOf('date');
    parties.splice(dateIndex, 1);

    return (
      <VictoryChart
        theme={SixFiftyTheme}
        domainPadding={{x: 1, y: 10}}
        containerComponent={
          <VictoryVoronoiContainer
            dimension='x'
            labels={(d) => 'y: ' + d.y}
            labelComponent={<Scrubber data={data} />}
            voronoiPadding={10}
          />
        }
      >
        <VictoryAxis
          tickCount={dates.length}
          tickFormat={(x) => dateFormat(dates[x], 'mmmm dS')}
        />
        <VictoryAxis // Y Axis
          dependentAxis
          tickCount={4}
          tickFormat={(x) => `${x}%`}
        />
        {parties.map(this.renderParty.bind(this, data))}
      </VictoryChart>
    );
  }
}