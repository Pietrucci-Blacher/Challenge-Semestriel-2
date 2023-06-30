import Piece from '@/pieces/Piece.js';

export default class Knight extends Piece {
    constructor(board, color, row, col) {
        super('knight', 'K', board, color, row, col);
    }

    canMove(toX, toY) {
        // TODO: Implement canMove() for Knight
        return true;
    }
}
