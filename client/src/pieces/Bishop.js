import Piece from '@/pieces/Piece.js';

export default class Bishop extends Piece {
    constructor(board, color, row, col) {
        super('bishop', 'B', board, color, row, col);
    }

    canMove(toX, toY) {
        // TODO: Implement canMove() for Bishop
        return true;
    }
}
