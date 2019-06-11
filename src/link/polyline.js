import * as d3 from "d3";
import {data, svg} from "../../config";
import {simulation} from '../simulation';

const {links} = data;

const linkWidthScale = d3
    .scaleLinear()
    .domain([0, d3.max(links.map((link) => link.weight))])
    .range([0.5, 1.5]);

const linkDashScale = d3
    .scaleOrdinal()
    .domain([0, 2, 3])
    .range(["4 2", "2 2", null]);


export const link = svg
    .selectAll("polyline")
    .data(links)
    .join("polyline")
    .attr("stroke", "#999")
    .attr("fill","none")
    .attr("stroke-opacity", 0.6)
    .attr("stroke-dasharray", d => linkDashScale(d.weight))
    .attr("stroke-width", (d) => linkWidthScale(d.weight));
    // .attr("marker-end", "url(#arrow)");

// TODO... this algorithm also yields far out and wrong results...
export const animate = () => {
    link.attr("points", d => {


        const dA = 2.5;

        const [x0, x1, y0, y1] = [d.source.x, d.target.x, d.source.y, d.target.y]
        const [xv, yv] = [x1 - x0, y1 - y0];
        const dv = Math.sqrt(Math.pow(xv, 2) + Math.pow(yv, 2));
        const u = [dv / xv, dv / yv];

        const pointA = `${x0}, ${y0}`;
        const pointAZ = `${x0 + u[0] * dA}, ${y0 + u[1] * dA}`;
        const pointB = `${x1}, ${y1}`;

        console.log(pointAZ);

        // return `${pointA} ${pointB}`;
        return `${pointA} ${pointAZ} ${pointB}`;


    });

}

// this formula doesn't work... accuracy problem, perhaps
// export const animate = () => {
//
//     link.attr("points", d => {
//
//         const [x0, x1, y0, y1] = [d.source.x, d.target.x, d.source.y, d.target.y];
//
//         const dt1 = 2;
//         const dt2 = 0;
//         const dz = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
//
//         const mx = x1 / x0;
//         const my = y1 / y0;
//
//
//         // const t = dt1 / d;
//
//         const x0A = x0 + (dt1 * mx);
//         const y0A = y0 + (dt1 * my);
//
//         // console.log(dz, mx, my);
//
//         console.log(mx, my);
//
//         // this should work... why doesn't it work? floating point precision?
//
//         // return `${x0}, ${y0} ${x1}, ${y1}`
//         // return `${x0A}, ${y0A} ${x1}, ${y1}`
//         return `${x0A}, ${y0A} ${x1}, ${y1}`
//
//         // const [xt, yt] = (((1 - t) * x0 + ))
//
//             // const slopeX = d.target.x - d.source.x;
//             // const slopeY = d.target.y - d.source.y;
//             //
//             // const separation = Math.sqrt(slopeX * slopeX + slopeY * slopeY);
//             //
//             //
//             // const distance = 20 * separation;
//             // // console.log(separation, distance);
//             //
//             // const pointA = `${d.source.x}, ${d.source.y} `;
//             // const pointC = `${d.target.x}, ${d.target.y} `;
//             //
//             // const pointBX = d.target.x - slopeX / distance;
//             // const pointBY = d.target.y - slopeY / distance;
//             //
//             // const pointB = `${pointBX}, ${pointBY}`
//             //
//             // // return `${pointA} ${pointC}`;
//             // // return `${pointA} ${pointB} ${pointC}`;
//             // return `${pointA}`;
//             // // return `${pointA} ${pointC}`;
//         });
//
// };
