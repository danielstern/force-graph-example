import * as d3 from 'd3';
import {data, height, width} from '../config';

const {nodes,links} = data;

const forceManyBody = d3.forceManyBody();

export const simulation = d3.forceSimulation(nodes)
    .force("link",d3.forceLink(links).id(d => d.id))
    .force("charge", forceManyBody)
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide());

document.querySelector("#GravityControl").addEventListener("change", e=>{
    forceManyBody.strength(e.target.value);
    simulation.alphaTarget(0.3).restart();
});
