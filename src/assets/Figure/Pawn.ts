import Position from '@/assets/interface/Position';
import Colour from '@/assets/enums/Colour';
import Player, * as PlayerModule from '@/assets/interface/Player';
import safeMoving from '@/assets/Figure/Scripts/safeMoving';
import Figure, * as FigureModule from '../interface/Figure';

export default class Pawn implements Figure {
  static includesInBoard(hor: number, per: number): boolean {
    return hor >= 0 && hor < 8 && per >= 0 && per < 8;
  }

  type: FigureModule.Types;

  colour: Colour;

  path: string;

  firstMove: boolean;

  possibleMoving: Position[];

  possibleBlocked: Position[];

  wrongColour: Colour;

  constructor(colour: Colour) {
    this.type = FigureModule.Types.pawn;
    this.colour = colour;
    this.path = this.generatorPath();
    this.firstMove = true;
    this.possibleMoving = [];
    this.possibleBlocked = [];
    if (this.colour === Colour.black) this.wrongColour = Colour.white;
    else this.wrongColour = Colour.black;
  }

  generatorPath(): string {
    return `/figures/${this.colour}/${this.type}.svg`;
  }

  callMove(posMoves: Position[], posBlock: Position[], board: Position[][],
    actualPosition: Position, per: number, checkingSecurity: boolean, king: Position): void {
    const perpendicularly = actualPosition.perpendicularly + per - 1;
    const horizontally = actualPosition.horizontally.charCodeAt(0) - 65;

    if (Pawn.includesInBoard(horizontally, perpendicularly)
    && board[perpendicularly][horizontally].figure === undefined) {
      if (!checkingSecurity
        || safeMoving(actualPosition, board[perpendicularly][horizontally], board, king, this)) {
        posMoves.push(board[perpendicularly][horizontally]);
      }
    } else {
      posBlock.push(board[perpendicularly][horizontally]);
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

  // eslint-disable-next-line class-methods-use-this
  possibleMoves(board: Position[][], actualPosition: Position,
    checkingSecurity: boolean, king: Position): void {
    const possibleMoves: Position[] = [];
    const possibleBlocks: Position[] = [];

    if (this.colour === Colour.white) {
      this.callMove(possibleMoves, possibleBlocks, board,
        actualPosition, 1, checkingSecurity, king);
      if (this.firstMove && possibleMoves.length > 0) {
        this.callMove(possibleMoves, possibleBlocks, board,
          actualPosition, 2, checkingSecurity, king);
      }
      this.callAttack(possibleMoves, board, actualPosition,
        1, 1, checkingSecurity, king);
      this.callAttack(possibleMoves, board, actualPosition, -1, 1, checkingSecurity, king);
    } else {
      this.callMove(possibleMoves, possibleBlocks, board,
        actualPosition, -1, checkingSecurity, king);
      if (this.firstMove && possibleMoves.length > 0) {
        this.callMove(possibleMoves, possibleBlocks, board,
          actualPosition, -2, checkingSecurity, king);
      }
      this.callAttack(possibleMoves, board, actualPosition, 1, -1, checkingSecurity, king);
      this.callAttack(possibleMoves, board,
        actualPosition, -1, -1, checkingSecurity, king);
    }

    this.possibleMoving = possibleMoves;
    this.possibleMoving.forEach((el) => {
      el.attackedBy.push(actualPosition);
    });
    this.possibleBlocked = possibleBlocks;
  }

  move(oldPosition: Position, newPosition: Position): FigureModule.MoveFigure {
    this.firstMove = false;
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
