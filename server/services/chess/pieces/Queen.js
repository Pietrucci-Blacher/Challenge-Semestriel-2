import Piece from './Piece.js';

export default class Queen extends Piece {
    constructor(board, color, row, col) {
        super('queen', 'Q', board, color, row, col);
    }

    canMove(toRow, toCol) {
        const relativeCol = toCol - this.col;
        const relativeRow = toRow - this.row;

        return (
            relativeCol === 0 ||
            relativeRow === 0 ||
            Math.abs(relativeCol) === Math.abs(relativeRow)
        );
    }
}
