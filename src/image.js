/**
 * Simple force directed graph component which displays a specific image for each Node in the
 * place where that Node is arranged by the force directed graph.
 */
import {data, svg} from "../config";
import {nodeScale} from './node';

const {nodes} = data;

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

};
