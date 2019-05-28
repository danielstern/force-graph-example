import * as d3 from "d3";
import {data, svg} from "../config";

const {nodes} = data;
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
const color = (d) => colorScale(d.zone);

const ellipseScale = d3.scaleLinear()
    .domain([0, d3.max(nodes.map((node) => node.influence))])
    .range([1, 25]);

export const node = svg
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", (d) => ellipseScale(d.influence) + 8)
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .attr("fill", color);
