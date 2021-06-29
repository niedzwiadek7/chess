// eslint-disable-next-line import/no-cycle
import Move from '@/assets/interface/Move';
// eslint-disable-next-line import/no-cycle
import Position from '@/assets/interface/Position';
// eslint-disable-next-line import/no-cycle
import Figure from '@/assets/interface/Figure';

class RecordMove implements Move {
  oldPosition: Position;

  newPosition: Position;

  value: string;

  figure: Figure;

  attackOpponent: boolean;

  castle: number;

  time: (number | undefined);

  constructor(oldPosition: Position, newPosition: Position, figure: Figure,
    attack: boolean, isCastle: number) {
    this.oldPosition = oldPosition;
    this.newPosition = newPosition;
    this.attackOpponent = attack;
    this.figure = figure;
    this.castle = isCastle;
    this.value = this.recordMove();
  }

  conflicts(): string {
    const mainCondition = (pos: Position) => pos.figure?.type === this.newPosition.figure?.type
      && pos.figure?.colour === this.newPosition.figure?.colour
      && pos.index !== this.oldPosition.index;

    const conflict: Position[] = this.newPosition.attackedBy
      .filter((pos) => mainCondition(pos));

    let additionalPosition = '';

    if (conflict.length > 0) {
      const isConflictPerpendicularly = !conflict
        .every((pos) => pos.perpendicularly !== this.oldPosition.perpendicularly);

      if (isConflictPerpendicularly) {
        additionalPosition = additionalPosition.concat(this.oldPosition.horizontally);
      }

      const isConflictHorizontally = !conflict
        .every((pos) => pos.horizontally !== this.oldPosition.horizontally);

      if (isConflictHorizontally) {
        additionalPosition = additionalPosition.concat(this.oldPosition.perpendicularly.toString());
      }
    }

    return additionalPosition.toLowerCase();
  }

  recordMove(): string {
    if (this.castle === 1) {
      return 'O-O';
    }
    if (this.castle === 2) {
      return 'O-O-O';
    }
    return `${this.conflicts()}${this.attackOpponent ? 'x' : ''}${this.newPosition.index}`;
  }
}

export default RecordMove;
