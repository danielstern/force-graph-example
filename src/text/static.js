import * as d3 from "d3";
import {data, svg} from "../../config";

const {nodes} = data;

const textScale = d3.scaleLinear()
    .domain([0, d3.max(nodes.map((node) => node.influence))])
    .range([1, 9]);

export const text = svg
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("font-size", (d) => 7 + textScale(d.influence))
    .text((d) => d.name);

export const animate = () => {

    text
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y);

};
