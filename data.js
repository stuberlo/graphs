const data = {
	"dataset": [[-19, 2], [-10, 3], [0, -4], [10, 0]],
        "chartType": "line",
	"color": "blue",
	"limits": {
		"x_min": -20,
		"x_max": 12,
		"y_min": -10,
		"y_max": 10
	},
	"size": {
		"width": 1000,
		"height": 400
	},
	"draw_axes": false,
	"draw_grid": true,
	"xTics": [[-1, "January 3th"], [3, "February 14th"], [4, "March 12th"]],
	"yTics": [[-10, "-10"], [-5, "-5"], [0, "0"], [5, "5"], [10, "10"]]
}

const barData = {
	"dataset": [
                [-19, -5],
                [-18, -4],
                [-17, -3],
                [-16, -2],
                [-15, -1],
                [-14, 0],
                [-13, 1],
                [-12, 2],
                [-11, 1],
                [-10, 0],
                [-5, 5],
        ],
        "chartType": "bar",
	"color": "green",
	"limits": {
		"x_min": -20,
		"x_max": 12,
		"y_min": -10,
		"y_max": 10
	},
	"size": {
		"width": 1000,
		"height": 400
	},
	"draw_axes": false,
	"draw_grid": true,
	"xTics": [[-1, "January 3th"], [3, "February 14th"], [4, "March 12th"]],
	"yTics": [[-10, "-10"], [-5, "-5"], [0, "0"], [5, "5"], [10, "10"]]
}
