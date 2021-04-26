import Position, * as constructPos from '@/assets/interface/Position';
import Figure, * as FigureModule from '../interface/Figure';

export default class Bishop implements Figure {
  type: FigureModule.Types;

  color: FigureModule.Color;

  path: string;

  position: Position;

  constructor(color: FigureModule.Color, hor: string, per: number) {
    this.type = FigureModule.Types.bishop;
    this.color = color as FigureModule.Color;
    this.path = this.generatorPath();
    this.position = constructPos.createPosition(per, hor);
  }

  generatorPath(): string {
    return `/figures/${this.color}/${this.type}.svg`;
  }
}
