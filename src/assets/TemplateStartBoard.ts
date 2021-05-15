import King from '@/assets/Figure/King';
import Bishop from '@/assets/Figure/Bishop';
import Knight from '@/assets/Figure/Knight';
import Pawn from '@/assets/Figure/Pawn';
import Queen from '@/assets/Figure/Queen';
import Rook from '@/assets/Figure/Rook';
import Position from '@/assets/interface/Position';
import createPosition from '@/assets/modules/createPosition';
import Colour from '@/assets/enums/Colour';

const board: Position[][] = [
  [
    createPosition(1, 'A', new Rook(Colour.white)),
    createPosition(1, 'B', new Knight(Colour.white)),
    createPosition(1, 'C', new Bishop(Colour.white)),
    createPosition(1, 'D', new Queen(Colour.white)),
    createPosition(1, 'E', new King(Colour.white)),
    createPosition(1, 'F', new Bishop(Colour.white)),
    createPosition(1, 'G', new Knight(Colour.white)),
    createPosition(1, 'H', new Rook(Colour.white)),
  ],
  [
    createPosition(2, 'A', new Pawn(Colour.white)),
    createPosition(2, 'B', new Pawn(Colour.white)),
    createPosition(2, 'C', new Pawn(Colour.white)),
    createPosition(2, 'D', new Pawn(Colour.white)),
    createPosition(2, 'E', new Pawn(Colour.white)),
    createPosition(2, 'F', new Pawn(Colour.white)),
    createPosition(2, 'G', new Pawn(Colour.white)),
    createPosition(2, 'H', new Pawn(Colour.white)),
  ],
  [
    createPosition(3, 'A'), createPosition(3, 'B'),
    createPosition(3, 'C'), createPosition(3, 'D'),
    createPosition(3, 'E'), createPosition(3, 'F'),
    createPosition(3, 'G'), createPosition(3, 'H'),
  ],
  [
    createPosition(4, 'A'), createPosition(4, 'B'),
    createPosition(4, 'C'), createPosition(4, 'D'),
    createPosition(4, 'E'), createPosition(4, 'F'),
    createPosition(4, 'G'), createPosition(4, 'H'),
  ],
  [
    createPosition(5, 'A'), createPosition(5, 'B'),
    createPosition(5, 'C'), createPosition(5, 'D'),
    createPosition(5, 'E'), createPosition(5, 'F'),
    createPosition(5, 'G'), createPosition(5, 'H'),
  ],
  [
    createPosition(6, 'A'), createPosition(6, 'B'),
    createPosition(6, 'C'), createPosition(6, 'D'),
    createPosition(6, 'E'), createPosition(6, 'F'),
    createPosition(6, 'G'), createPosition(6, 'H'),
  ],
  [
    createPosition(7, 'A', new Pawn(Colour.black)),
    createPosition(7, 'B', new Pawn(Colour.black)),
    createPosition(7, 'C', new Pawn(Colour.black)),
    createPosition(7, 'D', new Pawn(Colour.black)),
    createPosition(7, 'E', new Pawn(Colour.black)),
    createPosition(7, 'F', new Pawn(Colour.black)),
    createPosition(7, 'G', new Pawn(Colour.black)),
    createPosition(7, 'H', new Pawn(Colour.black)),
  ],
  [
    createPosition(8, 'A', new Rook(Colour.black)),
    createPosition(8, 'B', new Knight(Colour.black)),
    createPosition(8, 'C', new Bishop(Colour.black)),
    createPosition(8, 'D', new Queen(Colour.black)),
    createPosition(8, 'E', new King(Colour.black)),
    createPosition(8, 'F', new Bishop(Colour.black)),
    createPosition(8, 'G', new Knight(Colour.black)),
    createPosition(8, 'H', new Rook(Colour.black)),
  ],
];

export default board;
