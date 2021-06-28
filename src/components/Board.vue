<template>
  <div class="board">
    <PlayerComp :player="white" @endTime = "endTime" />
    <div class="fieldPlay">

      <Area v-for="n in 64" :key="n"
            :position="getPosition(n)"
            :active = "active"
            :player = "player"
            @active = "activated"
            @move = "move"
      />

      <div class="groupFieldHorizontally">
        <div class="fieldDescription" v-for="n in 8" :key="n">
          {{ String.fromCharCode(64+n) }}
        </div>
      </div>

      <div class="groupFieldPerpendicularly">
        <div class="fieldDescription" v-for="n in 8" :key="n"> {{ n }} </div>
      </div>
    </div>
    <PlayerComp :player="black" @endTime = "endTime" />

    <SidePanel :moves="moves" />

    <EndBox v-if="isEnd" :winner="endGame" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Position from '@/assets/interface/Position';
import TemplateStartBoard from '@/assets/TemplateStartBoard';
import Player from '@/assets/interface/Player';
import PlayerModule from '@/assets/class/PlayerModule';
import Colour from '@/assets/enums/Colour';
import EndBox from '@/components/EndBox.vue';
import RecordMove from '@/assets/class/RecordMove';
import SidePanel from '@/components/SidePanel.vue';
import PlayerComp from '@/components/Player.vue';
import EndGame from '@/assets/interface/EndGame';
import Figure from '@/assets/interface/Figure';
import Area from '@/components/Area.vue';

export default defineComponent({
  name: 'Board',
  components: {
    Area,
    EndBox,
    SidePanel,
    PlayerComp,
  },
  data() {
    return {
      board: [] as Position[][],
      active: null as (Position | null),
      white: {} as Player,
      black: {} as Player,
      player: {} as Player,
      moves: [] as RecordMove[],
      endGame: {} as EndGame,
    };
  },
  methods: {
    getPosition(n: number): Position {
      return this.board[Math.floor((n - 1) / 8)][(n - 1) % 8];
    },
    activated(position: Position) {
      if (this.active === position) this.active = null;
      else this.active = position;
    },
    move(active: Position, position: Position) {
      // eslint-disable-next-line no-unused-expressions
      if (position.figure !== undefined) this.player.broken.push(position.figure);
      const move = active.figure?.move(active, position);
      if (move !== undefined) this.moves.push(move);

      // settings measure time
      if (this.black.time) this.black.time.measure = !this.black.time.measure;
      if (this.white.time) this.white.time.measure = !this.white.time.measure;

      // change player
      if (this.player.colour === Colour.white) this.player = this.black;
      else this.player = this.white;

      // update information about players
      this.board.forEach((elem) => {
        elem.forEach((el) => {
          // eslint-disable-next-line no-param-reassign
          el.attackedBy = [];
        });
      });

      if (this.player === this.black) {
        PlayerModule.operationBeforeMove(this.black, this.white, this.board);
      } else {
        PlayerModule.operationBeforeMove(this.white, this.black, this.board);
      }
    },
    endTime() {
      if (this.player.time) this.player.time.measure = false;
      this.endGame.result = 'winner';
      this.endGame.winner = this.player === this.white ? this.black : this.white;
    },
  },
  computed: {
    isEnd(): boolean {
      return this.endGame.result !== undefined;
    },
  },
  created(): void {
    this.board = TemplateStartBoard;
    this.black = PlayerModule.create(this.board, Colour.black);
    this.white = PlayerModule.create(this.board, Colour.white);
    this.player = this.white;
  },
  mounted(): void {
    this.board.forEach((el) => {
      el.forEach((elem) => {
        // eslint-disable-next-line no-param-reassign
        elem.handlePosition = document.querySelector(`#${elem.index}`)?.querySelector('.wrapper') || null;
      });
    });
  },
});
</script>

<style lang="scss" scoped>

.board {
  position: relative;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .fieldPlay {
    align-self: center;
    position: relative;
    width: 95vw;
    height: 95vw;
    display: flex;
    flex-wrap: wrap;
    border: 2px solid black;
    overflow: hidden;
  }

  .groupFieldHorizontally {
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    bottom: 0;
    right: -5%;
    width: 100%;
    justify-content: space-around;

    .fieldDescription:nth-child(2n+1) {
        color: black;
    }
  }

  .groupFieldPerpendicularly {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    left: .5%;
    top: -5%;
    height: 100%;
    justify-content: space-around;
    overflow: hidden;

    .fieldDescription:nth-child(2n) {
      color: black;
    }
  }

  .fieldDescription {
    font-size: .9rem;
    text-align: center;
    font-weight: bold;
    color: white;
  }
}

@media (min-width: 768px) {
  .board {
    .fieldPlay {
      width: 75vw;
      height: 75vw;
    }
  }
}
</style>
