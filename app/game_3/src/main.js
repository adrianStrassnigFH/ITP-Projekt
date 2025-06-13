import { Timer } from './utils/timer.js';
import { GameLogic } from './core/game-logic.js'

const select = document.getElementById('difficulty')
const resetBtn = document.getElementById('reset-button')
const timer = new Timer('timer')
const game = new GameLogic(parseInt(select.value, 10), timer)
window.scrollTo(0, 0);


timer.reset()

select.addEventListener('change', () => {
    game.setDifficulty(parseInt(select.value, 10))
    game.resetGame()
    timer.reset()
})

resetBtn.addEventListener('click', () => {
    game.resetGame()
    timer.reset()
})
