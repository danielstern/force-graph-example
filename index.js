/** todo...
 *  add more comments
 *  replace data with open source data (world economics?)
 */

// good example:
// https://bl.ocks.org/steveharoz/8c3e2524079a8c440df60c1ab72b5d03


// todo... index deosn't do nothing no more
// import * as d3 from 'd3';
// import {data, height, width, svg} from './config';
//
// const {nodes,links} = data;
// const {drag} = require('./src/drag');
const {simulation} = require('./src/simulation');
// const {link} = require('./src/link');

// import './data-convert';


// const text = svg
//     .selectAll("text")
//     .data(nodes)
//     .join("text")
//     .attr("font-size", d => 3 + ellipseInfluenceScale(d.influence))
//     .text(d => d.character || d.country)
//     .call(drag(simulation));
//

// simulation.on("tick", () => {
//     console.log("Another sim tick")
//     // link
//     //     .attr("x1", d => d.source.x)
//     //     .attr("y1", d => d.source.y)
//     //     .attr("x2", d => d.target.x)
//     //     .attr("y2", d => d.target.y);
//
//     node
//         .attr("cx", d => d.x)
//         .attr("cy", d => d.y);
//
//     text
//         .attr("x", d => d.x)
//         .attr("y", d => d.y);
// });
//
