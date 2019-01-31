import * as d3 from 'd3';

export class DrawBarChart {
  drawAlt(data) {
    const chartWidth = 600;
    const barHeight = 20;
    const barSpace = 5;
    const groupHeight = barHeight * data.series.length;
    const gapBetweenGroups = 30;
    const spaceForLabels = 150;
    const labelsOffset = -50;

// Zip the series data together (first values, second values, etc.)
    const zippedData = [];
    for (let i = 0; i < data.labels.length; i++) {
      for (let j = 0; j < data.series.length; j++) {
        zippedData.push(data.series[j].values[i]);
      }
    }

// Color scale
    const color = d3.scaleOrdinal()
      .range(['#ff64ff', '#9678dc', '#328cdc']);
    const chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

    const x = d3.scaleLinear()
      .domain([0, 100])
      .range([0, chartWidth]);

    const y = d3.scaleLinear()
      .range([chartHeight + gapBetweenGroups, 0]);

    const yAxis = d3.axisLeft()
      .scale(y)
      .tickFormat('')
      .tickSize(0);

    const xAxis = d3.axisBottom(x)
      .tickSizeInner(-chartHeight)
      .tickSizeOuter(0)
      .tickPadding(10)
      .tickFormat(d => parseInt(d, 0) + '%')
      .ticks(10);

// Specify the chart area and dimensions
    const chart = d3.select('#hbar-chart')
      .attr('width', spaceForLabels + chartWidth + 50)
      .attr('height', chartHeight + 30);

// Create bars
    const bar = chart.selectAll('g')
      .data(zippedData)
      .enter().append('g')
      .attr('transform', (d, i) => 'translate(' + spaceForLabels + ',' + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i / data.series.length))) + ')');

// Create rectangles of the correct width
    bar.append('rect')
      .attr('fill', (d, i) => color(i % data.series.length))
      .attr('class', 'bar')
      .attr('width', x)
      .attr('height', barHeight - barSpace);

    /* // Add text label in bar
    bar.append("text")
        .attr("x", function(d) { return x(d) - 3; })
        .attr("y", barHeight / 2)
        .attr("fill", "red")
        .attr("dy", ".35em")
        .text(function(d) { return d; }); */

// Draw labels
    bar.append('text')
      .attr('class', 'label')
      .attr('x', labelsOffset)
      .attr('y', groupHeight / 2)
      .attr('dy', '.35em')
      .style('fill', '#ccc')
      .text((d, i) => i % data.series.length === 0 ? data.labels[Math.floor(i / data.series.length)] : '');

    function yAxisTransform(g) {
      g.call(yAxis);
      g.select('.domain').attr('stroke', '#ccc');
      g.selectAll('.tick text').attr('fill', '#98abc5');
    }

    function xAxisTransform(g) {
      g.call(xAxis);
      g.select('.domain').attr('stroke', '#ccc');
      g.selectAll('.tick line').attr('stroke', '#ccc');
      g.selectAll('.tick:not(:first-of-type) line').attr('stroke', '#ccc').attr('stroke-dasharray', '2,2');
      g.selectAll('.tick text').attr('fill', '#98abc5');
    }

    chart.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + spaceForLabels + ', ' + -gapBetweenGroups + ')')
      .call(yAxisTransform);

    chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(' + spaceForLabels + ',' + chartHeight + ')')
      .call(xAxisTransform);
  }
}
