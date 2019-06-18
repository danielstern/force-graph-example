/**
 * Defines the simulation, which is what determines where each Node should be arranged. Uses math.
 */
import * as d3 from "d3";
import {data, height, width} from "../config";

const {nodes, links} = data;

/**
 * Gravity determines how strongly the nodes push / pull eachother.
 * In effect, the lower the number goes, the more spread out the graph will be.
 */

const gravity = -100;

const forceManyBody = d3.forceManyBody()
    .strength(gravity);

const forceLink = d3.forceLink(links)
    .id((d) => d.id)
    .distance(50);

export const simulation = d3.forceSimulation(nodes)
    .force("link", forceLink)
    .force("charge", forceManyBody)
    .force("center", d3.forceCenter(width / 2, height / 2));