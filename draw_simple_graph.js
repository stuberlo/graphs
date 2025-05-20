import { Graph } from './graph.js';

const graph = new Graph("simpleGraph");

graph.datasets.push({
    'data': [[-19, 2], [-10, 3], [0, -4], [10, 0]],
    'color': 'blue',
    'chartType': 'line'
})
graph.updateGraph(-20, 12, -10, 10);
