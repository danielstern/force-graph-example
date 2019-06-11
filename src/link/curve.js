// TODO: How do curved links fit into it all?

import * as d3 from "d3";
import {data, height, width, svg} from "../../config";

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
    .selectAll("path")
    .data(links)
    .join("path")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .attr("stroke-dasharray", d => linkDashScale(d.weight))
    .attr("stroke-width", (d) => linkWidthScale(d.weight))

const lineGenerator = d3.line()
    .curve(d3.curveCardinal);

// TODO - the code below is very obtuse
export const animate = () => {
    link.attr("d", (d) => {
        // console.log(d, d.overlap);
        let mid = [(d.source.x + d.target.x) / 2 , (d.source.y + d.target.y) / 2];
        // mid[0] = (mid[0] + width/2) / 2 ;
        // mid[1] = (mid[1] + height/2) / 2 ;
        return lineGenerator([
            [d.source.x, d.source.y],
            mid,
            [d.target.x, d.target.y],

        ])
    });
};