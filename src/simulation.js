import * as d3 from "d3";
import {data, height, width} from "../config";
import {drag} from "./drag";
import {link} from "./link";
import {node, image, ellipseScale} from "./node";
import {text} from "./text";


const {nodes, links} = data;

const forceManyBody = d3
    .forceManyBody()
    .strength(-250);

const forceLink = d3.forceLink(links)
    .id((d) => d.id)
    .distance(200);

// TODO... necessary to add radius or colide?
const forceCollide = d3.forceCollide()
    .strength(10);
    // .radius(d => 10);

export const start = () => {

    const simulation = d3.forceSimulation(nodes)
        .force("link", forceLink)
        .force("charge", forceManyBody)
        .force("collide", forceCollide)
        .force("center", d3.forceCenter(width / 2, height / 2));

    simulation.on("tick", () => {

        link
            .attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);

        node
            // .attr("cx", (d) => d.x - ellipseScale(d))
            // .attr("cy", (d) => d.y - ellipseScale(d));
            .attr("cx", (d) => d.x + ellipseScale(d.influence) * 1.5)
            .attr("cy", (d) => d.y + ellipseScale(d.influence) * 1.5)
            // .attr("cx", (d) => {console.log(d.x, ellipseScale(d)); return d.x})
            // .attr("cx", (d) => {console.log(d.x, ellipseScale(d)); return d.x})

        image
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y);

        text
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y);

    });

    node.call(drag(simulation));

};

