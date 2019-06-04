import * as d3 from "d3";
import {data, svg, getAppearanceSettings} from "../../config";
import {simulation} from '../simulation';

const {nodes} = data;
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

export const nodeScale = d3.scaleLinear()
    .domain([0, d3.max(nodes.map((node) => node.influence))])
    .range([5, 25]);

export const node = svg
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", (d) => nodeScale(d.influence))
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .style("fill", (d) => colorScale(d.zone));

export const animate = () => {

    const settings = getAppearanceSettings();

    if (settings.useEllipseNode) {

        node.attr("transform", (d) => `translate(${d.x} ${d.y})`);
        node.style("opacity", 1);

    } else {

        node.style("opacity", 0);

    }

};