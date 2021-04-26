import Figure, * as FigureModule from '@/assets/interface/Figure';
import King from '@/assets/Figure/King';
import Bishop from '@/assets/Figure/Bishop';
import Knight from '@/assets/Figure/Knight';
import Pawn from '@/assets/Figure/Pawn';
import Queen from '@/assets/Figure/Queen';
import Rook from '@/assets/Figure/Rook';

const board: (Figure | undefined)[][] = [[new Rook(FigureModule.Color.white, 'A', 1),
  new Knight(FigureModule.Color.white, 'B', 1),
  new Bishop(FigureModule.Color.white, 'C', 1), new Queen(FigureModule.Color.white, 'D', 1),
  new King(FigureModule.Color.white, 'E', 1), new Bishop(FigureModule.Color.white, 'F', 1),
  new Knight(FigureModule.Color.white, 'G', 1), new Rook(FigureModule.Color.white, 'H', 1)],
[
  new Pawn(FigureModule.Color.white, 'A', 2), new Pawn(FigureModule.Color.white, 'B', 2),
  new Pawn(FigureModule.Color.white, 'C', 2), new Pawn(FigureModule.Color.white, 'D', 2),
  new Pawn(FigureModule.Color.white, 'E', 2), new Pawn(FigureModule.Color.white, 'F', 2),
  new Pawn(FigureModule.Color.white, 'G', 2), new Pawn(FigureModule.Color.white, 'H', 2),
],
[
  undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
],
[
  undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
],
[
  undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
],
[
  undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
],
[
  new Pawn(FigureModule.Color.black, 'A', 7), new Pawn(FigureModule.Color.black, 'B', 7),
  new Pawn(FigureModule.Color.black, 'C', 7), new Pawn(FigureModule.Color.black, 'D', 7),
  new Pawn(FigureModule.Color.black, 'E', 7), new Pawn(FigureModule.Color.black, 'F', 7),
  new Pawn(FigureModule.Color.black, 'G', 7), new Pawn(FigureModule.Color.black, 'H', 7),
],
[
  new Rook(FigureModule.Color.black, 'A', 8), new Knight(FigureModule.Color.black, 'B', 8),
  new Bishop(FigureModule.Color.black, 'C', 8), new Queen(FigureModule.Color.black, 'D', 8),
  new King(FigureModule.Color.black, 'E', 8), new Bishop(FigureModule.Color.black, 'F', 8),
  new Knight(FigureModule.Color.black, 'G', 8), new Rook(FigureModule.Color.black, 'H', 8),
],
];

export default board;
