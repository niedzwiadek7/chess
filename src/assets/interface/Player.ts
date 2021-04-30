import Colour from '@/assets/enums/Colour';
import Position from '@/assets/interface/Position';
import * as FigureModule from '@/assets/interface/Figure';

interface Player {
  colour?: Colour,
  figures?: Position[],
  possibleMoves?: Position[],
  king?: Position,
  isChecked?: boolean,
}

export function findFigures(board: Position[][], colour: Colour): Position[] {
  const figures: Position[] = [];

  board.forEach((el) => {
    el.forEach((elem) => {
      if (elem.figure?.colour === colour) figures.push(elem);
    });
  });

  return figures;
}

export function findKing(figures: Position[]): Position {
  let king: unknown;

  figures.forEach((el) => {
    if (el.figure?.type === FigureModule.Types.king) king = el;
  });

  return king as Position;
}

export function isChecked(king: (Position | undefined)): boolean {
  return king?.attackedBy.length !== 0;
}

export function handleAllPossibleMoves(figures: Position[],
  board: Position[][], king: Position, saveMoving: boolean): Position[] {
  const possibleMoves: Position[] = [];

  figures.forEach((el) => {
    // eslint-disable-next-line no-unused-expressions
    el.figure?.possibleMoves(board, el, saveMoving, king);
    // eslint-disable-next-line no-unused-expressions
    el.figure?.possibleMoving.forEach((elem) => {
      if (possibleMoves.findIndex((element) => elem === element) === -1) {
        possibleMoves.push(elem);
      }
    });
  });

  return possibleMoves;
}

export function create(board: Position[][], colour: Colour): Player {
  const col: Colour = colour;
  const fig: Position[] = findFigures(board, col);
  const kin: Position = findKing(fig);
  const pos: Position[] = handleAllPossibleMoves(fig, board, kin, true);
  const check: boolean = isChecked(kin);

  return {
    colour: col,
    figures: fig,
    possibleMoves: pos,
    king: kin,
    isChecked: check,
  };
}

export default Player;
