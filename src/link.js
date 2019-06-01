// import * as d3 from "d3";
// import {data, svg} from "../config";
//
// const {links} = data,
//
//     linkWidthScale = d3.scaleLinear()
//         .domain([0, d3.max(links.map((link) => link.weight))])
//         .range([0.1, 3]);
//
// export const link = svg
//     .selectAll("line")
//     .data(links)
//     .join("line")
//     .attr("stroke", "#999")
//     .attr("stroke-opacity", 0.6)
//     .attr("stroke-width", (d) => linkWidthScale(d.weight));
