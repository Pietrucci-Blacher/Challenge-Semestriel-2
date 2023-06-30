import Piece from '@/pieces/Piece.js';

export default class King extends Piece {
    constructor(board, color, row, col) {
        super('king', 'K', board, color, row, col);
    }

    canMove(toX, toY) {
        // TODO: Implement canMove() for King
        return true;
    }
}
