import { select } from 'd3-selection';
import { scaleOrdinal, scaleLinear, scaleBand } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { range } from 'd3-array';

export class DrawBarChart {
  drawAlt(data: number[][], skillGrade: string[], skillNames: string[]): void {
    const maxSamplesCounter = Math.max.apply(Math, data.map(el => el.length));

    const margin = {top: 20, right: 30, bottom: 30, left: 60};
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const y = scaleLinear()
      .domain([0, skillGrade.length - 1])
      .rangeRound([0, height]);

    const yAx = scaleLinear()
      .domain([0, skillGrade.length - 1])
      .rangeRound([height, 0]);

    const x0 = scaleBand()
      .domain(range(maxSamplesCounter))
      .rangeRound([0, width]).padding(0.4);

    const x1 = scaleBand()
      .domain(range(data.length))
      .rangeRound([0, x0.bandwidth()]).padding(0.4);

    const color = scaleOrdinal()
      .range(['#ff64ff', '#9678dc', '#328cdc']);

    const svg = select("#bar-chart")
      .append("svg")
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Axises
    const xAxis = axisBottom(x0)
      .tickSizeInner(0)
      .tickSizeOuter(0)
      .tickPadding(15)
      .tickFormat((d, i) => skillNames[i]);

    const yAxisLeft = axisLeft(yAx)
      .ticks(skillGrade.length)
      .tickPadding(8)
      .tickSizeInner(-width)
      .tickSizeOuter(0)
      .tickFormat((d, i) => skillGrade[i]);

    function yAxisTransform(g) {
      g.call(yAxisLeft);
      g.select(".domain").attr('stroke', '#ccc');
      g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#ccc").attr("stroke-dasharray", "2,2");
      g.selectAll(".tick text").attr('fill', '#98abc5');
    }

    function xAxisTransform(g) {
      g.call(xAxis);
      g.select(".domain").attr('stroke', '#ccc');
      g.selectAll(".tick text").attr('fill', '#98abc5');
    }

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxisTransform)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -6)
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .style('fill', '#98abc5')
      .text('confidence');

    svg.append('g')
      .attr('class', 'x axis')
      .attr("class", "axisRed")
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxisTransform);

    svg.append('g')
      .selectAll('g')
      .data(data)
      .enter().append('g')
      .style('fill', (d, i) => color(i))
      .attr('transform', (d, i) => 'translate(' + x1(i) + ',0)')

      .selectAll('rect')
      .data(d => d)
      .enter()
      .append('rect')
      .attr('width', x1.bandwidth())
      .attr('height', y)
      .attr('x', (d, i) => x0(i))
      .attr('y', d => height - y(d));

    const barCircles = svg.selectAll('circle');

    for (let r = 0; r < data.length; r++) {
      barCircles
        .data(data[r])
        .enter()
        .append('circle')
        .attr('cx', (d, i) => x0(i) + (r + 1) * 10 + r * data.length)
        .attr("cy", d => height - y(d))
        .attr('r', 10)
        .style('fill', color(r))
        .style('stroke', '#fff')
        .style('stroke-width', '3px');
    }
  }
}
