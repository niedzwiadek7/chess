// eslint-disable-next-line import/no-cycle
import Figure from '@/assets/interface/Figure';

interface Position {
  horizontally: string,
  perpendicularly: number,
  index: string,
  handlePosition: (HTMLDivElement | null),
  figure: (Figure | undefined),
  attackedBy: Position[],
}

export default Position;
