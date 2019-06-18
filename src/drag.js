import * as d3 from "d3";

/**
 * Defines standard subroutines for when a node is dragged.
 * Basically, if a node is dragged, keep moving it to where the mouse is going.
 */

export const drag = (simulation) => {

    const dragstarted = (d) => {

        if (!d3.event.active) {

            simulation.alphaTarget(0.3).restart();

        }

        d.fx = d.x;
        d.fy = d.y;

    };

    const dragged = (d) => {

        d.fx = d3.event.x;
        d.fy = d3.event.y;

    };

    const dragended = (d) => {

        if (!d3.event.active) {

            simulation.alphaTarget(0);

        }

        d.fx = null;
        d.fy = null;

    };

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

};
