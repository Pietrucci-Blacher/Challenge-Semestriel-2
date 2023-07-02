import Piece from '@/pieces/Piece.js';

export default class Knight extends Piece {
    constructor(board, color, row, col) {
        super('knight', 'K', board, color, row, col);
    }

    canMove(toRow, toCol) {
        const relativeCol = toCol - this.col;
        const relativeRow = toRow - this.row;

        return (
            (Math.abs(relativeRow) == 1 && Math.abs(relativeCol) == 2) ||
            (Math.abs(relativeRow) == 2 && Math.abs(relativeCol) == 1)
        );
    }
}
