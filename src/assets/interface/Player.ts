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

export function handleAllPossibleMoves(figures: Position[], board: Position[][]): Position[] {
  const possibleMoves: Position[] = [];

  figures.forEach((el) => {
    // eslint-disable-next-line no-unused-expressions
    el.figure?.possibleMoves(board, el);
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
  const pos: Position[] = handleAllPossibleMoves(fig, board);

  return {
    colour: col,
    figures: fig,
    possibleMoves: pos,
  };
}

export default Player;
