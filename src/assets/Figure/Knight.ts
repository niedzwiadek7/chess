import Position, * as constructPos from '@/assets/interface/Position';
import Figure, * as FigureModule from '../interface/Figure';

function includesInBoard(hor: number, per: number): boolean {
  return hor >= 65 && hor <= 72 && per >= 1 && per <= 8;
}

export default class Knight implements Figure {
  type: FigureModule.Types;

  color: FigureModule.Color;

  path: string;

  position: Position;

  wrongColor: FigureModule.Color;

  constructor(color: FigureModule.Color, hor: string, per: number) {
    this.type = FigureModule.Types.knight;
    this.color = color as FigureModule.Color;
    this.path = this.generatorPath();
    this.position = constructPos.createPosition(per, hor);
    if (this.color === FigureModule.Color.white) this.wrongColor = FigureModule.Color.black;
    else this.wrongColor = FigureModule.Color.white;
  }

  generatorPath(): string {
    return `/figures/${this.color}/${this.type}.svg`;
  }

  callMove(possibleMoves: Position[], board: (Figure | undefined)[][], per: number, hor: number) {
    // eslint-disable-next-line max-len
    const helpPosition: Position = constructPos.createPosition(this.position.perpendicularly + per, String.fromCharCode(this.position.horizontally.charCodeAt(0) + hor));
    if (includesInBoard(helpPosition.horizontally.charCodeAt(0), helpPosition.perpendicularly)
      // eslint-disable-next-line max-len
      && (board[helpPosition.perpendicularly - 1][helpPosition.horizontally.charCodeAt(0) - 65] === undefined
      // eslint-disable-next-line max-len
      || board[helpPosition.perpendicularly - 1][helpPosition.horizontally.charCodeAt(0) - 65]?.color === this.wrongColor)) {
      possibleMoves.push(helpPosition);
    }
  }

  possibleMoves(board: (Figure | undefined)[][]): Position[] {
    const possibleMoves: Position[] = [];
    // constructPos.createPosition(this.position.perpendicularly + 1, this.position.horizontally),

    this.callMove(possibleMoves, board, 2, 1);
    this.callMove(possibleMoves, board, 1, 2);
    this.callMove(possibleMoves, board, -2, 1);
    this.callMove(possibleMoves, board, -1, 2);
    this.callMove(possibleMoves, board, 2, -1);
    this.callMove(possibleMoves, board, 1, -2);
    this.callMove(possibleMoves, board, -2, -1);
    this.callMove(possibleMoves, board, -1, -2);

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
