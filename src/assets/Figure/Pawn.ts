import Position from '@/assets/interface/Position';
import Colour from '@/assets/enums/Colour';
import safeMoving from '@/assets/Figure/Scripts/safeMoving';
import Types from '@/assets/enums/Types';
import Figure from '../interface/Figure';

export default class Pawn implements Figure {
  static includesInBoard(hor: number, per: number): boolean {
    return hor >= 0 && hor < 8 && per >= 0 && per < 8;
  }

  type: Types;

  colour: Colour;

  path: string;

  firstMove: boolean;

  possibleMoving: Position[];

  wrongColour: Colour;

  constructor(colour: Colour) {
    this.type = Types.pawn;
    this.colour = colour;
    this.path = this.generatorPath();
    this.firstMove = true;
    this.possibleMoving = [];
    if (this.colour === Colour.black) this.wrongColour = Colour.white;
    else this.wrongColour = Colour.black;
  }

  generatorPath(): string {
    return `/figures/${this.colour}/${this.type}.svg`;
  }

  callMove(posMoves: Position[], board: Position[][],
    actualPosition: Position, per: number, checkingSecurity: boolean, king: Position): void {
    const perpendicularly = actualPosition.perpendicularly + per - 1;
    const horizontally = actualPosition.horizontally.charCodeAt(0) - 65;

    if (Pawn.includesInBoard(horizontally, perpendicularly)
    && board[perpendicularly][horizontally].figure === undefined) {
      if (!checkingSecurity
        || safeMoving(actualPosition, board[perpendicularly][horizontally], board, king, this)) {
        posMoves.push(board[perpendicularly][horizontally]);
      }
    }
  }

  callAttack(posMoves: Position[], board: Position[][],
    actualPosition: Position, hor: number, per: number,
    checkingSecurity: boolean, king: Position): void {
    const perpendicularly = actualPosition.perpendicularly + per - 1;
    const horizontally = actualPosition.horizontally.charCodeAt(0) - 65 + hor;

    if (Pawn.includesInBoard(horizontally, perpendicularly)
      && board[perpendicularly][horizontally].figure?.colour === this.wrongColour) {
      if (!checkingSecurity
        || safeMoving(actualPosition, board[perpendicularly][horizontally], board, king, this)) {
        posMoves.push(board[perpendicularly][horizontally]);
      }
    }
  }

  possibleMoves(board: Position[][], actualPosition: Position,
    checkingSecurity: boolean, king: Position): void {
    const possibleMoves: Position[] = [];

    if (this.colour === Colour.white) {
      this.callMove(possibleMoves, board, actualPosition, 1, checkingSecurity, king);
      if (this.firstMove && possibleMoves.length > 0) {
        this.callMove(possibleMoves, board, actualPosition, 2, checkingSecurity, king);
      }
      this.callAttack(possibleMoves, board, actualPosition,
        1, 1, checkingSecurity, king);
      this.callAttack(possibleMoves, board, actualPosition, -1, 1, checkingSecurity, king);
    } else {
      this.callMove(possibleMoves, board, actualPosition, -1, checkingSecurity, king);
      if (this.firstMove && possibleMoves.length > 0) {
        this.callMove(possibleMoves, board, actualPosition, -2, checkingSecurity, king);
      }
      this.callAttack(possibleMoves, board, actualPosition, 1, -1, checkingSecurity, king);
      this.callAttack(possibleMoves, board,
        actualPosition, -1, -1, checkingSecurity, king);
    }

    this.possibleMoving = possibleMoves;
    this.possibleMoving.forEach((el) => {
      if (el.attackedBy.findIndex((elem) => elem === actualPosition) === -1) {
        el.attackedBy.push(actualPosition);
      }
    });
  }

  move(oldPosition: Position, newPosition: Position): void {
    this.firstMove = false;
    // eslint-disable-next-line no-param-reassign
    oldPosition.figure = undefined;
    // eslint-disable-next-line no-param-reassign
    newPosition.figure = this;
  }
}
