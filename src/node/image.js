import * as d3 from "d3";
import {data, svg} from "../../config";

const {nodes} = data;
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
const color = (d) => colorScale(d.zone);

export const nodeScale = d3.scaleLinear()
    .domain([0, d3.max(nodes.map((node) => node.influence))])
    .range([20, 80]);

export const node = svg
    .selectAll("g")
    .data(nodes)
    .join("g");

node.append("rect")
    .attr("width", (d) => nodeScale(d.influence) * 1.1)
    .attr("height", (d) => nodeScale(d.influence) * 0.75)
    .attr("x",  (d) => nodeScale(d.influence) * -0.11 / 2)
    .attr("y",  (d) => nodeScale(d.influence) * -0.075 / 2)
    .style("fill", color);

node.append("image")
    .attr("xlink:href", (d) => `images/${d.image}`)
    .attr("width",(d) => nodeScale(d.influence));

export const animate = () => {

    node.attr("transform", (d) => `translate(${d.x} ${d.y})`);

};