import Position, * as constructPos from '@/assets/interface/Position';
import Figure, * as FigureModule from '../interface/Figure';

export default class Pawn implements Figure {
  type: FigureModule.Types;

  color: FigureModule.Color;

  path: string;

  position: Position;

  firstMove: boolean;

  wrongColor: FigureModule.Color;

  constructor(color: FigureModule.Color, hor: string, per: number) {
    this.type = FigureModule.Types.pawn;
    this.color = color as FigureModule.Color;
    this.path = this.generatorPath();
    this.position = constructPos.createPosition(per, hor);
    this.firstMove = true;
    if (this.color === FigureModule.Color.white) this.wrongColor = FigureModule.Color.black;
    else this.wrongColor = FigureModule.Color.white;
  }

  generatorPath(): string {
    return `/figures/${this.color}/${this.type}.svg`;
  }

  callMove(possibleMoves: Position[], board: (Figure | undefined)[][], per: number) {
    // eslint-disable-next-line max-len
    const helpPosition = constructPos.createPosition(this.position.perpendicularly + per, this.position.horizontally);
    // eslint-disable-next-line max-len
    if (board[helpPosition.perpendicularly - 1][helpPosition.horizontally.charCodeAt(0) - 65] === undefined) {
      possibleMoves.push(helpPosition);
    }
  }

  callAttack(possibleMoves: Position[], board: (Figure | undefined)[][], hor: number, per: number) {
    // eslint-disable-next-line max-len
    const helpPosition: Position = constructPos.createPosition(this.position.perpendicularly + per, String.fromCharCode(this.position.horizontally.charCodeAt(0) + hor));
    // eslint-disable-next-line max-len
    if (board[helpPosition.perpendicularly - 1][helpPosition.horizontally.charCodeAt(0) - 65]?.color === this.wrongColor) {
      possibleMoves.push(helpPosition);
    }
  }

  possibleMoves(board: (Figure | undefined)[][]): Position[] {
    const possibleMoves: Position[] = [];

    if (this.color === FigureModule.Color.white) {
      this.callMove(possibleMoves, board, 1);
      if (this.firstMove && possibleMoves.length > 0) this.callMove(possibleMoves, board, 2);
      this.callAttack(possibleMoves, board, 1, 1);
      this.callAttack(possibleMoves, board, -1, 1);
    } else {
      this.callMove(possibleMoves, board, -1);
      if (this.firstMove && possibleMoves.length > 0) this.callMove(possibleMoves, board, -2);
      this.callAttack(possibleMoves, board, 1, -1);
      this.callAttack(possibleMoves, board, -1, -1);
    }

    return possibleMoves;
  }

  move(board: (Figure | undefined)[][], newPosition: Position): void {
    // eslint-disable-next-line max-len,no-param-reassign
    board[this.position.perpendicularly - 1][this.position.horizontally.charCodeAt(0) - 65] = undefined;
    // eslint-disable-next-line no-param-reassign
    board[newPosition.perpendicularly - 1][newPosition.horizontally.charCodeAt(0) - 65] = this;
    this.position = newPosition;
    this.firstMove = false;
  }
}
