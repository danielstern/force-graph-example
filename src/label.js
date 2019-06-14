import * as d3 from "d3";
import {data, svg} from "../config";
import {nodeScale} from './node';

const {nodes} = data;

const fontSizeScale = d3.scaleLinear()
    .domain([0, d3.max(nodes.map((node) => node.influence))])
    .range([7, 12]);

const textContainer = svg
    .selectAll("g.label")
    .data(nodes)
    .enter()
    .append("g");
    // .text((d) => d.name)

    // .attr((d) => fontSizeScale(d.influence))

    // .selectAll("circle")
    // .data(nodes)
    // .enter("circle")
    // .append("circle")
    // .attr("r", (d) => nodeScale(d.influence))
    // .attr("stroke", "#fff")
    // .attr("stroke-width", 0.5)
    // .style("fill", (d) => colorScale(d.zone));

const text = textContainer
    .append("text")
    .text((d) => d.name)
    .attr("font-size", (d) => fontSizeScale(d.influence))
    .attr("transform", (d) => `translate(${nodeScale(d.influence) + 2}, ${nodeScale(d.influence) + 4})`)


export const animate = () => {

    textContainer
        .attr("transform", (d) => `translate(${d.x}, ${d.y})`);
        // .attr("cx", (d) => d.x)
        // .attr("cy", (d) => d.y);

};