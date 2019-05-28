import * as d3 from 'd3';
import {data, height, width, svg} from '../config';

const {nodes,links} = data;

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

const color = (d)=>{
    return colorScale(+d.zone);
};

const ellipseScale = d3.scaleLinear()
    .domain([0,d3.max(nodes.map(node => node.influence))])
    .range([1, 25]);


export const node = svg
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", d => ellipseScale(d.influence) + 8)
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .attr("fill", color);