import './polls_list.scss';

import React from 'react';
import PropTypes from 'prop-types';
import Color from 'color';

const DATA_NAME_MAP = Object.entries({con: 'con', lab: 'lab', lib: 'ld', ukip: 'ukip', green: 'grn'});


export default class Model extends React.Component {
  renderDateRange(from, to) {
    return 'May 3-5';
  }

  render() {
    return (
      <div className='polls-list'>
        <table>
          <thead>
            <tr>
              <th><div>Dates</div></th>
              <th><div>Pollster</div></th>
              <th><div>Publisher</div></th>
              <th><div>Sample&nbsp;Size</div></th>
              <th><div>Method</div></th>
              <th><div>Links</div></th>
              {DATA_NAME_MAP.map(([_, nameKey], key) => (
                <th key={key}><div>{this.props.names[nameKey]}</div></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.polls.map((poll, key) => (
              <tr key={key}>
                <td>{this.renderDateRange(poll.sampled_from, poll.sampled_to)}</td>
                <td>{poll.pollster}</td>
                <td>{poll.publisher}</td>
                <td>{poll.sample_size.toFixed(0)}</td>
                <td>{poll.method}</td>
                <td>
                  <a className='source-link' href={poll.source}></a>
                  {poll.pdf && <a className='pdf-link' href={poll.pdf}></a>}
                </td>
                {DATA_NAME_MAP.map(([partyKey, colourKey], key2) => (
                  <td
                    key={key2}
                    className='poll-value'
                    style={{backgroundColor: Color(this.props.colours[colourKey]).alpha(0.3)}}
                  >
                    {(poll[partyKey] * 100.0).toFixed(1)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Model.propTypes = {
  names: PropTypes.object,
  colours: PropTypes.object,
  polls: PropTypes.array
};
