import * as d3 from "d3";
import {data, svg} from "../config";
// import {drag} from "./drag";
// import {simulation} from "./simulation";

const {nodes} = data;
// const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

import {nodeScale} from './node';

export const imageContainer =
    svg
        .selectAll("g.imageContainer")
        .data(nodes)
        .enter()
        .append("g");

export const image = imageContainer
    .append("image")
    .attr("height", (d) => nodeScale(d.influence))
    .attr("width", (d) => nodeScale(d.influence))
    .attr("transform", (d) =>`translate(${-nodeScale(d.influence)/2}, ${-nodeScale(d.influence)/2})`)
    .attr("href", (d, i) => `image/img-${i}.png`);

export const animate = () => {

    imageContainer
        .attr("transform", (d) => `translate(${d.x}, ${d.y})`);
        // .attr("cx", (d) => d.x)
        // .attr("cy", (d) => d.y);

};

// node.call(drag(simulation));