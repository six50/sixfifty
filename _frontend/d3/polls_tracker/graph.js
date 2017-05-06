import dateFormat from 'dateformat';
import * as d3 from 'd3'

const ELECTION_DAY = new Date('2017-06-08');

const WIDTH = 600;
const HEIGHT = 300;

function formatPercent(n, d) {
  return `${(d * 100.0).toFixed(n)}%`;
}

const formatDate = d3.timeFormat('%b %-e');

function translate(x, y) {
  return `translate(${x}, ${y})`;
}

export default class Graph {
  constructor(elem, colours, names, parties, data) {
    this.elem = elem;
    this.colours = colours;
    this.names = names;
    this.parties = parties;

    this.polls = data[0];
    this.dataSmoothed = data[1];

    this.render();
  }

  render() {
    // Set up SVG
    this.svg = d3.select(this.elem).append('svg');

    this.svg
      .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)
      .attr('width', '100%')
      .attr('height', '100%');

    this.margin = {top: 20, right: 80, bottom: 30, left: 30};
    this.width = WIDTH - this.margin.left - this.margin.right;
    this.height = HEIGHT - this.margin.top - this.margin.bottom;
    this.g = this.svg
      .append('g')
      .attr('transform', translate(this.margin.left, this.margin.top));

    // Render
    this.x = d3.scaleTime()
      .rangeRound([0, this.width]);

    this.y = d3.scaleLinear()
      .rangeRound([this.height, 0]);

    const {linesAndColours, xDomain, yDomain} = this.parties.reduce(
      this.makeLines.bind(this),
      {
        linesAndColours: [],
        xDomain: [],
        yDomain: [],
      }
    );

    this.y.domain(yDomain).nice();
    this.x.domain(d3.extent([...xDomain, ELECTION_DAY]));

    this.makeAxes();

    linesAndColours.map(([line, colour]) => {
      this.g.append('path')
        .datum(this.dataSmoothed)
        .attr('fill', 'none')
        .attr('stroke', colour)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', line);
    });

    this.makeElectionDayMarker();
    this.makeDots();
    this.makeScrubber();
  }

  makeAxes() {
    const xAxis = d3.axisBottom(this.x);

    this.xAxis = this.g.append('g')
      .attr('transform', translate(0, this.height))
      .call(xAxis);

    this.xAxis.select('.domain').remove();
    this.xAxis.selectAll('.tick line')
      .attr('stroke', 'darkgray')
      .attr('stroke-width', 0.5);

    const yAxis = d3.axisLeft(this.y)
      .tickFormat(d => formatPercent(0, d))
      .ticks(5);

    this.yAxis = this.g.append('g').call(yAxis);
    this.yAxis.select('.domain').remove();
    this.yAxis.select('.tick').remove();
    this.yAxis.selectAll('.tick line')
      .attr('stroke', 'darkgray')
      .attr('stroke-width', 0.5);
  }

  makeLines({linesAndColours, xDomain, yDomain}, partyKey) {
    // Handle parties with no smoothed data
    if (!this.dataSmoothed[0][partyKey]) {
      return {linesAndColours, xDomain, yDomain};
    }

    const line = d3.line()
      .x(d => this.x(d.date))
      .y(d => this.y(d[partyKey]));

    return {
      linesAndColours: [...linesAndColours, [line, this.colours[partyKey]]],
      xDomain: d3.extent([...xDomain, ...d3.extent(this.dataSmoothed, d => d.date)]),
      yDomain: d3.extent([...yDomain, ...d3.extent(this.dataSmoothed, d => d[partyKey])]),
    };
  }

  makeScrubber() {
    this.bisectDate = d3.bisector(d => d.date).left;

    this.focus = this.g.append('g')
      .attr('class', 'focus');

    this.scrubber = this.focus.append('g');

    this.scrubber.append('rect')
      .style('fill', 'rgba(255,255,255,0.9)')
      .attr('width', this.width)
      .attr('height', this.height);

    this.scrubber.append('line')
      .attr('y2', this.height)
      .attr('stroke', 'darkgray')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '2, 3');

    this.scrubberDate = this.scrubber.append('text')
      .attr('font-size', '0.6rem')
      .attr('y', this.height)
      .attr('dy', '1rem')
      .attr('text-anchor', 'middle');

    for (const partyKey of this.parties) {
      const partyGroup = this.focus.append('g');
      partyGroup.attr('class', partyKey);

      partyGroup.append('circle')
        .attr('r', 3)
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
        .attr('fill', this.colours[partyKey]);

      partyGroup.append('text')
          .attr('x', 9)
          .attr('dy', '.35em')
          .attr('font-size', '0.7rem')
          .attr('text-shadow', '0 0 1px white');
    }

    const self = this;

    this.g.append('rect')
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .attr('width', this.width)
      .attr('height', this.height)
      .on('mouseout', () => this.resetScrubberToEnd())
      .on('mousemove', function() {
        const xLoc = self.x.invert(d3.mouse(this)[0]);
        self.moveScrubberToLocation(xLoc);
      });

    this.resetScrubberToEnd();
  }

  resetScrubberToEnd() {
    this.moveScrubberToLocation(this.dataSmoothed[this.dataSmoothed.length - 1].date);
    this.xAxis.attr('display', null);
    this.scrubberDate.attr('display', 'none');
  }

  moveScrubberToLocation(_xLoc) {
    this.xAxis.attr('display', 'none');

    const i = this.bisectDate(this.dataSmoothed, _xLoc, 1);
    const d0 = this.dataSmoothed[i - 1];
    const d1 = this.dataSmoothed[i];

    let d = null;
    if (d1) {
      d = _xLoc - d0.date > d1.date - _xLoc ? d1 : d0;
    } else {
      d = d0;
    }

    const xLoc = this.x(d.date);

    for (const partyKey of this.parties) {
      if (!d[partyKey]) continue;

      this.focus.select(`g.${partyKey}`)
        .attr('transform', translate(xLoc, this.y(d[partyKey])))
        .select('text')
          .text(`${formatPercent(1, d[partyKey])} ${this.names[partyKey]}`);
    }

    this.scrubber.attr('transform', translate(xLoc, 0));
    this.scrubberDate
      .attr('display', null)
      .text(formatDate(d.date));
  }

  makeElectionDayMarker() {
    const xLoc = this.x(ELECTION_DAY);

    this.g.append('line')
      .attr('y2', this.height)
      .attr('x1', xLoc)
      .attr('x2', xLoc)
      .attr('stroke', 'black')
      .attr('stroke-width', 1);

    this.g.append('text')
      .attr('x', xLoc)
      .attr('dx', '0.1rem')
      .attr('dy', '-0.2rem')
      .attr('font-size', '0.6rem')
      .attr('text-anchor', 'middle')
      .text('ELECTION');
  }

  makeDots() {
    const group = this.g.selectAll(".dot").data(this.polls);

    for (const partyKey of this.parties) {
      group.enter().append('circle')
        .attr('class', 'dot')
        .attr('r', 2)
        .attr('opacity', 0.2)
        .attr('cx', d => this.x(d.to))
        .attr('cy', d => this.y(d[partyKey]))
        .style('fill', this.colours[partyKey]);
    }
  }
}
