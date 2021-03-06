import { select, Selection } from 'd3-selection';
import { transition, Transition } from 'd3-transition';
import { scaleOrdinal } from 'd3-scale';
import { max } from 'd3-array';
import { format } from 'd3-format';
import 'd3-transition';

export class DrawRadarChart {
  drawAlt(id, d, options) {
    const cfg = {
      radius: 5,
      w: 600,
      h: 600,
      factor: 1,
      factorLegend: .85,
      levels: 3,
      maxValue: 0,
      radians: 2 * Math.PI,
      opacityArea: 0.5,
      ToRight: 5,
      TranslateX: 80,
      TranslateY: 30,
      ExtraWidthX: 100,
      ExtraWidthY: 100,
      color: scaleOrdinal()
        .range(['#ff64ff', '#9678dc', '#328cdc'])
    };

    if('undefined' !== typeof options){
      for(let i in options){
        if('undefined' !== typeof options[i]){
          cfg[i] = options[i];
        }
      }
    }

    cfg.maxValue = Math.max(cfg.maxValue, max(d, i => max(i.map(o => o.value))));
    const allAxis = (d[0].map(i => i.axis));
    const total = allAxis.length;
    const radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
    const Format = format('.0%');
    select(id).select('svg').remove();

    const g = select(id)
      .append('svg')
      .attr('width', cfg.w + cfg.ExtraWidthX)
      .attr('height', cfg.h + cfg.ExtraWidthY)
      .append('g')
      .attr('transform', 'translate(' + cfg.TranslateX + ',' + cfg.TranslateY + ')');

    let tooltip;

    //Circular segments
    for(let j = 0; j<cfg.levels - 1; j++){
      const levelFactor = cfg.factor*radius*((j + 1) / cfg.levels);
      g.selectAll('.levels')
        .data(allAxis)
        .enter()
        .append('svg:line')
        .attr('x1', (d, i) => levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total)))
        .attr('y1', (d, i) => levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total)))
        .attr('x2', (d, i) => levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total)))
        .attr('y2', (d, i) => levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total)))
        .attr('class', 'line')
        .style('stroke', 'grey')
        .style('stroke-opacity', '0.75')
        .style('stroke-width', '0.3px')
        .attr('transform', 'translate(' + (cfg.w / 2-levelFactor) + ', ' + (cfg.h / 2-levelFactor) + ')');
    }

    //Text indicating at what % each level is
    for(let j = 0; j < cfg.levels; j++){
      const levelFactor = cfg.factor * radius*((j + 1) / cfg.levels);
      g.selectAll('.levels')
        .data([1]) //dummy data
        .enter()
        .append('svg:text')
        .attr('x', () => levelFactor * (1 - cfg.factor * Math.sin(0)))
        .attr('y', () => levelFactor * (1 - cfg.factor * Math.cos(0)))
        .attr('class', 'legend')
        .style('font-family', 'sans-serif')
        .style('font-size', '10px')
        .attr('transform', 'translate(' + (cfg.w / 2 - levelFactor + cfg.ToRight) + ', ' + (cfg.h / 2 - levelFactor) + ')')
        .attr('fill', '#737373')
        .text(Format((j + 1) * cfg.maxValue / cfg.levels));
    }

    let series = 0;

    const axis = g.selectAll('.axis')
      .data(allAxis)
      .enter()
      .append('g')
      .attr('class', 'axis');

    axis.append('line')
      .attr('x1', cfg.w / 2)
      .attr('y1', cfg.h / 2)
      .attr('x2', (d, i) => cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total)))
      .attr('y2', (d, i) => cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total)))
      .attr('class', 'line')
      .style('stroke', 'grey')
      .style('stroke-width', '1px');

    axis.append('text')
      .attr('class', 'legend')
      .text(d => d)
      .style('font-family', 'sans-serif')
      .style('font-size', '11px')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.5em')
      .attr('transform', 'translate(0, -10)')
      .attr('x', (d, i) => cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total))
      .attr('y', (d, i) => cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total));

    d.forEach((y, x) => {
      let dataValues = [];
      g.selectAll('.nodes')
        .data(y, (j, i) =>
          dataValues.push([
            cfg.w/2*(1-(parseFloat(Math.max(j.value, 0).toString())/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
            cfg.h/2*(1-(parseFloat(Math.max(j.value, 0).toString())/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
          ]));
      dataValues.push(dataValues[0]);
      g.selectAll('.area')
        .data([dataValues])
        .enter()
        .append('polygon')
        .attr('class', 'radar-chart-serie' + series)
        .style('stroke-width', '2px')
        .style('stroke', cfg.color(series))
        .attr('points', d => {
          let str='';
          for(let pti=0;pti<d.length;pti++){
            str=str+d[pti][0]+','+d[pti][1]+' ';
          }
          return str;
        })
        .style('fill', cfg.color(series))
        .style('fill-opacity', cfg.opacityArea)
        .on('mouseover', function () {
          const z = 'polygon.' + select(this).attr('class');
          g.selectAll('polygon')
            .transition(200)
            .style('fill-opacity', 0.1);
          g.selectAll(z)
            .transition(200)
            .style('fill-opacity', .7);
        })
        .on('mouseout', function () {
          g.selectAll('polygon')
            .transition(200)
            .style('fill-opacity', cfg.opacityArea);
        });
      series++;
    });
    series=0;

    d.forEach((y, x) => {
      const dataValues = [];

      g.selectAll('.nodes')
        .data(y).enter()
        .append('svg:circle')
        .attr('class', 'radar-chart-serie' + series)
        .attr('r', cfg.radius)
        .attr('alt', j => Math.max(j.value, 0))
        .attr('cx', (j, i) => {
          dataValues.push([
            cfg.w/2*(1-(parseFloat(Math.max(j.value, 0).toString())/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
            cfg.h/2*(1-(parseFloat(Math.max(j.value, 0).toString())/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
          ]);

          return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
        })
        .attr('cy', (j, i) => cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total)))
        .attr('data-id', j => j.axis)
        .style('fill', cfg.color(series)).style('fill-opacity', .9)
        .on('mouseover', function (d) {
          const newX =  parseFloat(select(this).attr('cx')) - 10;
          const newY =  parseFloat(select(this).attr('cy')) - 5;

          tooltip
            .attr('x', newX)
            .attr('y', newY)
            .text(Format(d.value))
            .transition(200)
            .style('opacity', 1);

          const z = 'polygon.' + select(this).attr('class');
          g.selectAll('polygon')
            .transition(200)
            .style('fill-opacity', 0.1);
          g.selectAll(z)
            .transition(200)
            .style('fill-opacity', .7);
        })
        .on('mouseout', function () {
          tooltip
            .transition(200)
            .style('opacity', 0);
          g.selectAll("polygon")
            .transition(200)
            .style("fill-opacity", cfg.opacityArea);
        })
        .append("svg:title")
        .text(j => Math.max(j.value, 0));

      series++;
    });

    //Tooltip
    tooltip = g.append('text')
      .style('opacity', 0)
      .style('font-family', 'sans-serif')
      .style('font-size', '13px');
  }
}
