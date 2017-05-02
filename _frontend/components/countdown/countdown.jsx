import React from 'react';
import PropTypes from 'prop-types';

const SECS_MINUTE = 60;
const SECS_HOUR = 60 * SECS_MINUTE;
const SECS_DAY = 24 * SECS_HOUR;

const TIMER_FAST = 1000 * SECS_MINUTE;
const TIMER_SLOW = 1000 * SECS_HOUR;


export default class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      endDate: new Date(props.endDate),
      verboseAfter: new Date(props.verboseAfter),
    }

    this.state.formattedTime = this.tickState().formattedTime;
  }

  componentDidMount() {
    const {verbose} = this.tickState();
    const interval = (verbose ? TIMER_FAST : TIMER_SLOW);

    this.timer = setInterval(() => {
      this.setState(this.tickState());
    }, interval);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tickState() {
    const now = new Date();
    const timeRemaining = this.state.endDate - now;

    let verbose = false;

    if (now > this.state.verboseAfter) {
      verbose = true;
    }

    return {
      verbose: verbose,
      formattedTime: this.getFormattedTime(timeRemaining, verbose)
    };
  }

  pluralise(str, num) {
    if (num === 1) {
      return str;
    }
    return `${str}s`;
  }

  getFormattedTime(milliseconds, verbose) {
    const totalSeconds = Math.round(milliseconds / 1000);
    let text = '';

    let days = Math.floor(totalSeconds / SECS_DAY);
    let hours = Math.floor(totalSeconds % SECS_DAY / SECS_HOUR);
    let minutes = Math.floor(totalSeconds % SECS_DAY % SECS_HOUR / SECS_MINUTE);

    if (days < 0) {
      days = 0;
    }
    if (hours < 0) {
      hours = 0;
    }
    if (minutes < 0) {
      minutes = 0;
    }

    if (days > 3) {
      // If more than 3 days:
      //    5 days 12 hours (or 5 days for non-verbose)
      text = `${days} days`;
      if (verbose) {
        text += ` ${this.pluralise(hours + " hour", hours)}`;
      }
    } else {
      hours = hours + (days * 24);

      if (hours > 24) {
        // If less than 3 days, but more than 1 day:
        //    58 hours (or 2 days for non-verbose)
        if (verbose) {
          text = this.pluralise(`${hours} hour`, hours);
        } else {
          text = this.pluralise(`${days} day`, days);
        }
      } else {
        // If less than 1 day:
        //    12 hours 38 minutes
        const hoursStr = this.pluralise(`${hours} hour`, hours);
        const minsStr = this.pluralise(`${minutes} minute`, minutes);
        text = `${hoursStr} ${minsStr}`;
      }
    }

    return text;
  }

  render() {
    return (
      <time dateTime={this.state.endDate}>
        <a href={this.props.url} target='_blank'>
          {this.state.formattedTime}&nbsp;{this.props.message}
        </a>
      </time>
    );
  }
}

Countdown.propTypes = {
  endDate: PropTypes.string,
  verboseAfter: PropTypes.string,
  message: PropTypes.string,
  url: PropTypes.string
};
