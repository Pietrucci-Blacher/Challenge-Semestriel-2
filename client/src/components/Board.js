import { Pawn, Rook, Knight, Bishop, Queen, King } from '@/pieces/';

export default class ChessBoard {
    board;
    moveHistory;
    winner;
    move;
    static instance;

    constructor() {
        this.board = [];
        this.moveHistory = [];
        this.winner = null;
        this.move = 0;
        this.initBoard();
    }

    static getInstance() {
        if (!ChessBoard.instance) ChessBoard.instance = new ChessBoard();
        return ChessBoard.instance;
    }

    initBoard() {
        this.board[0] = [
            new Rook(this, 'black', 0, 0),
            new Knight(this, 'black', 0, 1),
            new Bishop(this, 'black', 0, 2),
            new Queen(this, 'black', 0, 3),
            new King(this, 'black', 0, 4),
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

    addMoveToHistory(notation, fromRow, fromCol, toRow, toCol, taken = null) {
        this.moveHistory.push({
            player: this.getTurn(),
            from: { row: fromRow, col: fromCol },
            to: { row: toRow, col: toCol },
            piece: notation,
            taken,
        });
    }

    getPieceAt(row, col) {
        return this.board[row][col];
    }

    setPieceAt(row, col, piece) {
        this.board[row][col] = piece;
    }

    movePiece(fromRow, fromCol, toRow, toCol) {
        if (fromRow === toRow && fromCol === toCol) return false;

        const piece = this.getPieceAt(fromRow, fromCol);

        if (
            !piece ||
            piece.color !== this.getTurn() ||
            !piece.canMove(toRow, toCol) ||
            !this.trajectoryIsClear(fromRow, fromCol, toRow, toCol)
        )
            return false;

        const destPiece = this.getPieceAt(toRow, toCol);

        if (destPiece && destPiece.color === piece.color) return false;

        piece.setCoords(toRow, toCol);
        this.setPieceAt(toRow, toCol, piece);
        this.setPieceAt(fromRow, fromCol, null);
        this.addMoveToHistory(
            piece.notation,
            fromRow,
            fromCol,
            toRow,
            toCol,
            destPiece?.name || null,
        );
        this.move++;

        return true;
    }

    trajectoryIsClear(fromRow, fromCol, toRow, toCol) {
        const piece = this.getPieceAt(fromRow, fromCol);

        if (!piece) return false;
        if (piece.name === 'knight') return true;

        const relativeRow = toRow - fromRow;
        const relativeCol = toCol - fromCol;
        const dirRow = relativeRow < 0 ? -1 : relativeRow > 0 ? 1 : 0;
        const dirCol = relativeCol < 0 ? -1 : relativeCol > 0 ? 1 : 0;

        for (
            let i = 1;
            i < Math.abs(relativeRow) || i < Math.abs(relativeCol);
            i++
        ) {
            const row = fromRow + i * dirRow;
            const col = fromCol + i * dirCol;
            if (this.getPieceAt(row, col)) return false;
        }

        return true;
    }

    getTurn() {
        return this.move % 2 === 0 ? 'white' : 'black';
    }

    static convertToAlgebraic(x, y) {
        return String.fromCharCode(97 + x) + (8 - y);
    }

    static convertToCartesian(algebraic) {
        const col = algebraic.charCodeAt(0) - 97;
        const row = 8 - algebraic[1];
        return { row, col };
    }
}
