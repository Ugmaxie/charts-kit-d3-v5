import { select } from 'd3-selection';
import { scaleOrdinal } from 'd3-scale';

export class DrawLegend {
  draw(colors, data, options): void {
    const margin = {top: 10, right: 30, bottom: 10, left: 30};
    const width = 960 - margin.left - margin.right;
    const height = 50 - margin.top - margin.bottom;

    const color = scaleOrdinal()
      .range(colors);

    const svg = select('#legend')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const legend = svg.selectAll('.legend')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(0,20)');

    legend
      .append('circle')
      .attr('cx', (d, i) => width - i * options.xCircleOffset)
      .attr('cy', options.yCircleOffset)
      .attr('r', options.radius)
      .style('fill', (d, i) => color(i));

    legend.append('text')
      .attr('x', (d, i) => width - i * options.xTextOffset + options.textLeftMargin)
      .attr('y', options.yTextOffset)
      .attr('font-size', options.fontSize)
      .attr('fill', options.fontColor)
      .text(d => d);
  }
}
