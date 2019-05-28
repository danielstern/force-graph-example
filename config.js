import * as d3 from 'd3';

export const [width, height] = [600,600];
export { default as data } from './data/wto.json';
export const svg = d3.select("#Target");