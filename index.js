const d3 = require('d3');
const {links,nodes} = require('./data');
const [width, height] = [600,600];

const simulation = d3.forceSimulation(nodes)
    .force("link",d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

const svg = d3.select("#Target");

const drag = simulation => {

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
};


const scale = d3.scaleOrdinal(d3.schemeCategory10);

const color = (d)=>{
    return scale(+d.zone);
};

const link = svg
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", d => Math.sqrt(d.value));

const node = svg
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 5)
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .attr("fill", color)
    .call(drag(simulation));


const text = svg
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("font-size", d => 8 + Math.sqrt(d.influence))
    .text(d => d.character)
    .call(drag(simulation));

simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    text
        .attr("x", d => d.x)
        .attr("y", d => d.y);
});