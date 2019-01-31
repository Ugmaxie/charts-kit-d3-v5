import { select, Selection } from 'd3-selection';
import { transition, Transition } from 'd3-transition';
import { scaleOrdinal, scaleLinear } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { max } from 'd3-array';
import { line } from 'd3-shape';

export class DrawLineChart {
  drawAlt(dataset) {
    const width = 900;
    const height = 300;
    const margin = 50;
    const duration = 250;
    const lineOpacity = '1';
    const circleOpacity = '1';
    const circleRadius = 5;
    const circleRadiusHover = 6;

    const data = [...dataset.series];
    const labels = [...dataset.labels];

    data.forEach(d => {
      d.values.forEach(d => {
        d.price = +d.price;
      });
    });

    /* Scale */
    const xScale = scaleLinear()
      .domain([0, data[0].values.length - 1])
      .range([0, width-margin]);

    const yScale = scaleLinear()
      .domain([0, max(data[0].values, d => d.price)])
      .range([height-margin, 0]);

    const color = scaleOrdinal()
      .range(['#ff64ff', '#9678dc', '#328cdc']);

    /* Add SVG */
    const svg = select('#line-chart').append('svg')
      .attr('width', (width+margin)+'px')
      .attr('height', (height+margin)+'px')
      .append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    /* Add Axis into SVG */
    const xAxis = axisBottom(xScale)
      .tickSizeInner(-height + margin)
      .tickSizeOuter(0)
      .tickPadding(15)
      .tickFormat(d => labels[d])
      .ticks(labels.length);

    const yAxis = axisLeft(yScale)
      .tickPadding(10)
      .tickSizeInner(-width + margin)
      .tickSizeOuter(0)
      .ticks(5);

    function yAxisTransform(g) {
      g.call(yAxis);
      g.selectAll(".tick:not(:first-of-type) line")
        .attr("stroke", "#ccc")
        .attr("stroke-dasharray", "2,2");
      g.selectAll(".tick line").attr("stroke", "#ccc");
      g.selectAll(".tick text").attr('fill', '#98abc5');
      g.select(".domain").attr('stroke', '#ccc');
    }

    function xAxisTransform(g) {
      g.call(xAxis);
      g.selectAll(".tick:not(:first-of-type) line")
        .attr("stroke", "#ccc")
        .attr("stroke-dasharray", "2,2");
      g.selectAll(".tick text").attr('fill', '#98abc5');
      g.select(".domain").attr('stroke', '#ccc');
    }

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height-margin})`)
      .call(xAxisTransform);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxisTransform);

    /* Add line into SVG */
    const drawLine = line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d.price));

    const lines = svg.append('g')
      .attr('class', 'lines');

    lines.selectAll('.line-group')
      .data(data).enter()
      .append('g')
      .attr('class', 'line-group')
      .on('mouseover', (d, i) => {
        svg.append('text')
          .attr('class', 'title-text')
          .style('fill', color(i))
          .text(d.name)
          .attr('text-anchor', 'middle')
          .attr('x', (width-margin)/2)
          .attr('y', 5);
      })
      .on('mouseout', () => {
        svg.select('.title-text').remove();
      })
      .append('path')
      .attr('class', 'line')
      .attr('d', d => drawLine(d.values))
      .style('stroke-width', '2px')
      .style('stroke', (d, i) => color(i))
      .style('fill', 'none')
      .style('opacity', lineOpacity);

    /* Add circles in the line */
    lines.selectAll('circle-group')
      .data(data).enter()
      .append('g')
      .style('fill', (d, i) => color(i))
      .selectAll('circle')
      .data(d => d.values).enter()
      .append('g')
      .attr('class', 'circle')
      .on('mouseover', function(d, index) {
        select(this)
          .style('cursor', 'pointer')
          .append('text')
          .attr('class', 'text')
          .text(`${d.price}`)
          .attr('x', xScale(index) - 10)
          .attr('y', d => yScale(d.price) - 10);
      })
      .on('mouseout', function() {
        select(this)
          .style('cursor', 'none')
          .transition()
          .duration(duration)
          .selectAll('.text').remove();
      })
      .append('circle')
      .attr('cx', (d, i) => xScale(i))
      .attr('cy', d => yScale(d.price))
      .attr('r', circleRadius)
      .style('stroke-width', 2)
      .style('stroke', '#fff')
      .style('opacity', circleOpacity)
      .on('mouseover', function()  {
        select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadiusHover);
      })
      .on('mouseout', function() {
        select(this)
          .transition()
          .duration(duration)
          .attr('r', circleRadius);
      });
  }
}
