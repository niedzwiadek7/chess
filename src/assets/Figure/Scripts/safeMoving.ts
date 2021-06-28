import Types from '@/assets/enums/Types';
import Colour from '@/assets/enums/Colour';
import Position from '@/assets/interface/Position';
import Figure from '@/assets/interface/Figure';

export default function (oldPosition: Position, newPosition: Position,
  board: Position[][], king: Position, figure: Figure): boolean {
  const figureOnNewPosition: (Figure | undefined) = newPosition.figure;
  // eslint-disable-next-line no-param-reassign
  newPosition.figure = figure;
  // eslint-disable-next-line no-param-reassign
  oldPosition.figure = undefined;
  const player = {
    colour: figure.colour,
    figures: [newPosition],
    king,
  };
  const opponent = {
    colour: player.colour === Colour.white ? Colour.black : Colour.white,
    figures: [] as Position[],
    possibleMoves: [] as Position[],
  };

  // handling king
  if (figure.type === Types.king) player.king = newPosition;

  // handling dangerous figures
  // eslint-disable-next-line no-unused-expressions
  player.king.attackedBy.forEach((el) => {
    // eslint-disable-next-line no-unused-expressions
    if (el.figure?.colour !== player.colour
      && opponent.figures?.findIndex((elem) => elem === el) === -1) {
      // eslint-disable-next-line no-unused-expressions
      opponent.figures?.push(el);
    }
  });
  oldPosition.attackedBy.forEach((el) => {
    // eslint-disable-next-line no-unused-expressions
    if (el.figure?.colour !== player.colour
      && opponent.figures?.findIndex((elem) => elem === el) === -1) {
      // eslint-disable-next-line no-unused-expressions
      opponent.figures?.push(el);
    }
  });

  // check dangerous figures
  opponent.figures.forEach((el) => {
    // eslint-disable-next-line no-unused-expressions
    el.figure?.possibleMoves(board, el, false, king);
    // eslint-disable-next-line no-unused-expressions
    el.figure?.possibleMoving.forEach((elem) => {
      // eslint-disable-next-line no-unused-expressions
      opponent.possibleMoves?.push(elem);
    });
  });

  // check checking
  const safe: boolean = opponent.possibleMoves.findIndex((el) => el === player.king) === -1;

  // clearing
  if (figure.type === Types.king) player.king = oldPosition;
  // eslint-disable-next-line no-param-reassign
  oldPosition.figure = figure;
  // eslint-disable-next-line no-param-reassign
  newPosition.figure = figureOnNewPosition;
  opponent.figures.forEach((el) => {
    // eslint-disable-next-line no-unused-expressions
    el.figure?.possibleMoving.forEach((posMove) => {
      const place = posMove.attackedBy.findIndex((elem) => elem === el);
      posMove.attackedBy.splice(place, 1);
    });
    // eslint-disable-next-line no-unused-expressions
    el.figure?.possibleMoves(board, el, false, king);
  });

  return safe;
}
