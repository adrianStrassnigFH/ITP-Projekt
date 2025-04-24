import { GameLogic } from './core/game-logic.js'
import { Timer }      from './utils/timer.js'
import { renderGameBoard } from './ui/renderer.js'


class Game {
    constructor() {
        this.logic = null
        this.gameOver = false
        this.timer = new Timer('timer')
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
            const seconds = Math.floor((Date.now() - this.timer.startTime) / 1000)
            setTimeout(() => alert(`Verloren! Zeit: ${seconds}s`), 0)
            this.gameOver = true
            return
        }

        this.revealCell(x, y)

        if (this.checkWin()) {
            this.timer.stop()
            const seconds = Math.floor((Date.now() - this.timer.startTime) / 1000)
            setTimeout(() => alert(`Gewonnen in ${seconds}s`), 0)
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
