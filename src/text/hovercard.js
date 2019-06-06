import * as d3 from "d3";
import {data, svg} from "../../config";
import {node} from '../node/ellipse';

const {nodes} = data;

const textScale = d3.scaleLinear()
    .domain([0, d3.max(nodes.map((node) => node.influence))])
    .range([1, 9]);

// Todo 1... "hitbox" area of hovercard needs to be exactly over the ellipse - easy enough, given that each ellipse's size is deterministic

// Todo 2... Size of text box should fully encompass the text

// Todo 3... hitbox shouldn't interfere with drag... it does obviously

// Container Structure
  // 1. G container
  // 2. Just parent the text to the SVG?

// const container = svg
//     .selectAll("g")
//     .data(nodes)
//     .join("g")
//     .style("opacity", "0");

const container = node
    .append("g")
    .attr("class", "hover")
    // .attr("opacity", 0);

const background = container
    .append("rect")
    .attr("width", (d) => 25 * d.influence)
    .attr("height", (d) => 4 * d.influence)
    .attr("fill", "rbg(72,72,72)")
    .attr("fill-opacity", "0.7");

const name = container
    .append("text")
    .attr("font-size", (d) => 7 + textScale(d.influence))
    .attr("fill", "white")
    .attr("y", 10)
    .text((d) => d.name);

export const animate = () => {

    // container
    //     .attr("transform", (d) => `translate(${d.x + 12}, ${d.y + 15})`);

};
