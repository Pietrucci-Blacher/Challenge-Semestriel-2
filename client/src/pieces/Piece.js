export default class Piece {
    color;
    row;
    col;
    board;
    name;
    notation;
    imageName;

    constructor(name, notation, board, color, row, col) {
        this.color = color;
        this.board = board;
        this.name = name;
        this.imageName = `${this.color}-${this.name}.svg`;
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
}
