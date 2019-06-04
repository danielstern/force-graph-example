import * as d3 from "d3";
import {data, height, width, getAppearanceSettings} from "../config";

// import {drag} from "./drag";

/**
 * Gravity determines how strongly the nodes push / pull eachother.
 * In effect, the lower the number goes, the more spread out the graph will be.
 */
const gravity = -100;
const {nodes, links} = data;

const forceManyBody = d3
    .forceManyBody()
    .strength(gravity);

const forceLink = d3.forceLink(links)
    .id((d) => d.id)
    .distance(50);

// console.log("LINKS?",links, nodes);

export const simulation = d3.forceSimulation(nodes)
    .force("link", forceLink)
    .force("charge", forceManyBody)
    .force("center", d3.forceCenter(width / 2, height / 2));

// So much unused code... wow!
// export const start = () => {


//
// export const start = () => {
//     const simulation = d3.forceSimulation(nodes)
//         .force("link", forceLink)
//         .force("charge", forceManyBody)
//         .force("center", d3.forceCenter(width / 2, height / 2));

    // simulation.on("tick", () => {

        // const settings = getAppearanceSettings();
        //
        // if (settings.useDirectLink) {
        //     animateDirectLink();
        //     directLink.style("opacity",1);
        //     curveLink.style("opacity",0);
        //
        // } else {
        //
        //     animateCurve();
        //     directLink.style("opacity",0);
        //     curveLink.style("opacity",1);
        //
        // }
        //
        // if (settings.useEllipseNode) {
        //     animateEllipseNode();
        //     imageNode.style("opacity",0);
        //     ellipseNode.style("opacity", 1);
        // } else {
        //     animateImageNode();
        //     imageNode.style("opacity",1);
        //     ellipseNode.style("opacity", 0);
        // }
        //
        // // TODO... add hovercards...
        // animateText();


    // });

    // ellipseNode.call(drag(simulation));
    // imageNode.call(drag(simulation));

// };
