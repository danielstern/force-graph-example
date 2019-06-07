import * as d3 from "d3";
import {svg} from "../../config";
import {node} from '../node/ellipse';
import {simulation} from '../simulation';

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

node
    .on("mouseover",(datum) => {
        currentTarget = d3.event.target;

        cardTextName.text(datum.name);
        cardTextPosition.text(datum.role);

        console.log(cardTextName);

        const width = Math.max(cardTextName.node().getBBox().width, cardTextPosition.node().getBBox().width);

        card.attr("display", "block");
        cardBackground.attr("width", width + 16);
        simulation.alphaTarget(0.3).restart();

    });

node
    .on("mouseout",(datum) => {
        // const element = d3.event.target;
        card.attr("display", "none");
        currentTarget = null;

        // console.log("You hovered over...", d3.event.target, e);
        // TODO: possibly, need hovercards in own seperate container above, then use animate?
        // console.log("Your the ellipse now dog.",e,this);
        // d3.select(this).appendTo(svg);
        // svg.remove(this);
        // console.log(d3.event.target);
        // svg.remove(d3.select(d3.event.target));
        // console.log(d3.select(d3.event.target));
        // svg.append(d3.event.target[0]);

    });

export const animate = () => {

    if (currentTarget) {

        card.attr("transform", `translate(${currentTarget.cx.baseVal.value}, ${currentTarget.cy.baseVal.value})`)

    }

};

