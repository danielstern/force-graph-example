import * as d3 from "d3";
import {data, height, width, getAppearanceSettings} from "../config";
import {drag} from "./drag";
import {link as curveLink, animate as animateCurve} from "./link/curve";
import {link as directLink, animate as animateDirectLink} from "./link/direct";
import {node as ellipseNode, animate as animateEllipseNode} from "./node/ellipse";
import {node as imageNode, animate as animateImageNode} from "./node/image";
import {text, animate as animateText} from "./text";
// import {node} from "./node/image";

const {nodes, links} = data;

const forceManyBody = d3
    .forceManyBody()
    .strength(-250);

const forceLink = d3.forceLink(links)
    .id((d) => d.id)
    .distance(200);

// force collide only makes sense for circles, unless they can be given a "box"
// const forceCollide = d3.forceCollide()
//     .strength(10)
//     .radius(d => 15);

export const start = () => {
//
    const simulation = d3.forceSimulation(nodes)
        .force("link", forceLink)
        .force("charge", forceManyBody)
        .force("center", d3.forceCenter(width / 2, height / 2))
     // .force("collide", forceCollide)

    simulation.on("tick", () => {

        const settings = getAppearanceSettings();

        // for the man who has everything...

        if (settings.useDirectLink) {
            animateDirectLink();
            directLink.style("opacity",1);
            curveLink.style("opacity",0);
        } else {
            animateCurve();
            directLink.style("opacity",0);
            curveLink.style("opacity",1);
        }


        animateText();

        if (settings.useEllipseNode) {
            animateEllipseNode();
            imageNode.style("opacity",0);
            ellipseNode.style("opacity", 1);
        } else {
            animateImageNode();
            imageNode.style("opacity",1);
            ellipseNode.style("opacity", 0);
        }


    });

    ellipseNode.call(drag(simulation));
    imageNode.call(drag(simulation));

};
