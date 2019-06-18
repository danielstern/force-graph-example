/**
 * Force directed graph component which displays the name associated with any Node at the place
 * that the Node is arranged by the force directed graph.
 */
import * as d3 from "d3";
import {data, svg} from "../config";
import {nodeScale} from "./node";

const {nodes} = data;

const fontSizeScale = d3.scaleLinear()
    .domain([0, d3.max(nodes.map((node) => node.influence))])
    .range([7, 12]);

const textContainer = svg
    .selectAll("g.label")
    .data(nodes)
    .enter()
    .append("g");

textContainer
    .append("text")
    .text((d) => d.name)
    .attr("font-size", (d) => fontSizeScale(d.influence))
    .attr("transform", (d) => {

        const scale = nodeScale(d.influence);
        const x = scale + 2;
        const y = scale + 4;
        return `translate(${x}, ${y})`;

    });


export const animate = () => {

    textContainer
        .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

};