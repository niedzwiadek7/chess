import Position from '@/assets/interface/Position';
import safeMoving from '@/assets/Figure/Scripts/safeMoving';
import Figure from '@/assets/interface/Figure';

// eslint-disable-next-line max-len
const includesInBoard = (hor: number, per: number): boolean => hor >= 0 && hor < 8 && per >= 0 && per < 8;

const callMove = (posMoves: Position[], board: Position[][],
  actualPosition: Position, hor: number, per: number,
  checkingSecurity: boolean, king: Position, figure: Figure): void => {
  const perpendicularly = actualPosition.perpendicularly + per - 1;
  const horizontally = actualPosition.horizontally.charCodeAt(0) - 65 + hor;

  if (includesInBoard(perpendicularly, horizontally)
    && (board[perpendicularly][horizontally].figure === undefined
      || board[perpendicularly][horizontally].figure?.colour !== figure.colour)) {
    if (!checkingSecurity
      || safeMoving(actualPosition, board[perpendicularly][horizontally], board, king, figure)) {
      posMoves.push(board[perpendicularly][horizontally]);
    }
  }

  if (includesInBoard(perpendicularly, horizontally)) {
    board[perpendicularly][horizontally].attackedBy.push(actualPosition);
  }
};

const possibleMoves = (board: Position[][], actualPosition: Position,
  checkingSecurity: boolean, king: Position, figure: Figure, moves: number[][]): Position[] => {
  const posMoves: Position[] = [];

  moves.forEach((elem) => {
    callMove(posMoves, board, actualPosition, elem[0], elem[1], checkingSecurity, king, figure);
  });

  return posMoves;
};

export default possibleMoves;
