/** todo...
 *  add more comments
 *  replace data with open source data (world economics?)
 */


import * as d3 from 'd3';
import {data, height, width} from './config';

const {nodes,links} = data;
const {drag} = require('./src/drag');
const {simulation} = require('./src/simulation');


import './data-convert';

const svg = d3.select("#Target");

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

const color = (d)=>{
    return colorScale(+d.zone);
};

const linkWidthScale = d3.scaleLinear()
    .domain([0,d3.max(links.map(link => link.weight))])
    .range([0.1, 3]);

const ellipseInfluenceScale = d3.scaleLinear()
    .domain([0,d3.max(nodes.map(node => node.influence))])
    .range([1, 25]);

const link = svg
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", d => linkWidthScale(d.weight));

const node = svg
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", d => ellipseInfluenceScale(d.influence))
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .attr("fill", color)
    .call(drag(simulation));


const text = svg
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("font-size", d => 3 + ellipseInfluenceScale(d.influence))
    .text(d => d.character || d.country)
    .call(drag(simulation));

simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    text
        .attr("x", d => d.x)
        .attr("y", d => d.y);
});

