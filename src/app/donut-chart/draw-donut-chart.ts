import * as d3 from 'd3';

export class DrawDonutChart {
  drawAlt(data) {
    const width = 600;
    const height = 400;
    const thickness = 40;

    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal()
      .range(['#ff64ff', '#9678dc', '#328cdc']);

    const svg = d3.select("#donut-chart")
      .append('svg')
      .attr('class', 'pie')
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', 'translate(' + (width/2 + 50) + ',' + (height/2) + ')');

    const arc = d3.arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius);

    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);

    g.selectAll('path')
      .data(pie(data))
      .enter()
      .append('g')
      .on('mouseover', function(d) {
        let g = d3.select(this)
          .style('cursor', 'pointer')
          .style('fill', 'steelblue')
          .append('g')
          .attr('class', 'text-group');

        g.append('text')
          .attr('class', 'name-text')
          .text(`${d.data.name}`)
          .attr('text-anchor', 'middle')
          .attr('dy', '-1.2em');

        g.append('text')
          .attr('class', 'value-text')
          .text(`${d.data.value}`)
          .attr('text-anchor', 'middle')
          .attr('dy', '.6em');
      })
      .on('mouseout', function() {
        d3.select(this)
          .style('cursor', 'none')
          .style('fill', color(this._current))
          .select('.text-group').remove();
      })
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i))
      .on('mouseover', function() {
        d3.select(this)
          .style('cursor', 'pointer')
          .style('opacity', '0.7');
      })
      .on('mouseout', function() {
        d3.select(this)
          .style('cursor', 'none')
          .style('opacity', '1')
          .style('fill', color(this._current));
      })
      .each(function(d, i) { this._current = i; });
  }
}
