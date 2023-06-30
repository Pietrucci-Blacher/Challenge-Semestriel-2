import Piece from '@/pieces/Piece.js';

export default class Rook extends Piece {
    constructor(board, color, row, col) {
        super('rook', 'R', board, color, row, col);
    }

    canMove(toX, toY) {
        // TODO: Implement canMove() for Rook
        return true;
    }
}
