import './polls_tracker.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3'
import map from 'lodash.map';
import sortBy from 'lodash.sortby';

import Graph from './graph';
import PollsList from '../../components/polls_list/polls_list';

import { PARTIES } from '../../utils/election';

const _dateParse = d3.timeParse('%d %b %Y');

function dateParse(x) {
  if (!x) {
    return null;
  }

  if (typeof(x) === 'number') {
    return new Date(x);
  }

  return _dateParse(x.replace(/\-/g, ' '));
}

export default class PollsTracker {
  constructor(elem) {
    this.colours = JSON.parse(elem.dataset.colours);
    this.names = JSON.parse(elem.dataset.names);
    this.elem = elem;

    window.dataHub.get(elem.dataset.url, {}, (response) => {
      response.json().then((data) => {
        this.polls = [[], []];

        this.polls[0] = sortBy(map(data[0], x => ({
          ...x,
          from: dateParse(x.from),
          to: dateParse(x.to)
        })), x => x.to);

        this.polls[1] = sortBy(map(data[1], x => ({
          ...x,
          date: dateParse(x.date),
        })), x => x.date);

        this.render();
      });
    });
  }

  render() {
    const graphElem = this.elem.querySelector('.graph');
    if (graphElem) {
      this.graph = new Graph(graphElem, this.colours, this.names, PARTIES, this.polls);
    }

    const tableElem = this.elem.querySelector('.table');
    if (tableElem) {
      this.table = ReactDOM.render(
        <PollsList
          names={this.names}
          colours={this.colours}
          parties={PARTIES}
          polls={this.polls[0]}
        />,
        tableElem
      );
    }
  }

  handleError(error) {
    // Clear the element
    while (this.elem.firstChild) {
      this.elem.removeChild(this.elem.firstChild);
    }

    // Add an error element
    const errElem = document.createElement('div');
    errElem.innerText = "There was an error loading the data. Retry later or in a different browser.";
    errElem.className = 'error';
    this.elem.appendChild(errElem);
    throw error;
  }
}
