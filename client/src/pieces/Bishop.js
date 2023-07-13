import Piece from '@/pieces/Piece.js';

export default class Bishop extends Piece {
    constructor(board, color, row, col) {
        super('bishop', 'B', board, color, row, col);
    }

    canMove(toRow, toCol) {
        const relativeCol = toCol - this.col;
        const relativeRow = toRow - this.row;

        return Math.abs(relativeRow) == Math.abs(relativeCol);
    }
}
