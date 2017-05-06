import './polls_tracker.scss';

import Graph from './graph';


export default class PollsTracker {
  constructor(elem) {
    const colours = JSON.parse(elem.dataset.colours);
    const names = JSON.parse(elem.dataset.names);

    const graphElem = elem.querySelector('.graph');
    if (graphElem) {
      this.graph = new Graph(graphElem, colours, names);
    }

    const tableElem = elem.querySelector('.table');
    if (tableElem) {
      this.table = null;
    }
  }
}
