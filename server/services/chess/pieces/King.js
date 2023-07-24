import Piece from './Piece.js';

export default class King extends Piece {
    constructor(board, color, row, col) {
        super('king', 'K', board, color, row, col);
    }

    canMove(toRow, toCol) {
        const relativeCol = toCol - this.col;
        const relativeRow = toRow - this.row;

        return (
            (Math.abs(relativeRow) <= 1 && Math.abs(relativeCol) <= 1) ||
            (Math.abs(relativeRow) === 0 && Math.abs(relativeCol) === 2)
        );
    }
}
