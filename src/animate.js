/**
 * Since simulation.on("tick") can only be called once,
 * it is convenient to localize all the animation updates in one file like so.
 */

import {animate as animateLink} from "./link";
import {animate as animateLabel} from "./label";
import {animate as animateImage} from "./image";
import {animate as animateHovercard} from "./hovercard";
import {animate as animateEllipseNode} from "./node";
import {simulation} from "./simulation";

simulation.on("tick", () => {

    /**
     * Calls all the animation subroutines defined by any number of graph elements.
     */

    animateEllipseNode();
    animateLink();
    animateHovercard();
    animateLabel();
    animateImage();

});