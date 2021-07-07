import Position from '@/assets/interface/Position';
import Colour from '@/assets/enums/Colour';
import safeMoving from '@/assets/Figure/Scripts/safeMoving';
import possibleMoves from '@/assets/Figure/Scripts/SingleMove';
import Types from '@/assets/enums/Types';
import RecordMove from '@/assets/class/RecordMove';
import Figure from '../interface/Figure';

export default class King implements Figure {
  type: Types;

  colour: Colour;

  path: string;

  possibleMoving: Position[];

  firstMove: boolean;

  name: string;

  constructor(colour: Colour) {
    this.type = Types.king;
    this.colour = colour;
    this.path = this.generatorPath();
    this.possibleMoving = [];
    this.firstMove = true;
    this.name = `${this.type}_${this.colour}`;
  }

  generatorPath(): string {
    return `/figures/${this.colour}/${this.type}.svg`;
  }

  callCastle(posMoves: Position[], board: Position[][],
    actualPosition: Position, hor: number, checkingSecurity: boolean, king: Position): void {
    const perpendicularly = actualPosition.perpendicularly - 1;
    const horizontally = actualPosition.horizontally.charCodeAt(0) - 65 + hor;

    if (hor > 0) {
      if (board[perpendicularly][horizontally - 1].figure === undefined
      && board[perpendicularly][horizontally].figure === undefined
      && board[perpendicularly][horizontally + 1].figure?.firstMove
      && board[perpendicularly][horizontally - 2].attackedBy
        .filter((pos) => pos.figure?.colour !== this.colour).length === 0) {
        if (checkingSecurity
          && safeMoving(actualPosition, board[perpendicularly][horizontally], board, king, this)) {
          posMoves.push(board[perpendicularly][horizontally]);
        }
      }
    } else if (board[perpendicularly][horizontally + 1].figure === undefined
        && board[perpendicularly][horizontally].figure === undefined
        && board[perpendicularly][horizontally - 1].figure === undefined
        && this.firstMove && board[perpendicularly][horizontally - 2].figure?.firstMove
        && board[perpendicularly][horizontally - 2].attackedBy
          .filter((pos) => pos.figure?.colour !== this.colour).length === 0) {
      if (checkingSecurity
          && safeMoving(actualPosition, board[perpendicularly][horizontally], board, king, this)) {
        posMoves.push(board[perpendicularly][horizontally]);
      }
    }
  }

  possibleMoves(board: Position[][], actualPosition: Position,
    checkingSecurity: boolean, king: Position): void {
    const moves = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
    const posMoves: Position[] = possibleMoves(board, actualPosition,
      checkingSecurity, king, this, moves);

    if (this.firstMove
      && posMoves.findIndex((elem) => elem.index === `F${actualPosition.perpendicularly}`) !== -1) {
      this.callCastle(posMoves, board, actualPosition, 2, checkingSecurity, king);
    }
    if (this.firstMove
      && posMoves.findIndex((elem) => elem.index === `D${actualPosition.perpendicularly}`) !== -1) {
      this.callCastle(posMoves, board, actualPosition, -2, checkingSecurity, king);
    }

    this.possibleMoving = posMoves;
    this.possibleMoving.forEach((el) => {
      if (el.attackedBy.findIndex((elem) => elem === actualPosition) === -1) {
        el.attackedBy.push(actualPosition);
      }
    });
  }

  move(oldPosition: Position, newPosition: Position): RecordMove {
    let castle = 0;

    if (this.firstMove) {
      const length = oldPosition.horizontally.charCodeAt(0)
        - newPosition.horizontally.charCodeAt(0);

      if (Math.abs(length) > 1) {
        if (length < 0) {
          const rook: number = newPosition.attackedBy.findIndex((elem) => elem.index === `H${newPosition.perpendicularly}`);
          const rookPosition = newPosition.attackedBy[rook];
          const newPos: (number | undefined) = rookPosition.figure?.possibleMoving.findIndex((elem) => elem.index === `F${newPosition.perpendicularly}`);
          // eslint-disable-next-line max-len,no-unused-expressions
          rookPosition.figure?.move(rookPosition, rookPosition?.figure?.possibleMoving[newPos || 0]);
          castle = 1;
        } else {
          const rook: number = newPosition.attackedBy.findIndex((elem) => elem.index === `A${newPosition.perpendicularly}`);
          const rookPosition = newPosition.attackedBy[rook];
          const newPos: (number | undefined) = rookPosition.figure?.possibleMoving.findIndex((elem) => elem.index === `D${newPosition.perpendicularly}`);
          // eslint-disable-next-line max-len,no-unused-expressions
          rookPosition.figure?.move(rookPosition, rookPosition?.figure?.possibleMoving[newPos || 0]);
          castle = 2;
        }
      }
    }

    const attackOpponent: boolean = newPosition.figure !== undefined;
    // eslint-disable-next-line no-param-reassign
    oldPosition.figure = undefined;
    // eslint-disable-next-line no-param-reassign
    newPosition.figure = this;

    this.firstMove = false;

    return new RecordMove(oldPosition, newPosition, this, attackOpponent, castle);
  }
}
