import Piece from '@/pieces/Piece.js';

export default class Pawn extends Piece {
    constructor(board, color, row, col) {
        super('pawn', '', board, color, row, col);
    }

    canMove(toRow, toCol) {
        const relativeCol = toCol - this.col;
        const relativeRow = toRow - this.row;
        const moveDirection = this.color === 'white' ? -1 : 1;
        const firstWhiteMove = this.row === 6 && this.color === 'white' ? 2 : 1;
        const firstBlackMove = this.row === 1 && this.color === 'black' ? 2 : 1;
        const pieceAtDestination = this.board.getPieceAt(toRow, toCol);

        return (
            ((relativeCol === 1 || relativeCol === -1) &&
                relativeRow === moveDirection &&
                pieceAtDestination) ||
            (relativeCol === 0 &&
                (relativeRow === firstWhiteMove * moveDirection ||
                    relativeRow === firstBlackMove * moveDirection) &&
                !pieceAtDestination)
        );
    }
}
