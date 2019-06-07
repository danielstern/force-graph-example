// import * as d3 from "d3";
// import {data, svg} from "../../config";
// import {node} from '../node/ellipse';
//
// const {nodes} = data;
//
// const textScale = d3.scaleLinear()
//     .domain([0, d3.max(nodes.map((node) => node.influence))])
//     .range([8, 18]);

// Todo 1... "hitbox" area of hovercard needs to be exactly over the ellipse - easy enough, given that each ellipse's size is deterministic

// Todo 2... Size of text box should fully encompass the text

// Todo 3... hitbox shouldn't interfere with drag... it does obviously

// Container Structure
  // 1. G container
  // 2. Just parent the text to the SVG?

// const container = svg
//     .selectAll("g")
//     .data(nodes)
//     .join("g")
//     .style("opacity", "0");

// const container = node
// const container = node
//     .append("g")
//     .attr("class","hovercard")
//     .attr("opacity", 0)
//     .attr("pointer-events", "none")
//     .attr("transform", "translate(15, 15)");
//
// const background = container
//     .append("rect")
//     .attr("width", (d) => 40 * d.influence)
//     .attr("height", (d) => 12 * d.influence)
//     .attr("fill", "rbg(72,72,72)")
//     .attr("fill-opacity", "0.7");
//
// const name = container
//     .append("text")
//     .attr("font-size", (d) => textScale(d.influence))
//     .attr("fill", "white")
//     .attr("y", 10)
//     .text((d) => d.name);


import * as d3 from "d3";
import {data, svg} from "../../config";
import {node} from '../node/ellipse';

// const {nodes} = data;

let currentTarget = null;

console.log("You're the hovercard now, dog");

const card = svg
    .append("g")
    .attr("pointer-events", "none");

const cardBackground = card.append("rect")
    .attr("width", 100)
    .attr("height", 100)
    .attr("fill", "orange");

const cardText = card.append("text");

node
    .on("mouseover",(datum) => {
        const element = d3.event.target;
        currentTarget = element;

        cardText.text = datum.name;
        card.attr("display", "block");

        // console.log(element);

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
        // console.log(currentTarget, currentTarget.transform, currentTarget.transform.baseVal)

        // console.log(currentTarget, currentTarget.cx.baseVal.value)
        // card.attr("x", currentTarget.cx);
        // card.attr("transform", currentTarget.transform);
        card.attr("transform", `translate(${currentTarget.cx.baseVal.value}, ${currentTarget.cy.baseVal.value})`)

    }

};

