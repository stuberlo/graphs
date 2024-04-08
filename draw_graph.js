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
let drawAxes = data['draw_axes']
let drawGrid = data['draw_grid']
let dataset = data['dataset']
let color = data['color']
let chartType = data['chartType']
graph.datasets.push({'data': dataset, 'color': color, 'chartType': chartType})
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

if (barData['limits']) {
x_min = barData['limits']['x_min']
x_max = barData['limits']['x_max']
y_min = barData['limits']['y_min']
y_max = barData['limits']['y_max']
}

if (barData['size']) {
  width = barData['size']['width']
  height = barData['size']['height']
}
if (barData['xTics']) {
	xTics = barData['xTics']
}
if (barData['yTics']) {
	yTics = barData['yTics']
}
drawAxes = barData['draw_axes']
drawGrid = barData['draw_grid']
dataset = barData['dataset']
color = barData['color']
chartType = barData['chartType']
graph.datasets.push({'data': dataset, 'color': color, 'chartType': chartType, 'hoverColor': 'lightgreen', 'clickColor': 'blue', 'clickAction': function(ds, i) {console.log('hovered on data point', ds['data'][i-1])}})
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
