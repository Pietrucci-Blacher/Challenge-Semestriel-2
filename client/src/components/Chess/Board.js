import { Pawn, Rook, Knight, Bishop, Queen, King } from '@/pieces/';
import Piece from '@/pieces/Piece';
import Cookie from 'js-cookie';

export default class ChessBoard {
    board;
    moveHistory;
    winner;
    move;
    static instance;
    socket;
    gameId;
    color;
    whitePlayer;
    blackPlayer;

    constructor() {
        this.gameId = null;
        this.color = 'white';
        this.whitePlayer = 'player1';
        this.blackPlayer = 'player2';
        this.setBoard();
    }

    connectToSocket(socket) {
        this.socket = socket;
    }

    disconnectFromSocket() {
        if (!this.socket) return;
        this.socket.disconnect();
        this.socket = null;
    }

    static getInstance() {
        if (!ChessBoard.instance) ChessBoard.instance = new ChessBoard();
        return ChessBoard.instance;
    }

    static destroyInstance() {
        ChessBoard.instance = null;
    }

    setBoard() {
        this.board = [];
        this.moveHistory = [];
        this.winner = null;
        this.move = 0;
        this.initBoard();
    }

    import(board) {
        this.board = board.board.map((row) =>
            row.map((piece) => Piece.create(this, piece)),
        );
        this.moveHistory = board.moveHistory;
        this.winner = board.winner;
        this.move = board.moveHistory.length;
    }

    export() {
        const board = this.board.map((row) =>
            row.map((piece) => (piece ? piece.export() : null)),
        );

        return {
            board,
            moveHistory: this.moveHistory,
            winner: this.winner,
        };
    }

    async initInfo() {
        let url = import.meta.env.VITE_ENDPOINT_BACK_URL;
        const response = await fetch(`${url}/game/${this.gameId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookie.get('userAccessToken')}`,
            },
        });

        const game = await response.json();

        const data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookie.get('userAccessToken')}`,
            },
        };

        const [meRes, whiteRes, blackRes] = await Promise.all([
            fetch(`${url}/users/me`, data),
            fetch(`${url}/users/${game.whiteUserId}`, data),
            fetch(`${url}/users/${game.blackUserId}`, data),
        ]);

        const [me, whitePlayer, blackPlayer] = await Promise.all([
            meRes.json(),
            whiteRes.json(),
            blackRes.json(),
        ]);

        this.whitePlayer = whitePlayer.username;
        this.blackPlayer = blackPlayer.username;
        this.color = game.whiteUserId === me.id ? 'white' : 'black';
    }

    initBoard() {
        for (let y = 0; y < 8; y++) {
            this.board[y] = [];
            for (let x = 0; x < 8; x++) this.board[y][x] = null;
        }

        new Rook(this, 'black', 0, 0);
        new Knight(this, 'black', 0, 1);
        new Bishop(this, 'black', 0, 2);
        new Queen(this, 'black', 0, 3);
        new King(this, 'black', 0, 4);
        new Bishop(this, 'black', 0, 5);
        new Knight(this, 'black', 0, 6);
        new Rook(this, 'black', 0, 7);

        for (let i = 0; i < 8; i++) new Pawn(this, 'black', 1, i);
        for (let i = 0; i < 8; i++) new Pawn(this, 'white', 6, i);

        new Rook(this, 'white', 7, 0);
        new Knight(this, 'white', 7, 1);
        new Bishop(this, 'white', 7, 2);
        new Queen(this, 'white', 7, 3);
        new King(this, 'white', 7, 4);
        new Bishop(this, 'white', 7, 5);
        new Knight(this, 'white', 7, 6);
        new Rook(this, 'white', 7, 7);
    }

    addMoveToHistory({
        pieceName,
        notation,
        takenPieceName = null,
        fromRow,
        fromCol,
        toRow,
        toCol,
    }) {
        this.moveHistory.push({
            player: this.getTurn(),
            from: { row: fromRow, col: fromCol },
            to: { row: toRow, col: toCol },
            pieceName,
            notation,
            takenPieceName,
        });
    }

    getPieceAt(row, col) {
        return this.board[row][col];
    }

    setPieceAt(row, col, piece) {
        this.board[row][col] = piece;
    }

    searchInHistory(name, color) {
        return this.moveHistory.find(
            (move) => move.pieceName === name && move.player === color,
        );
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

        if (destPiece?.color === piece.color || destPiece?.name === 'king')
            return false;

        let notation =
            piece.notation +
            (destPiece ? 'x' : '') +
            ChessBoard.convertToAlgebraic(toRow, toCol);

        if (piece.name === 'king' && Math.abs(fromCol - toCol) === 2) {
            if (
                this.isInCheck(piece.color) ||
                this.searchInHistory('king', piece.color)
            )
                return false;

            const dir = fromCol - toCol < 0 ? 1 : -1;
            const rook = this.getPieceAt(fromRow, dir === 1 ? 7 : 0);

            if (rook && rook.name === 'rook' && rook.color === piece.color)
                rook.setCoords(fromRow, fromCol + dir);

            notation = dir === 1 ? 'O-O' : 'O-O-O';
        }

        piece.setCoords(toRow, toCol);

        if (this.isInCheck(piece.color)) {
            piece.setCoords(fromRow, fromCol);
            if (destPiece) destPiece.setCoords(toRow, toCol, false);
            return false;
        }

        const move = {
            pieceName: piece.name,
            notation,
            fromRow,
            fromCol,
            toRow,
            toCol,
            takenPieceName: destPiece?.name || null,
        };

        this.addMoveToHistory(move);
        this.sendMoveToSocket(fromRow, fromCol, toRow, toCol);
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

    getKing(color) {
        for (const row of this.board) {
            const king = row.find(
                (piece) => piece?.name === 'king' && piece?.color === color,
            );

            if (king) return king;
        }

        return null;
    }

    isPieceCheck(piece, king) {
        return (
            piece &&
            piece.color !== king.color &&
            piece.canMove(king.row, king.col) &&
            this.trajectoryIsClear(piece.row, piece.col, king.row, king.col)
        );
    }

    isInCheck(color) {
        const king = this.getKing(color);

        if (!king) return false;

        for (const row of this.board)
            for (const piece of row)
                if (this.isPieceCheck(piece, king)) return true;

        return false;
    }

    getTurn() {
        return this.move % 2 === 0 ? 'white' : 'black';
    }

    sendMoveToSocket(fromRow, fromCol, toRow, toCol) {
        if (!this.socket) return;
        this.socket.emit('chessMove', {
            fromRow,
            fromCol,
            toRow,
            toCol,
        });
    }

    static convertToAlgebraic(row, col) {
        return String.fromCharCode(97 + col) + (8 - row);
    }

    static convertToCartesian(algebraic) {
        const col = algebraic.charCodeAt(0) - 97;
        const row = 8 - algebraic[1];
        return { row, col };
    }
}
