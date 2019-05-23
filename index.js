/** todo...
 *  add more comments
 *  replace data with open source data (world economics?)
 */

const d3 = require('d3');

const {links,nodes} = require('./data/got');
const {drag} = require('./src/drag');
const {simulation} = require('./src/simulation');
import {width,height} from './config';
// const {width,height} = require('./config');



const svg = d3.select("#Target");

const scale = d3.scaleOrdinal(d3.schemeCategory10);

const color = (d)=>{
    return scale(+d.zone);
};

const link = svg
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", d => Math.sqrt(d.value));

const node = svg
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 5)
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .attr("fill", color)
    .call(drag(simulation));


const text = svg
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("font-size", d => 8 + Math.sqrt(d.influence))
    .text(d => d.character)
    .call(drag(simulation));

simulation.on("tick", () => {
    console.log("TICK!");
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

