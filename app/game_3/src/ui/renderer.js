export class RenderBoard {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        this.brickColor = '#FFA500';
        this.elementColor = '#dd00dd';
        this.backgroundColor = '#1a1a1a';
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = this.elementColor;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBricks(bricks, bw, bh, pad, off) {
        this.ctx.fillStyle = this.brickColor;
        for (let c = 0; c < bricks.length; c++) {
            for (let r = 0; r < bricks[c].length; r++) {
                const b = bricks[c][r];
                if (!b.status) continue;
                const x = r * (bw + pad) + off;
                const y = c * (bh + pad) + off;
                b.x = x; b.y = y;
                this.ctx.fillRect(x, y, bw, bh);
            }
        }
        this.ctx.strokeStyle = '#dd00dd';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBall(x, y, r) {
        this.ctx.fillStyle = this.elementColor;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawPaddle(px, ch, ph, pw) {
        this.ctx.fillStyle = this.elementColor;
        this.ctx.fillRect(px, ch - ph, pw, ph);
    }
}

