import Figure, * as FigureModule from '@/assets/interface/Figure';
import King from '@/assets/Figure/King';
import Bishop from '@/assets/Figure/Bishop';
import Knight from '@/assets/Figure/Knight';
import Pawn from '@/assets/Figure/Pawn';
import Queen from '@/assets/Figure/Queen';
import Rook from '@/assets/Figure/Rook';
import Position from '@/assets/interface/Position';
import * as PositionModule from '@/assets/interface/Position';
import Colour from '@/assets/enums/Colour';

const board: Position[][] = [
  [
    PositionModule.createPosition(1, 'A', new Rook(Colour.white)),
    PositionModule.createPosition(1, 'B', new Knight(Colour.white)),
    PositionModule.createPosition(1, 'C', new Bishop(Colour.white)),
    PositionModule.createPosition(1, 'D', new Queen(Colour.white)),
    PositionModule.createPosition(1, 'E', new King(Colour.white)),
    PositionModule.createPosition(1, 'F', new Bishop(Colour.white)),
    PositionModule.createPosition(1, 'G', new Knight(Colour.white)),
    PositionModule.createPosition(1, 'H', new Rook(Colour.white)),
  ],
  [
    PositionModule.createPosition(2, 'A', new Pawn(Colour.white)),
    PositionModule.createPosition(2, 'B', new Pawn(Colour.white)),
    PositionModule.createPosition(2, 'C', new Pawn(Colour.white)),
    PositionModule.createPosition(2, 'D', new Pawn(Colour.white)),
    PositionModule.createPosition(2, 'E', new Pawn(Colour.white)),
    PositionModule.createPosition(2, 'F', new Pawn(Colour.white)),
    PositionModule.createPosition(2, 'G', new Pawn(Colour.white)),
    PositionModule.createPosition(2, 'H', new Pawn(Colour.white)),
  ],
  [
    PositionModule.createPosition(3, 'A'), PositionModule.createPosition(3, 'B'),
    PositionModule.createPosition(3, 'C'), PositionModule.createPosition(3, 'D'),
    PositionModule.createPosition(3, 'E'), PositionModule.createPosition(3, 'F'),
    PositionModule.createPosition(3, 'G'), PositionModule.createPosition(3, 'H'),
  ],
  [
    PositionModule.createPosition(4, 'A'), PositionModule.createPosition(4, 'B'),
    PositionModule.createPosition(4, 'C'), PositionModule.createPosition(4, 'D'),
    PositionModule.createPosition(4, 'E'), PositionModule.createPosition(4, 'F'),
    PositionModule.createPosition(4, 'G'), PositionModule.createPosition(4, 'H'),
  ],
  [
    PositionModule.createPosition(5, 'A'), PositionModule.createPosition(5, 'B'),
    PositionModule.createPosition(5, 'C'), PositionModule.createPosition(5, 'D'),
    PositionModule.createPosition(5, 'E'), PositionModule.createPosition(5, 'F'),
    PositionModule.createPosition(5, 'G'), PositionModule.createPosition(5, 'H'),
  ],
  [
    PositionModule.createPosition(6, 'A'), PositionModule.createPosition(6, 'B'),
    PositionModule.createPosition(6, 'C'), PositionModule.createPosition(6, 'D'),
    PositionModule.createPosition(6, 'E'), PositionModule.createPosition(6, 'F'),
    PositionModule.createPosition(6, 'G'), PositionModule.createPosition(6, 'H'),
  ],
  [
    PositionModule.createPosition(7, 'A', new Pawn(Colour.black)),
    PositionModule.createPosition(7, 'B', new Pawn(Colour.black)),
    PositionModule.createPosition(7, 'C', new Pawn(Colour.black)),
    PositionModule.createPosition(7, 'D', new Pawn(Colour.black)),
    PositionModule.createPosition(7, 'E', new Pawn(Colour.black)),
    PositionModule.createPosition(7, 'F', new Pawn(Colour.black)),
    PositionModule.createPosition(7, 'G', new Pawn(Colour.black)),
    PositionModule.createPosition(7, 'H', new Pawn(Colour.black)),
  ],
  [
    PositionModule.createPosition(8, 'A', new Rook(Colour.black)),
    PositionModule.createPosition(8, 'B', new Knight(Colour.black)),
    PositionModule.createPosition(8, 'C', new Bishop(Colour.black)),
    PositionModule.createPosition(8, 'D', new Queen(Colour.black)),
    PositionModule.createPosition(8, 'E', new King(Colour.black)),
    PositionModule.createPosition(8, 'F', new Bishop(Colour.black)),
    PositionModule.createPosition(8, 'G', new Knight(Colour.black)),
    PositionModule.createPosition(8, 'H', new Rook(Colour.black)),
  ],
];

export default board;
