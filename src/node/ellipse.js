import * as d3 from "d3";
import {data, svg, getAppearanceSettings} from "../../config";
import {simulation} from '../simulation';
import {drag} from "../drag";

const {nodes} = data;
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

export const nodeScale = d3.scaleLinear()
    .domain([0, d3.max(nodes.map((node) => node.influence))])
    .range([5, 25]);

// export const node = svg
//     .selectAll("g")
//     .data(nodes)
//     .join("g");
    // .attr("class", "chart-group");

// node
//     .on("mouseover",(e) => {
//         // TODO: possibly, need hovercards in own seperate container above, then use animate?
//         // console.log("Your the ellipse now dog.",e,this);
//         // d3.select(this).appendTo(svg);
//         // svg.remove(this);
//         // console.log(d3.event.target);
//         // svg.remove(d3.select(d3.event.target));
//         // console.log(d3.select(d3.event.target));
//         // svg.append(d3.event.target[0]);
//
//     });

// export const circle = node
export const node = svg
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    // .enter()
    // .append("circle")
    .attr("r", (d) => nodeScale(d.influence))
    .attr("stroke", "#fff")
    .attr("stroke-width", 0.5)
    .style("fill", (d) => colorScale(d.zone));



node.call(drag(simulation));

export const animate = () => {

    node
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);
    // node.attr("transform", (d) => `translate(${d.x} ${d.y})`);

};

