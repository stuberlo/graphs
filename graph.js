const GRID_LINES_COLOR = "#000000",
TIC_LABEL_COLOR = "#00DDDD",
TIC_LINE_COLOR = "#DDDDDD",
AXES_COLOR = "#000000";

export class Graph {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.scaleX = 1;
        this.scaleY = 1;
        this.datasets = []
    }

    updateGraph(minX, maxX, minY, maxY, extras={}) {
        this.canvas.style.border = "2px solid #000000"
        this.clearGraph();

        if (extras['width']) {
                this.canvas.width = extras['width']
        }
        if (extras['height']) {
                this.canvas.height = extras['height']
        }
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
        this.scaleX = this.canvas.width / (this.maxX - this.minX);
        this.scaleY = this.canvas.height / (this.maxY - this.minY);

        if (extras['drawGrid']) {
                this.drawGridlines();
        }

        if (extras['drawAxes']) {
                this.drawAxes();
        }
        if (extras['drawXtics']) {
                this.drawTics(extras['drawXtics'], 'x');
        }
        if (extras['drawYtics']) {
                this.drawTics(extras['drawYtics'], 'y');
        }
        if (extras['chartType']) {
                this.drawTics(extras['drawYtics'], 'y');
        }

        for (const ds of this.datasets) {
                ds['objects'] = this.drawData(ds['data'], ds['color'], ds['chartType']);
        }

        this.displayGraphValues();

        // some click and hover logic
        const datasets = this.datasets
        const ctx = this.ctx

        function fireIfPointInPath(e, datasets, eventType) {
                let rect = e.target.getBoundingClientRect(),
                    x = e.clientX - rect.left,
                    y = e.clientY - rect.top,
                    i = -1, b,
                    eventColor = eventType + 'Color',
                    eventAction = eventType + 'Action';
                for (const ds of datasets) {
                  while(b = ds.objects[i++]) {
                    ctx.beginPath();
                    ctx.rect(b.x, b.y, b.w, b.h);
                    if (ctx.isPointInPath(x, y)) {
                      ctx.fillStyle = ds[eventColor]
                      if (ds[eventAction]) {
                        ds[eventAction](ds, i)
                      }
                    } else {
                      ctx.fillStyle = ds['color']
                    }
                    ctx.fill();
                  }
                }
        }

        this.canvas.onclick = function(e) {
                fireIfPointInPath(e, datasets, 'click')
        }

        this.canvas.onmousemove = function(e) {
                fireIfPointInPath(e, datasets, 'hover')
        }
    }

    displayGraphValues() {
        const valuesText = `minX: ${this.minX.toFixed(2)}, maxX: ${this.maxX.toFixed(2)}, minY: ${this.minY.toFixed(2)}, maxY: ${this.maxY.toFixed(2)}, scaleX: ${this.scaleX.toFixed(2)}, scaleY: ${this.scaleY.toFixed(2)}`;
        const textX = 10;
        const textY = 20;

        this.ctx.font = "12px Arial";
        this.ctx.fillStyle = "#000000";
        this.ctx.fillText(valuesText, textX, textY);
    }

    clearGraph() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawAxes() {
        const ctx = this.ctx;
        const canvas = this.canvas;

        ctx.beginPath();
        ctx.strokeStyle = AXES_COLOR
        ctx.lineWidth = 2;

        if (this.maxY >= 0 && this.minY <= 0) {
            const yPos = this.maxY * this.scaleY;
            ctx.moveTo(0, yPos);
            ctx.lineTo(canvas.width, yPos);
        }

        if (this.maxX >= 0 && this.minX <= 0) {
            const xPos = -this.minX * this.scaleX;
            ctx.moveTo(xPos, 0);
            ctx.lineTo(xPos, canvas.height);
        }

        ctx.stroke();
        ctx.closePath();
    }

    drawTics(tics, axis) {
        const ctx = this.ctx;
        const canvas = this.canvas;

        ctx.beginPath();
        ctx.strokeStyle = TIC_LINE_COLOR
        ctx.lineWidth = 2;

        const ticLength = 20

        for (const [pos, label] of tics) {
                const [x, y] = this.coordinates2pixels(
                        axis === 'x' ? pos : axis === 'y' ? this.minX : 0,
                        axis === 'x' ? this.minY : axis === 'y' ? pos : 0
                )
                ctx.moveTo(x, y);
                ctx.lineTo(
                        axis === 'x' ? x : axis === 'y' ? x + ticLength : 0,
                        axis === 'x' ? y - ticLength: axis === 'y' ? y : 0,
                );
                ctx.save()
                ctx.translate(x, y);
                ctx.rotate(axis === 'x' ? -Math.PI/2: 0);
                ctx.font = "10px Arial";
                ctx.fillStyle = TIC_LABEL_COLOR
                ctx.fillText(
                        label,
                        axis === 'x' ? 10 : axis === 'y' ? ticLength + 5 : 0,
                        axis === 'x' ? -ticLength/2 : 0,
                );
                ctx.restore()
        }
        ctx.stroke();
        ctx.closePath();
    }

    drawGridlines() {
        const ctx = this.ctx;
        const canvas = this.canvas;

        ctx.beginPath();
        ctx.strokeStyle = GRID_LINES_COLOR;
        ctx.lineWidth = 1;

        for (const xpos of gridLinesData(this.minX, this.maxX, this.scaleX)) {
            ctx.moveTo(xpos, 0);
            ctx.lineTo(xpos, canvas.height);
        }

        for (const yPos of gridLinesData(this.minY, this.maxY, this.scaleY)) {
            ctx.moveTo(0, canvas.height - yPos);
            ctx.lineTo(canvas.width, canvas.height - yPos);
        }

        ctx.stroke();
        ctx.closePath();
    }

    coordinates2pixels(graphX, graphY) {
        const x = (graphX - this.minX) / (this.maxX - this.minX) * this.canvas.width
        const y = (1 - (graphY - this.minY) / (this.maxY - this.minY)) * this.canvas.height
        return [x, y]
    }

    drawData(data, color, chartType) {
        const ctx = this.ctx;
        const canvas = this.canvas;

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        let line_in_window = false, xPosPrev, yPosPrev, objects = []

        if (chartType === 'line') {
          for (const [x, y] of data) {
              const [xPos, yPos] = this.coordinates2pixels(x, y)
              if (y >= this.minY && y <= this.maxY) {
                if (line_in_window) {
                    ctx.lineTo(xPos, yPos);
                } else {
                    ctx.moveTo(xPosPrev, yPosPrev);
                    ctx.lineTo(xPos, yPos);
                    ctx.moveTo(xPos, yPos);
                    line_in_window = true
                }
              } else if (line_in_window) {
                  ctx.lineTo(xPos, yPos);
                line_in_window = false
              }
              xPosPrev = xPos;
              yPosPrev = yPos;
          }
        } else if (chartType === 'bar') {
          ctx.fillStyle = color;
          let bX, bY, bW = 25, bH
          for (const [x, y] of data) {
              const [xPos, yPos] = this.coordinates2pixels(x, y)
              bX = xPos - bW/2
              bY = yPos
              bH = this.canvas.height - Math.abs(yPos)
              ctx.fillRect(bX, bY, bW, bH);
              objects.push({'x': bX, 'y': bY, 'w': bW, 'h': bH})
          }
        }

        ctx.stroke();
        ctx.closePath();
        return objects
    }

}

function* gridLinesData(min, max, scale, grid_step=1) {
        let i = Math.ceil(min)
        let offset = Math.abs(i - min)
        while (i <= max) {
                yield offset * scale;
                offset += grid_step;
                i += grid_step;
        }
}
