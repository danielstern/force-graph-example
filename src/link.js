// TODO: How do curved links fit into it all?

import * as d3 from "d3";
import {data, height, width, svg} from "../config";

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
    .selectAll("path.x")
    .data(links)
    .enter()
    .append("path")
    // .join("path.x")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .attr("stroke-dasharray", d => linkDashScale(d.weight))
    .attr("stroke-width", (d) => linkWidthScale(d.weight))
    // .attr("marker-mid", "url(#arrow)")
    // .attr("marker-start", "url(#arrow)")
    // .attr("marker-start", "url(#markerArrow)")
    .attr("marker-mid", (d) => {
        // console.log(d) && "url(#markerArrow)"
        switch (d.type) {
            case "SUPERVISORY":
                return "url(#markerArrow)";
            default:
                return "none";
        }
    })
    .attr("fill", "none");

const lineGenerator = d3.line()
    .curve(d3.curveCardinal);

export const animate = () => {
    link.attr("d", (d, dIndex) => {

        let mid = [(d.source.x + d.target.x) / 2 , (d.source.y + d.target.y) / 2];
        if (d.overlap.length > 0) {

            // if (d.overlap.find(overlapping => overlapping.weight > d.weight)) {

                const index = d.overlap.filter(ol => ol.weight > d.weight).length;

                const distance = Math.sqrt(Math.pow(d.target.x - d.source.x, 2) + Math.pow(d.target.y - d.source.y, 2));
                const slopeX = (d.target.x - d.source.x) / distance;
                const slopeY =  (d.target.y - d.source.y) / distance;

                // const y

                // TODO... replace hardcoding 10 pixel translate with smooth slope based adjustment
                // const distanceX = 2.5 * index * (index % 2 === 0 ? -1 : 1);
                const distanceX = 2.5 * index;
                const distanceY = 2.5 * index;
                // const distanceY = 2.5 * index  * (index % 2 === 0 ? -1 : 1);
                mid[0] = (mid[0]) + distanceX * slopeY;
                mid[1] = (mid[1]) - distanceY * slopeX;

        };
        // mid[0] = (mid[0] + width/2) / 2 ;
        // mid[1] = (mid[1] + height/2) / 2 ;
        return lineGenerator([
            [d.source.x, d.source.y],
            mid,
            [d.target.x, d.target.y],

        ])
    });
};