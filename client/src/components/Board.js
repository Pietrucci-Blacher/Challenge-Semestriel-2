import { Pawn, Rook, Knight, Bishop, Queen, King } from '@/pieces/';

export default class ChessBoard {
    board;
    moveHistory;
    winner;
    move;

    constructor() {
        this.board = [];
        this.moveHistory = [];
        this.winner = null;
        this.move = 0;
        this.initBoard();
    }

    initBoard() {
        this.board[0] = [
            new Rook(this, 'black', 0, 0),
            new Knight(this, 'black', 0, 1),
            new Bishop(this, 'black', 0, 2),
            new King(this, 'black', 0, 3),
            new Queen(this, 'black', 0, 4),
            new Bishop(this, 'black', 0, 5),
            new Knight(this, 'black', 0, 6),
            new Rook(this, 'black', 0, 7),
        ];

        this.board[1] = [];
        for (let i = 0; i < 8; i++)
            this.board[1][i] = new Pawn(this, 'black', 1, i);

        for (let y = 2; y < 6; y++) {
            this.board[y] = [];
            for (let x = 0; x < 8; x++) this.board[y][x] = null;
        }

        this.board[6] = [];
        for (let i = 0; i < 8; i++)
            this.board[6][i] = new Pawn(this, 'white', 6, i);

        this.board[7] = [
            new Rook(this, 'white', 7, 0),
            new Knight(this, 'white', 7, 1),
            new Bishop(this, 'white', 7, 2),
            new Queen(this, 'white', 7, 3),
            new King(this, 'white', 7, 4),
            new Bishop(this, 'white', 7, 5),
            new Knight(this, 'white', 7, 6),
            new Rook(this, 'white', 7, 7),
        ];
    }

    addMoveToHistory(notation, fromX, fromY, toX, toY) {
        this.moveHistory.push({
            player: this.getTurn(),
            from: { x: fromX, y: fromY },
            to: { x: toX, y: toY },
            piece: notation,
        });
    }

    getPieceAt(x, y) {
        return this.board[y][x];
    }

    setPieceAt(x, y, piece) {
        this.board[y][x] = piece;
    }

    movePiece(fromX, fromY, toX, toY) {
        if (fromX === toX && fromY === toY) return false;

        const piece = this.getPieceAt(fromX, fromY);

        if (
            !piece ||
            piece.color !== this.getTurn() ||
            !piece.canMove(toX, toY)
        )
            return false;

        piece.setCoords(toX, toY);
        this.setPieceAt(toX, toY, piece);
        this.setPieceAt(fromX, fromY, null);
        this.addMoveToHistory(piece.notation, fromX, fromY, toX, toY);
        this.move++;

        return true;
    }

    getTurn() {
        return this.move % 2 === 0 ? 'white' : 'black';
    }

    // static convertToAlgebraicNotation(x, y) {
    //     return String.fromCharCode(97 + x) + (8 - y);
    // }
}
