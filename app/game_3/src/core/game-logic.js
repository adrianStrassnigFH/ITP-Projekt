import { RenderBoard } from '../ui/renderer.js';

export class GameLogic {
    brickRowCount = 5;
    brickColumnCount = 5;
    brickWidth = 75;
    brickHeight = 20;
    brickPadding = 20;
    brickOffset = 30;
    paddleWidth = 75;
    paddleHeight = 10;

    constructor(difficulty = 1, timer) {
        this.difficulty = difficulty;
        this.timer = timer;
        this.renderer = new RenderBoard('mycanvas');
        this.resizeCanvas();
        this.applyDifficulty();
        this.startX = this.canvasWidth / 2;
        this.startY = this.canvasHeight - this.paddleHeight - this.ballRadius - 10;
        this.initBricks();
        this.resetGame();
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.renderer.canvas.addEventListener('click', () => {
            if (!this.isStarted) {
                this.isStarted = true;
                if (!this.hasTimerStarted) {
                    this.timer.start();
                    this.hasTimerStarted = true;
                }
                this.dx = this.initialSpeed;
                this.dy = -this.initialSpeed;
            }
        });
        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);
    }

    resizeCanvas() {
        const w = this.brickRowCount * (this.brickWidth + this.brickPadding) + this.brickOffset * 2;
        const h = Math.round(w * 0.9);
        this.renderer.canvas.width = w;
        this.renderer.canvas.height = h;
        this.canvasWidth = w;
        this.canvasHeight = h;
    }

    applyDifficulty() {
        if (this.difficulty === 2) {
            this.ballRadius = 7;
            this.initialSpeed = 2;
            this.maxLives = 3;
        } else if (this.difficulty === 3) {
            this.ballRadius = 7;
            this.initialSpeed = 2;
            this.maxLives = 1;
        } else {
            this.ballRadius = 10;
            this.initialSpeed = 2;
            this.maxLives = 3;
        }
    }

    initBricks() {
        this.bricks = [];
        for (let c = 0; c < this.brickColumnCount; c++) {
            this.bricks[c] = [];
            for (let r = 0; r < this.brickRowCount; r++) {
                this.bricks[c][r] = { x: 0, y: 0, status: true };
            }
        }
    }

    resetBall() {
        this.ballX = this.startX;
        this.ballY = this.startY;
        this.dx = 0;
        this.dy = 0;
        this.paddleX = (this.canvasWidth - this.paddleWidth) / 2;
        this.isStarted = false;
    }

    resetGame() {
        this.applyDifficulty();
        this.score = 0;
        this.lives = this.maxLives;
        this.initBricks();
        this.resetBall();
        this.hasTimerStarted = false;
        this.timer.reset();
    }

    setDifficulty(level) {
        this.difficulty = level;
        this.resetGame();
    }

    handleMouseMove(e) {
        const rect = this.renderer.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x > 0 && x < this.canvasWidth) {
            this.paddleX = x - this.paddleWidth / 2;
        }
    }

    loop() {
        if (this.isStarted) {
            this.ballX += this.dx;
            this.ballY += this.dy;
        }
        this.updateCollisions();
        this.render();
        requestAnimationFrame(this.loop);
    }

    updateCollisions() {
        if (!this.isStarted) return;
        if (this.ballX < this.ballRadius || this.ballX > this.canvasWidth - this.ballRadius) {
            this.dx = -this.dx;
        }
        if (this.ballY < this.ballRadius) {
            this.dy = -this.dy;
        }
        if (this.ballY > this.canvasHeight - this.ballRadius) {
            if (this.ballX > this.paddleX && this.ballX < this.paddleX + this.paddleWidth) {
                const rel = (this.ballX - (this.paddleX + this.paddleWidth / 2)) / (this.paddleWidth / 2);
                const angle = rel * (Math.PI / 3);
                const speed = Math.hypot(this.dx, this.dy);
                this.dx = speed * Math.sin(angle);
                this.dy = -speed * Math.cos(angle);
            } else {
                this.lives--;
                if (this.lives === 0) {
                    this.timer.stop();
                    const elapsed = Math.floor((Date.now() - this.timer.startTime) / 1000);
                    // alert(`Game Over! Time: ${elapsed}s`);
                    showNotification(`Game Over! Time: ${elapsed}s`,'error' );
                    // insert score into database
                    getLoginStatus().then(data => {
                        if(data.status){
                            uploadScore(data.userID,3,this.difficulty-1,this.score);
                        }
                    });
                   window.location.reload();
                } else {
                    this.resetBall();
                }
            }
        }
        for (let c = 0; c < this.bricks.length; c++) {
            for (let r = 0; r < this.bricks[c].length; r++) {
                const b = this.bricks[c][r];
                if (!b.status) continue;
                if (
                    this.ballX > b.x &&
                    this.ballX < b.x + this.brickWidth &&
                    this.ballY > b.y &&
                    this.ballY < b.y + this.brickHeight
                ) {
                    this.dy = -this.dy;
                    b.status = false;
                    this.score++;
                    if (this.score === this.brickRowCount * this.brickColumnCount) {
                        this.timer.stop();
                        const elapsed = Math.floor((Date.now() - this.timer.startTime) / 1000);
                        // alert(`You Win! Time: ${elapsed}s`);
                        showNotification(`You Win! Time: ${elapsed}`, 'success');
                         console.log("Inserting data in db");
                        getLoginStatus().then(data => {
                            if(data.status){
                                uploadScore(data.userID,3,this.difficulty-1,this.score);
                            }
                        });
                        window.location.reload();
                    }
                }
            }
        }
    }

    render() {
        this.renderer.clear();
        this.renderer.drawBricks(
            this.bricks,
            this.brickWidth,
            this.brickHeight,
            this.brickPadding,
            this.brickOffset
        );
        this.renderer.drawBall(this.ballX, this.ballY, this.ballRadius);
        this.renderer.drawPaddle(
            this.paddleX,
            this.canvasHeight,
            this.paddleHeight,
            this.paddleWidth
        );
        document.getElementById('score').textContent = this.score;
        document.getElementById('lives').textContent = this.lives;
    }
}
