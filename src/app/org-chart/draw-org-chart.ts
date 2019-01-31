import { select } from 'd3-selection';
import { stratify, hierarchy, tree } from 'd3-hierarchy';

export class DrawOrgChart {
  drawAlt(flatDataList) {
    const head = document.getElementById('head');
    const list = document.getElementById('list');

    (<any>window).actions = {
      drawList: (items, headName) => {
        head.innerHTML = '';
        list.innerHTML = '';
        const newHeadDiv = document.createElement('span');
        const newHeadContent = document.createTextNode(`${headName} gets reports from: `);
        newHeadDiv.appendChild(newHeadContent);
        list.appendChild(newHeadDiv);
        items.map((item, index) => {
          const newDiv = document.createElement('span');
          const newContentEnd = index === items.length - 1 ? '.' : ', ';
          const newContent = document.createTextNode(`${item.data.id}${newContentEnd}`);
          newDiv.appendChild(newContent);
          list.appendChild(newDiv);
        })
      }
    };

    const flatData = [];
    flatDataList.map(data => {
      if (data.visible) flatData.push(data);
    });

    const handleNodeClick = d => {
      if (d.children && d.children.length > 0) {
        (<any>window).actions.drawList(d.children, d.data.data.name);
      } else {
        (<any>window).actions.drawList([{data: {id: 'nobody'}}], d.data.data.name);
      }
    };

    this.drawVerticalTree(flatData, handleNodeClick);
  }

  drawVerticalTree(flatData, handleNodeClick) {
    // ************** Generate the tree diagram	 *****************

    // convert the flat data into a hierarchy
    const treeData = stratify()
      .id(d => d.name)
      .parentId(d => d.parent)
      (flatData);

    // assign the name to each node
    treeData.each(d => {
      d.name = d.id;
    });

    // set the dimensions and margins of the diagram
    const margin = {top: 40, right: 40, bottom: 60, left: 40};
    const width = 960 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // declares a tree layout and assigns the size
    const treemap = tree()
    // const treemap = d3.cluster()
      .size([width, height]);

    //  assigns the data to a hierarchy using parent-child relationships
    let nodes = hierarchy(treeData);

    // maps the node data to the tree layout
    nodes = treemap(nodes);

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const orgChart = document.getElementById('org-chart');
    const svg = select(orgChart).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom),
      g = svg.append('g')
        .attr('transform',
          'translate(' + margin.left + ',' + margin.top + ')');

    // adds the links between the nodes
    g.selectAll('.link')
      .data(nodes.descendants().slice(1))
      .enter().append('path')
      .attr('class', 'link')
      .style('fill', 'none')
      .style('stroke', 'ccc')
      .style('stroke-width', '1px')
      .attr('d', d => 'M' + d.x + ',' + d.y
        + 'C' + d.x + ',' + (d.y + d.parent.y) / 2
        + ' ' + d.parent.x + ',' + (d.y + d.parent.y) / 2
        + ' ' + d.parent.x + ',' + d.parent.y);

    // adds each node as a group
    const node = g.selectAll('.node')
      .data(nodes.descendants())
      .enter().append('g')
      .attr('class', d => 'node' + (d.children ? ' node--internal' : ' node--leaf'))
      .attr('transform', d => 'translate(' + d.x + ',' + (d.y + 20) + ')')
      .on('click', handleNodeClick);

    // adds the circle to the node
    node.append('circle')
      .style('fill', 'fff')
      .style('stroke', 'steelblue')
      .style('stroke-width', '1px')
      .attr('r', 30);

    // adds the text to the node
    node.append('text')
      .attr('dy', '.35em')
      .attr('y', 0)
      .style('text-anchor', 'middle')
      .style('cursor', 'pointer')
      .text(d => d.data.name);
  }
}
