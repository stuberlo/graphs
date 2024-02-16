import { Graph } from './graph.js';

const graph = new Graph("graphCanvas");

// data defined in data.js
let width = 800 // in pixels
let height = 400 // in pixels
let x_min = -10
let x_max = 10
let y_min = -10
let y_max = 10
let xTics = false
let yTics = false

if (data['limits']) {
x_min = data['limits']['x_min']
x_max = data['limits']['x_max']
y_min = data['limits']['y_min']
y_max = data['limits']['y_max']
}

if (data['size']) {
  width = data['size']['width']
  height = data['size']['height']
}
if (data['xTics']) {
	xTics = data['xTics']
}
if (data['yTics']) {
	yTics = data['yTics']
}
const drawAxes = data['draw_axes']
const drawGrid = data['draw_grid']
const dataset = data['dataset']
const color = data['color']
graph.datasets.push([dataset, color])
graph.updateGraph(
   x_min, 
   x_max, 
   y_min, 
   y_max, 
   {
   	drawAxes: drawAxes,
   	drawGrid: drawGrid,
   	drawXtics: xTics, 
   	drawYtics: yTics, 
   	width: width,
   	height: height,
   }
);
