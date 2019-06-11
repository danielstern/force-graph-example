import * as d3 from "d3";
import {data, svg} from "../../config";
import {simulation} from '../simulation';

const {links} = data;

const linkWidthScale = d3
    .scaleLinear()
    .domain([0, d3.max(links.map((link) => link.weight))])
    .range([0.5, 1.5]);

const linkDashScale = d3
    .scaleOrdinal()
    .domain([0, 2, 3])
    .range(["4 2", "2 2", null]);


export const link = svg
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .attr("stroke-dasharray", d => linkDashScale(d.weight))
    .attr("stroke-width", (d) => linkWidthScale(d.weight))
    // .attr("marker-end", "url(#arrow)");

export const animate = () => {

    // TODO: possible solution, just caclualte a new point away from v2 in the vague direction of the other point

    console.log(link);
    if (link.overlap) {
        console.log("This link overlaps");
    } else {
        console.log("This link does not overlap");
    }
    link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

};
