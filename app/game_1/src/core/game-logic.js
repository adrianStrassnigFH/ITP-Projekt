export class GameLogic {
    constructor(width, height, bombCount) {
        this.width = width
        this.height = height
        this.bombCount = bombCount
        this.matrix = []
    }

    initMatrix() {
        this.matrix = Array.from({ length: this.height }, (_, y) =>
            Array.from({ length: this.width }, (_, x) => ({
                isBomb: false,
                isOpened: false,
                isFlagged: false,
                adjacentMines: 0,
                x, y
            }))
        )
    }

    placeBombsSafe(firstX, firstY) {
        const forbidden = new Set(
            this.getAdjacentCells(firstX, firstY)
                .concat([{ x: firstX, y: firstY }])
                .map(c => `${c.x},${c.y}`)
        )
        const cells = []
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (!forbidden.has(`${x},${y}`)) cells.push({ x, y })
            }
        }
        for (let i = 0; i < this.bombCount; i++) {
            const idx = Math.floor(Math.random() * cells.length)
            const { x, y } = cells.splice(idx, 1)[0]
            this.matrix[y][x].isBomb = true
        }
    }

    calculateAdjacentMines() {
        this.matrix.forEach(row =>
            row.forEach(cell => {
                if (!cell.isBomb) {
                    cell.adjacentMines = this.getAdjacentCells(cell.x, cell.y)
                        .filter(n => n.isBomb).length
                }
            })
        )
    }

    getAdjacentCells(x, y) {
        const neighbors = []
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue
                const nx = x + dx, ny = y + dy
                if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
                    neighbors.push(this.matrix[ny][nx])
                }
            }
        }
        return neighbors
    }
}
