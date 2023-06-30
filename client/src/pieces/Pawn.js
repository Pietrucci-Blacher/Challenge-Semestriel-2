import Piece from '@/pieces/Piece.js';

export default class Pawn extends Piece {
    constructor(board, color, row, col) {
        super('pawn', '', board, color, row, col);
    }

    canMove(toX, toY) {
        // TODO: Implement canMove() for Pawn
        return true;
    }
}
