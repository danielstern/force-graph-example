/**
 * Simple component which draws a circle for each node wherever it is arranged by the simulation.
 */
import * as d3 from "d3";
import {data, svg} from "../config";
import {drag} from "./drag";
import {simulation} from "./simulation";

const {nodes} = data;
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

export const nodeScale = d3.scaleLinear()
    .domain([0, d3.max(nodes.map((node) => node.influence))])
    .range([8, 20]);

export const node = svg
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", (d) => nodeScale(d.influence))
    .attr("stroke", "#ccc")
    .attr("stroke-width", 0.5)
    .style("fill", (d) => colorScale(d.zone));

export const animate = () => {

    node
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);

};

node.call(drag(simulation));