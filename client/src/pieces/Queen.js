import Piece from '@/pieces/Piece.js';

export default class Queen extends Piece {
    constructor(board, color, row, col) {
        super('queen', 'Q', board, color, row, col);
    }

    canMove(toX, toY) {
        // TODO: Implement canMove() for Queen
        return true;
    }
}
