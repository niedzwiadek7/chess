import Types from '@/assets/enums/Types';
import Position from '@/assets/interface/Position';
import Figure from '@/assets/interface/Figure';

// eslint-disable-next-line max-len
const includesInBoard = (hor: number, per: number): boolean => hor >= 0 && hor < 8 && per >= 0 && per < 8;

interface Direct {
  horizontally: number;
  perpendicularly: number;
}

// eslint-disable-next-line max-len
const attackByOpponent = (pos: Position, king: Position): boolean => pos.figure?.colour !== king.figure?.colour;

const directionFigure = (pos: Position, attack: Position): Direct => {
  const horizontally = pos.horizontally.charCodeAt(0) - attack.horizontally.charCodeAt(0);
  const perpendicularly = pos.perpendicularly - attack.perpendicularly;
  const unit = horizontally !== 0 ? Math.abs(horizontally) : Math.abs(perpendicularly);

  return {
    horizontally: horizontally / unit,
    perpendicularly: perpendicularly / unit,
  };
};

export default function (
  oldPosition: Position,
  newPosition: Position,
  board: Position[][],
  king: Position,
  figure: Figure,
): boolean {
  const figuresAttack = king.attackedBy.filter((pos) => attackByOpponent(pos, king));

  let possible = true;

  // double check
  if (figuresAttack.length >= 2) {
    if (figure.type !== Types.king) return false;
    return newPosition.attackedBy.filter((pos) => attackByOpponent(pos, king)).length === 0;
  }

  // block when king is moving and try move to area attacked by opponent
  if (
    figure.type === Types.king
    && newPosition.attackedBy.filter((pos) => attackByOpponent(pos, king)).length !== 0
  ) {
    return false;
  }

  // move is possible
  const attackOnFigure = oldPosition.attackedBy.filter((pos) => attackByOpponent(pos, king));
  attackOnFigure.forEach((pos) => {
    if (
      pos.figure?.type === Types.bishop
      || pos.figure?.type === Types.rook
      || pos.figure?.type === Types.queen
    ) {
      const direct = directionFigure(oldPosition, pos);
      let hor = oldPosition.horizontally.charCodeAt(0) - 65 + direct.horizontally;
      let per = oldPosition.perpendicularly - 1 + direct.perpendicularly;

      while (includesInBoard(hor, per) && !board[per][hor]?.figure) {
        per += direct.perpendicularly;
        hor += direct.horizontally;
      }

      if (includesInBoard(hor, per) && board[per][hor]?.figure === king?.figure) {
        const directionMove = directionFigure(oldPosition, newPosition);
        if (
          directionMove.horizontally !== direct.horizontally
          || directionMove.perpendicularly !== direct.perpendicularly
        ) possible = false;
      }
    }
  });

  if (!possible) return false;

  // when figure is once check
  if (figuresAttack.length === 1) {
    if (figure.type !== Types.king) {
      if (newPosition === figuresAttack[0]) return true;
      if (
        figuresAttack[0].figure?.type === Types.bishop
        || figuresAttack[0].figure?.type === Types.rook
        || figuresAttack[0].figure?.type === Types.queen
      ) {
        const direction = directionFigure(king, figuresAttack[0]);
        let hor = figuresAttack[0].horizontally.charCodeAt(0) - 65 + direction.horizontally;
        let per = figuresAttack[0].perpendicularly - 1 + direction.perpendicularly;
        const posToCovering: Position[] = [];

        while (includesInBoard(hor, per) && !board[per][hor]?.figure) {
          posToCovering.push(board[per][hor]);
          per += direction.perpendicularly;
          hor += direction.horizontally;
        }

        return posToCovering.findIndex((pos) => pos === newPosition) !== -1;
      }
    } else if (newPosition.attackedBy.filter((pos) => attackByOpponent(pos, king)).length === 0) {
      if (
        figuresAttack[0].figure?.type === Types.bishop ||
        figuresAttack[0].figure?.type === Types.rook ||
        figuresAttack[0].figure?.type === Types.queen
      ) {
        const directionFig = directionFigure(king, figuresAttack[0]);
        const directionKing = directionFigure(newPosition, oldPosition);
        if (
          directionFig.horizontally === directionKing.horizontally &&
          directionFig.perpendicularly === directionKing.perpendicularly
        )
          return false;
      }
      return true;
    }
    return false;
  }

  return possible;
}
