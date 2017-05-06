import dateFormat from 'dateformat';
import * as d3 from 'd3'

const DATA_NAME_MAP = Object.entries({con: 'con', lab: 'lab', lib: 'ld', ukip: 'ukip', green: 'grn'});
const ELECTION_DAY = new Date(2017, 6, 8);

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
  constructor(elem, colours, names, data) {
    this.elem = elem;
    this.colours = colours;
    this.names = names;
    this.data = data;

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

    const {linesAndColours, xDomain, yDomain} = DATA_NAME_MAP.reduce(
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
        .datum(this.data)
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

  makeLines({linesAndColours, xDomain, yDomain}, [partyKey, colourKey]) {
    const dataKey = `${partyKey}_smooth`;

    const line = d3.line()
      .x(d => this.x(d.sampled_to))
      .y(d => this.y(d[dataKey]));

    return {
      linesAndColours: [...linesAndColours, [line, this.colours[colourKey]]],
      xDomain: d3.extent([...xDomain, ...d3.extent(this.data, d => d.sampled_to)]),
      yDomain: d3.extent([...yDomain, ...d3.extent(this.data, d => d[dataKey])]),
    };
  }

  makeScrubber() {
    this.bisectDate = d3.bisector(d => d.sampled_to).left;

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

    for (const [partyKey, colourKey] of DATA_NAME_MAP) {
      const partyGroup = this.focus.append('g');
      partyGroup.attr('class', partyKey);

      partyGroup.append('circle')
        .attr('r', 3)
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
        .attr('fill', this.colours[colourKey]);

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
    this.moveScrubberToLocation(this.data[this.data.length - 1].sampled_to);
    this.xAxis.attr('display', null);
    this.scrubberDate.attr('display', 'none');
  }

  moveScrubberToLocation(_xLoc) {
    this.xAxis.attr('display', 'none');

    const i = this.bisectDate(this.data, _xLoc, 1);
    const d0 = this.data[i - 1];
    const d1 = this.data[i];

    let d = null;
    if (d1) {
      d = _xLoc - d0.sampled_to > d1.sampled_to - _xLoc ? d1 : d0;
    } else {
      d = d0;
    }

    const xLoc = this.x(d.sampled_to);

    for (const [partyKey, nameKey] of DATA_NAME_MAP) {
      const dataKey = `${partyKey}_smooth`;

      this.focus.select(`g.${partyKey}`)
        .attr('transform', translate(xLoc, this.y(d[dataKey])))
        .select('text')
          .text(`${formatPercent(1, d[dataKey])} ${this.names[nameKey]}`);
    }

    this.scrubber.attr('transform', translate(xLoc, 0));
    this.scrubberDate
      .attr('display', null)
      .text(formatDate(d.sampled_to));
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
    const group = this.g.selectAll(".dot").data(this.data);

    for (const [partyKey, colourKey] of DATA_NAME_MAP) {
      group.enter().append('circle')
        .attr('class', 'dot')
        .attr('r', 2)
        .attr('opacity', 0.2)
        .attr('cx', d => this.x(d.sampled_to))
        .attr('cy', d => this.y(d[partyKey]))
        .style('fill', this.colours[colourKey]);
    }
  }
}
