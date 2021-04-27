import Position, * as constructPos from '@/assets/interface/Position';
import Figure, * as FigureModule from '../interface/Figure';

function includesInBoard(hor: number, per: number): boolean {
  return hor >= 65 && hor <= 72 && per >= 1 && per <= 8;
}

export default class Bishop implements Figure {
  type: FigureModule.Types;

  color: FigureModule.Color;

  path: string;

  position: Position;

  wrongColor: FigureModule.Color;

  constructor(color: FigureModule.Color, hor: string, per: number) {
    this.type = FigureModule.Types.bishop;
    this.color = color as FigureModule.Color;
    this.path = this.generatorPath();
    this.position = constructPos.createPosition(per, hor);
    if (this.color === FigureModule.Color.white) this.wrongColor = FigureModule.Color.black;
    else this.wrongColor = FigureModule.Color.white;
  }

  generatorPath(): string {
    return `/figures/${this.color}/${this.type}.svg`;
  }

  // eslint-disable-next-line max-len
  lineOnBoard(possibleMoves: Position[], board: (Figure | undefined)[][], per: number, hor: number) {
    // eslint-disable-next-line max-len
    let helpPosition: Position = constructPos.createPosition(this.position.perpendicularly + per, String.fromCharCode(this.position.horizontally.charCodeAt(0) + hor));
    while (includesInBoard(helpPosition.horizontally.charCodeAt(0), helpPosition.perpendicularly)
    // eslint-disable-next-line max-len
      && board[helpPosition.perpendicularly - 1][helpPosition.horizontally.charCodeAt(0) - 65] === undefined) {
      possibleMoves.push(helpPosition);
      // eslint-disable-next-line max-len
      helpPosition = constructPos.createPosition(helpPosition.perpendicularly + per, String.fromCharCode(helpPosition.horizontally.charCodeAt(0) + hor));
    }
    // eslint-disable-next-line max-len
    if (board?.[helpPosition.perpendicularly - 1]?.[helpPosition.horizontally.charCodeAt(0) - 65]?.color === this.wrongColor) {
      possibleMoves.push(helpPosition);
    }
  }

  possibleMoves(board: (Figure | undefined)[][]): Position[] {
    const possibleMoves: Position[] = [];
    // constructPos.createPosition(this.position.perpendicularly + 1, this.position.horizontally),

    this.lineOnBoard(possibleMoves, board, 1, 1);
    this.lineOnBoard(possibleMoves, board, 1, -1);
    this.lineOnBoard(possibleMoves, board, -1, 1);
    this.lineOnBoard(possibleMoves, board, -1, -1);

    return possibleMoves;
  }

  move(board: (Figure | undefined)[][], newPosition: Position): void {
    // eslint-disable-next-line max-len,no-param-reassign
    board[this.position.perpendicularly - 1][this.position.horizontally.charCodeAt(0) - 65] = undefined;
    // eslint-disable-next-line no-param-reassign
    board[newPosition.perpendicularly - 1][newPosition.horizontally.charCodeAt(0) - 65] = this;
    this.position = newPosition;
  }
}
