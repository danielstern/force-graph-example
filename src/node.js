import * as d3 from "d3";
import {data, svg} from "../config";

const {nodes} = data;
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
const color = (d) => colorScale(d.zone);

export const ellipseScale = d3.scaleLinear()
    .domain([0, d3.max(nodes.map((node) => node.influence))])
    .range([5, 25]);

const defs = svg.append("svg:defs");

// todo... circular nodes are col but a lot of overhead... maybe just use rectangular nodes?

// nodes.forEach((node, i) => {
//     defs.append("svg:pattern")
//         .attr("id", "node::" + node.id)
//         .attr("width", 100)
//         .attr("height", 100)
//         .attr("patternUnits", "userSpaceOnUse")
//         .append("svg:image")
//         .attr("xlink:href", "images/" + node.image)
//         .attr("width", 100)
//         .attr("height", 100)
//         // .attr("x", 0)
//         // .attr("y", 0);
// });

// TODO... size images appropriately, add border

// export const image = svg.selectAll("g")
//     .data(nodes)
//     .join("g")
//     .attr("transform", (d) => `translate(${ellipseScale(d.influence) * -1})`)
//     // .attr("x", (d) => ellipseScale(d.influence) * -1)
//     // .attr("y", (d) => ellipseScale(d.influence) * -1)
//     .append("image")
//     .attr("xlink:href", (d) => `images/${d.image}`)
//     .attr("clip-path", (d) => `url(#${d.id})`)
//     .attr("width",(d) => ellipseScale(d.influence) * 2)
//     .attr("height",(d) => ellipseScale(d.influence) * 2)
// // .attr("x", ellipseScale(d.influence) * -1)
// // .attr("y", ellipseScale(d.influence) * -1)
//

export const image = svg.selectAll("image")
    .data(nodes)
    .join("image")
    .attr("xlink:href", (d) => `images/${d.image}`)
    .attr("clip-path", (d) => `url(#${d.id})`)
    .attr("width",(d) => ellipseScale(d.influence) * 3)
    .attr("height",(d) => ellipseScale(d.influence) * 3)
    // .attr("x", ellipseScale(d.influence) * -1)
    // .attr("y", ellipseScale(d.influence) * -1)

// svg.selectAll("clipPath")
//     .data(nodes)
//     .join("clipPath")
//     .attr("id", d=>d.id)
//     .append("circle");
//
//
//

// works
// export const node = svg
//     .selectAll("circle")
//     .data(nodes)
//     .join("circle")
//     .attr("r", (d) => ellipseScale(d.influence) + 8)
//     .attr("stroke", "#fff")
//     .attr("stroke-width", 1.5)
//     .style("fill", color);
    // .style("fill", (d) => "url(#node::" + d.id + ")");


// images dont appear
export const node = svg.selectAll("clipPath")
    .data(nodes)
    .join("clipPath")
    .attr("id", d=>d.id)
    .append("circle")
    .attr("r", (d) => ellipseScale(d.influence))
    // .attr("stroke", "#fff")
    .attr("stroke", d => color(d))
    .attr("stroke-width", 1.5)
    // .style("fill", color)
    // .style("fill", (d) => "url(#node::" + d.id + ")");
