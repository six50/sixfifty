import './polls_list.scss';

import React from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import dateFormat from 'dateformat';

const DATA_NAME_MAP = Object.entries({con: 'con', lab: 'lab', lib: 'ld', ukip: 'ukip', green: 'grn'});


export default class Model extends React.Component {
  renderDateRange(from, to) {
    if (from.getMonth() == to.getMonth()) {
      if (from.getDate() == to.getDate()) {
        // Just one day, render `Apr 29`
        return dateFormat(to, 'mmm d');
      } else {
        // Same month, different days, render `Apr 29-30`
        const left = dateFormat(from, 'mmm d');
        const right = to.getDate();
        return `${left}–${right}`;
      }
    } else {
      // Different months, render `Apr 29 - May 1`
      const left = dateFormat(from, 'mmm d');
      const right = dateFormat(to, 'mmm d');
      return `${left} – ${right}`;
    }
  }

  render() {
    return (
      <div className='polls-list'>
        <table>
          <thead>
            <tr>
              <th><div>Dates</div></th>
              <th><div>Pollster</div></th>
              <th><div>Sample&nbsp;Size</div></th>
              <th><div>Method</div></th>
              <th></th>
              {DATA_NAME_MAP.map(([_, nameKey], key) => (
                <th key={key}><div>{this.props.names[nameKey]}</div></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.polls.slice(0).reverse().map((poll, key) => (
              <tr key={key}>
                <td>{this.renderDateRange(poll.sampled_from, poll.sampled_to)}</td>
                <td title={`Published by ${poll.publisher}`}>{poll.pollster}</td>
                <td>{poll.sample_size.toFixed(0)}</td>
                <td>{poll.method}</td>
                <td>
                  {poll.pdf && <a className='doc-link' href={poll.pdf}></a>}
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
