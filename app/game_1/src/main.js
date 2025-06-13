import { GameLogic } from './core/game-logic.js'
import { Timer }      from './utils/timer.js'
import { renderGameBoard } from './ui/renderer.js'

class Game {
    constructor() {
        this.logic = null
        this.gameOver = false
        this.timer = new Timer('timer')
        window.scrollTo(0, 0);
        this.init()
    }

    init() {
        document.getElementById('reset-button')
            .addEventListener('click', () => this.reset())
        document.getElementById('field-size')
            .addEventListener('change', () => this.reset())
        this.reset()
    }

    reset() {
        const size = +document.getElementById('field-size').value
        this.logic = new GameLogic(size, size, Math.floor(size * size * 0.15))
        this.logic.initMatrix()
        this.gameOver = false
        this.timer.reset()
        switch(size){
            case 8:
                this.difficulty = 0;
                break;
            case 12:
                this.difficulty = 1;
                break;
            case 16:
                this.difficulty = 2;
                break;
            default:
                this.difficulty = null;
                break;
        }

        renderGameBoard(this.logic.matrix, {
            onCellClick: (x, y) => this.handleClick(x, y),
            onRightClick: (x, y) => this.handleRightClick(x, y)
        })
    }

    handleClick(x, y) {
        if (this.gameOver) return
        if (!this.timer.startTime) {
            this.timer.start()
            this.logic.placeBombsSafe(x, y)
            this.logic.calculateAdjacentMines()
            renderGameBoard(this.logic.matrix, {
                onCellClick: (x, y) => this.handleClick(x, y),
                onRightClick: (x, y) => this.handleRightClick(x, y)
            })
        }

        const cell = this.logic.matrix[y][x]
        if (cell.isFlagged) return

        if (cell.isBomb) {
            this.revealAll()
            this.timer.stop()
            const seconds = Math.floor((Date.now() - this.timer.startTime) / 1000);
            showNotification(`Verloren! Zeit: ${seconds}s`, Type.LOSE);
            this.gameOver = true
            return
        }

        this.revealCell(x, y)

        if (this.checkWin()) {
            this.timer.stop()
            const seconds = Math.floor((Date.now() - this.timer.startTime) / 1000)
            let score = seconds > 0 ? Math.floor(500/seconds)  : 500;
            showNotification(`Score: ${score}`, Type.SUCCESS);
            getLoginStatus().then(data => {
                    if(data.status){
                        uploadScore(data.userID,1,this.difficulty,score);
                    }
                }
            );

            this.gameOver = true
        }
    }

    handleRightClick(x, y) {
        const cell = this.logic.matrix[y][x]
        if (!cell.isOpened) {
            cell.isFlagged = !cell.isFlagged
            renderGameBoard(this.logic.matrix, {
                onCellClick: (x, y) => this.handleClick(x, y),
                onRightClick: (x, y) => this.handleRightClick(x, y)
            })
        }
    }

    revealCell(x, y) {
        const cell = this.logic.matrix[y][x]
        cell.isOpened = true
        if (cell.adjacentMines === 0) {
            this.logic.getAdjacentCells(x, y)
                .forEach(n => {
                    if (!n.isOpened && !n.isFlagged) this.revealCell(n.x, n.y)
                })
        }
        renderGameBoard(this.logic.matrix, {
            onCellClick: (x, y) => this.handleClick(x, y),
            onRightClick: (x, y) => this.handleRightClick(x, y)
        })
    }

    checkWin() {
        return this.logic.matrix.flat().every(c => c.isOpened || c.isBomb)
    }

    revealAll() {
        this.logic.matrix.flat().forEach(c => c.isOpened = true)
        renderGameBoard(this.logic.matrix, {
            onCellClick: () => {},
            onRightClick: () => {}
        })
    }
}

new Game()