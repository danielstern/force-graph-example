import * as d3 from "d3";
import {svg} from "../config";
import {node} from './node';
import {simulation} from './simulation';

let currentTarget = null;

const card = svg
    .append("g")
    .attr("pointer-events", "none")
    .attr("display", "none");

const cardBackground = card.append("rect")
    .attr("width", 180)
    .attr("height", 45)
    .attr("fill", "#eee")
    .attr("stroke", "#333")
    .attr("rx", 4);

const cardTextName = card
    .append("text")
    .attr("transform", "translate(8, 20)");

const cardTextPosition = card
    .append("text")
    .attr("font-size", "10")
    .attr("transform", "translate(8, 35)");

node.on("mouseover",(datum) => {

    currentTarget = d3.event.target;
    card.attr("display", "block");

    cardTextName.text(datum.name);
    cardTextPosition.text(datum.role);

    const width = Math.max(cardTextName.node().getBBox().width, cardTextPosition.node().getBBox().width);

    cardBackground.attr("width", width + 16);

    simulation.alphaTarget(0.3).restart();

});

node.on("mouseout",() => {

    card.attr("display", "none");
    currentTarget = null;

});

export const animate = () => {

    if (currentTarget) {

        card.attr("transform", `translate(${currentTarget.cx.baseVal.value + 10}, ${currentTarget.cy.baseVal.value})`)

    }

};

