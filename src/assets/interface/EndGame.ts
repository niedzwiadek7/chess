import Player from '@/assets/interface/Player';

interface EndGame {
  result: (string | undefined),
  winner?: (Player | undefined),
  cause: (string | undefined),
}

export default EndGame;
