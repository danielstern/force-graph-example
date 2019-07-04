/*
    Configuration file defining shared constants and standardized references, such as the svg target.
*/

import * as d3 from 'd3';

export const [width, height] = [600,600];
export const svg = d3.select("#Target");
export {data} from "./data";

