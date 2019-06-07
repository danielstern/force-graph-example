/**
 * Since simulation.on("tick") can only be called once,
 * it is convenient to localize all the animation updates in one file like so
 */

import {simulation} from './simulation';
import {animate as animateDirectLink} from './link/direct';
import {animate as animateEllipseNode} from './node/ellipse';
// import {animate as animateStaticText} from './text/static';
// import {animate as animateHovercard} from './text/hovercard';
import {animate as animateHovercard} from './text/hovercard';

simulation.on("tick", () => {

    animateEllipseNode();
    // animateDirectLink();
    animateHovercard();
    // animateStaticText();

});