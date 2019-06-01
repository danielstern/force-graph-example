import * as d3 from "d3";
import {data, svg} from "../../config";

const {nodes} = data;
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

export const nodeScale = d3.scaleLinear()
    .domain([0, d3.max(nodes.map((node) => node.influence))])
    .range([5, 25]);

export const node = svg
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", (d) => nodeScale(d.influence) + 8)
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .style("fill", (d) => colorScale(d.zone));

export const animate = () => {

    node.attr("transform", (d) => `translate(${d.x} ${d.y})`);

};