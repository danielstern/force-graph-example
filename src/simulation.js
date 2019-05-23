const d3 = require('d3');

const {nodes,links} = require('../data/got');
import {width,height} from '../config';

const forceManyBody = d3.forceManyBody();

export const simulation = d3.forceSimulation(nodes)
    .force("link",d3.forceLink(links).id(d => d.id))
    .force("charge", forceManyBody)
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide());

document.querySelector("#GravityControl").addEventListener("change", e=>{
    manyBody.strength(e.target.value);
    simulation.alphaTarget(0.3).restart();
});
