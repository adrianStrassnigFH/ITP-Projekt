export function renderGameBoard(matrix, callbacks) {

    const gameElement = document.getElementById('game');
    gameElement.innerHTML = '';
    gameElement.style.maxWidth = `${50 * matrix[0].length}px`;

    matrix.forEach(row => {
        row.forEach(cell => {
            const cellElement = document.createElement('div');
            cellElement.className = 'box initial';

            if (cell.isOpened) {
                cellElement.classList.remove('initial');
                cellElement.classList.add('opened');
                if (cell.isBomb) {
                    cellElement.textContent = '💣';
                } else if (cell.adjacentMines > 0) {
                    cellElement.textContent = cell.adjacentMines;
                    cellElement.classList.add(`bomb-count-${cell.adjacentMines}`);
                }
            }

            if (cell.isFlagged) {
                cellElement.textContent = '🚩';
            }

            cellElement.addEventListener('click', () => callbacks.onCellClick(cell.x, cell.y));
            cellElement.addEventListener('contextmenu', e => {
                e.preventDefault();
                callbacks.onRightClick(cell.x, cell.y);
            });

            gameElement.appendChild(cellElement);
        });
    });
}