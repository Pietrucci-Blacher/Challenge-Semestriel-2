import Piece from '@/pieces/Piece.js';

export default class Rook extends Piece {
    constructor(board, color, row, col) {
        super('rook', 'R', board, color, row, col);
    }

    canMove(toRow, toCol) {
        const relativeCol = toCol - this.col;
        const relativeRow = toRow - this.row;

        return relativeCol === 0 || relativeRow === 0;
    }
}
