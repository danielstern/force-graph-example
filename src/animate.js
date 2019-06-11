/**
 * Since simulation.on("tick") can only be called once,
 * it is convenient to localize all the animation updates in one file like so
 */

import {simulation} from './simulation';
import {animate as animateLink} from './link/curve';
// import {animate as animateLink} from './link/polyline';
// import {animate as animateLink} from './link/direct';
// import {animate as animateLink} from './link/direct-b';
import {animate as animateEllipseNode} from './node';
import {animate as animateHovercard} from './hovercard';

simulation.on("tick", () => {

    animateEllipseNode();
    animateLink();
    animateHovercard();

});