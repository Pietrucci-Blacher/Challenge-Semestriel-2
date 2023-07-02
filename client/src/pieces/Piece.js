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
        this.setCoords(row, col);
    }

    setCoords(row, col) {
        this.row = row;
        this.col = col;
    }

    convertToAlgebraic() {
        const col = String.fromCharCode(this.col + 97);
        const row = 8 - this.row;
        return `${col}${row}`;
    }
}
