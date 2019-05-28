import * as d3 from 'd3';
import {data, height, width, svg} from '../config';

const {nodes,links} = data;

const textScale = d3.scaleLinear()
    .domain([0,d3.max(nodes.map(node => node.influence))])
    .range([1, 9]);

export const text = svg
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("font-size", d => 7 + textScale(d.influence))
    .text(d => d.country)
    // .call(drag(simulation));
