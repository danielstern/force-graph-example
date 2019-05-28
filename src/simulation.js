import * as d3 from 'd3';
import {data, height, width} from '../config';
import {link} from './link';
import {node} from './node';
import {text} from './text';
import {drag} from './drag';

const {nodes,links} = data;

const forceManyBody = d3
    .forceManyBody()
    .strength(-250);

const forceLink = d3.forceLink(links)
        .id(d => d.id)
        .distance(200)

const forceCollide = d3.forceCollide()
    .strength(10)
    // .radius(d => 10);

export const simulation = d3.forceSimulation(nodes)
    .force("link", forceLink)
    .force("charge", forceManyBody)
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide());

node.call(drag(simulation));

simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    text
        .attr("x", d => d.x)
        .attr("y", d => d.y);
});

