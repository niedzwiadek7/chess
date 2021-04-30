<template>
  <div class="board">
    <div class="fieldPlay">
      <Area v-for="n in 64" :key="n"
            :position="getPosition(n)"
            :active = "active"
            :player = "player"
            @active = "activated"
            @move = "move"
      />
    </div>

    <div class="groupFieldHorizontally">
      <div class="fieldDescription" v-for="n in 8" :key="n"> {{ String.fromCharCode(64+n) }} </div>
    </div>

    <div class="groupFieldPerpendicularly">
      <div class="fieldDescription" v-for="n in 8" :key="n"> {{ n }} </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Position from '@/assets/interface/Position';
import TemplateStartBoard from '@/assets/TemplateStartBoard';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import Player, * as PlayerModule from '@/assets/interface/Player';
import Colour from '@/assets/enums/Colour';
import * as FigureModule from '@/assets/interface/Figure';
import Area from './Area.vue';

export default defineComponent({
  name: 'Board',
  components: {
    Area,
  },
  data() {
    return {
      board: [] as Position[][],
      active: null as (Position | null),
      white: Object as Player,
      black: Object as Player,
      player: Object as Player,
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
    move(positions: FigureModule.MoveFigure) {
      // change player
      if (this.player.colour === Colour.white) this.player = this.black;
      else this.player = this.white;

      // update information about players
      this.white.figures = PlayerModule.findFigures(this.board, Colour.white);
      this.black.figures = PlayerModule.findFigures(this.board, Colour.black);
      // eslint-disable-next-line max-len
      this.white.possibleMoves = PlayerModule.handleAllPossibleMoves(this.white.figures, this.board);
      // eslint-disable-next-line max-len
      this.black.possibleMoves = PlayerModule.handleAllPossibleMoves(this.black.figures, this.board);
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70vh;
  height: 70vh;

  .fieldPlay {
    width: 88%;
    height: 88%;
    display: flex;
    flex-wrap: wrap;
    border: 2px solid black;
  }

  .groupFieldHorizontally {
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    left: 6%;
    top: 0;
    width: 88%;
    height: 6%;
    justify-content: space-around;
  }

  .groupFieldPerpendicularly {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    left: 0;
    top: 6%;
    width: 6%;
    height: 88%;
  }

  .fieldDescription {
    font-size: 12px;
    text-align: center;
    font-weight: bold;
  }
}

@media (max-width: 1024px) {
  .board {
    width: 70vw;
    height: 70vw;
  }
}
</style>
