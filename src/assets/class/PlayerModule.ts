import Position from '@/assets/interface/Position';
import Colour from '@/assets/enums/Colour';
import Types from '@/assets/enums/Types';
import Player from '@/assets/interface/Player';

class PlayerModule {
  static findFigures(board: Position[][], colour: Colour): Position[] {
    const figures: Position[] = [];

    board.forEach((el) => {
      el.forEach((elem) => {
        if (elem.figure?.colour === colour) figures.push(elem);
      });
    });

    return figures;
  }

  static findKing(figures: Position[]): Position {
    let king: unknown;

    figures.forEach((el) => {
      if (el.figure?.type === Types.king) king = el;
    });

    return king as Position;
  }

  static isChecked(king: (Position | undefined)): boolean {
    return king?.attackedBy.length !== 0;
  }

  static handleAllPossibleMoves(figures: Position[], board: Position[][],
    king: Position, saveMoving: boolean): Position[] {
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

  static create(board: Position[][], colour: Colour): Player {
    const col: Colour = colour;
    const fig: Position[] = PlayerModule.findFigures(board, col);
    const kin: Position = PlayerModule.findKing(fig);
    const pos: Position[] = PlayerModule.handleAllPossibleMoves(fig, board, kin, true);
    const check: boolean = PlayerModule.isChecked(kin);

    return {
      name: 'Damian',
      colour: col,
      figures: fig,
      possibleMoves: pos,
      king: kin,
      isChecked: check,
      time: {
        minutes: 0,
        seconds: 10,
        measure: col === Colour.white,
      },
    };
  }

  static operationBeforeMove(player: Player, opponent: Player, board: Position[][]): void {
    // eslint-disable-next-line no-param-reassign
    opponent.figures = PlayerModule.findFigures(board, opponent.colour);
    // eslint-disable-next-line no-param-reassign
    opponent.king = PlayerModule.findKing(opponent.figures);
    // eslint-disable-next-line max-len,no-param-reassign
    opponent.possibleMoves = PlayerModule.handleAllPossibleMoves(opponent.figures, board, opponent.king, false);
    // eslint-disable-next-line no-param-reassign
    player.isChecked = PlayerModule.isChecked(player.king);
    if (player.figures && player.king) {
      // eslint-disable-next-line max-len,no-param-reassign
      player.possibleMoves = PlayerModule.handleAllPossibleMoves(player.figures, board, player.king, true);
    }
  }
}

export default PlayerModule;
