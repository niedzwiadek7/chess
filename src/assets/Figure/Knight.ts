import Position from '@/assets/interface/Position';
import Colour from '@/assets/enums/Colour';
import Figure, * as FigureModule from '../interface/Figure';

export default class Knight implements Figure {
  static includesInBoard(hor: number, per: number): boolean {
    return hor >= 0 && hor < 8 && per >= 0 && per < 8;
  }

  type: FigureModule.Types;

  colour: Colour;

  path: string;

  possibleMoving: Position[];

  possibleBlocked: Position[];

  wrongColour: Colour;

  constructor(colour: Colour) {
    this.type = FigureModule.Types.knight;
    this.colour = colour;
    this.path = this.generatorPath();
    this.possibleMoving = [];
    this.possibleBlocked = [];
    if (this.colour === Colour.white) this.wrongColour = Colour.black;
    else this.wrongColour = Colour.white;
  }

  generatorPath(): string {
    return `/figures/${this.colour}/${this.type}.svg`;
  }

  callMove(posMoves: Position[], board: Position[][],
    actualPosition: Position, hor: number, per: number): void {
    const perpendicularly = actualPosition.perpendicularly + per - 1;
    const horizontally = actualPosition.horizontally.charCodeAt(0) - 65 + hor;

    if (Knight.includesInBoard(horizontally, perpendicularly)
      && (board[perpendicularly][horizontally].figure?.colour === this.wrongColour
      || board[perpendicularly][horizontally].figure === undefined)) {
      posMoves.push(board[perpendicularly][horizontally]);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  possibleMoves(board: Position[][], actualPosition: Position): void {
    const posMoves: Position[] = [];

    this.callMove(posMoves, board, actualPosition, 1, 2);
    this.callMove(posMoves, board, actualPosition, 2, 1);
    this.callMove(posMoves, board, actualPosition, -1, 2);
    this.callMove(posMoves, board, actualPosition, 2, -1);
    this.callMove(posMoves, board, actualPosition, 1, -2);
    this.callMove(posMoves, board, actualPosition, -2, 1);
    this.callMove(posMoves, board, actualPosition, -1, -2);
    this.callMove(posMoves, board, actualPosition, -2, -1);

    this.possibleMoving = posMoves;
  }

  move(oldPosition: Position, newPosition: Position): FigureModule.MoveFigure {
    // eslint-disable-next-line no-param-reassign
    oldPosition.figure = undefined;
    // eslint-disable-next-line no-param-reassign
    newPosition.figure = this;

    return {
      oldPosition,
      newPosition,
    };
  }
}
