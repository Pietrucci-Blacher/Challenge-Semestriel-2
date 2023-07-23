import { Pawn, Rook, Knight, Bishop, Queen, King } from './index.js';

export default class Piece {
    color;
    row;
    col;
    board;
    name;
    notation;

    constructor(name, notation, board, color, row, col) {
        this.color = color;
        this.board = board;
        this.name = name;
        this.notation = notation;
        this.setCoords(row, col, false);
    }

    setCoords(row, col, move = true) {
        this.board.setPieceAt(row, col, this);
        if (move) this.board.setPieceAt(this.row, this.col, null);

        this.row = row;
        this.col = col;
    }

    getAlgebraicCoords() {
        const col = String.fromCharCode(this.col + 97);
        const row = 8 - this.row;
        return `${col}${row}`;
    }

    export() {
        return {
            color: this.color,
            row: this.row,
            col: this.col,
            name: this.name,
        };
    }

    static create(board, piece) {
        if (!piece) return null;

        const { name, color, row, col } = piece;

        switch (name) {
            case 'pawn':
                return new Pawn(board, color, row, col);
            case 'rook':
                return new Rook(board, color, row, col);
            case 'knight':
                return new Knight(board, color, row, col);
            case 'bishop':
                return new Bishop(board, color, row, col);
            case 'queen':
                return new Queen(board, color, row, col);
            case 'king':
                return new King(board, color, row, col);
            default:
                return null;
        }
    }
}
