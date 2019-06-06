import * as d3 from "d3";
import {data, svg, getAppearanceSettings} from "../../config";
import {simulation} from '../simulation';
import {drag} from "../drag";

const {nodes} = data;
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

export const nodeScale = d3.scaleLinear()
    .domain([0, d3.max(nodes.map((node) => node.influence))])
    .range([5, 25]);

export const node = svg
    .selectAll("g")
    .data(nodes)
    .join("g");

export const circle = node
    // .selectAll("circle")
    // .data("nodes")
    // .join("circle")
    .append("circle")
    .attr("r", (d) => nodeScale(d.influence))
    .attr("stroke", "#fff")
    .attr("stroke-width", 0.5)
    .style("fill", (d) => colorScale(d.zone));

node.call(drag(simulation));

export const animate = () => {

    const settings = getAppearanceSettings();

    if (settings.useEllipseNode) {

        node.attr("transform", (d) => `translate(${d.x} ${d.y})`);
        // circle.style("opacity", 1);

    } else {

        // circle.style("opacity", 0);

    }

};

