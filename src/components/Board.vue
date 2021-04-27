<template>
  <div class="board">
    <div class="fieldPlay">
      <Area v-for="n in 64" :key="n"
            :position="getPosition(n)"
            :figure="board[Math.floor((n - 1) / 8)][(n - 1) % 8]"
            :active="active"
            :board="board"
            :player="player"
            @changeActive="changeActiveElement"
            @changePlayer="changeActivePlayer"
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
import Position, * as constructPos from '@/assets/interface/Position';
import Figure, * as FigureModule from '@/assets/interface/Figure';
import TemplateStartBoard from '@/assets/TemplateStartBoard';
import Area from './Area.vue';

export default defineComponent({
  name: 'Board',
  components: {
    Area,
  },
  data() {
    return {
      board: [] as (Figure | undefined)[][],
      active: null as (Figure | null),
      player: FigureModule.Color.white as FigureModule.Color,
    };
  },
  methods: {
    getPosition(n: number): Position {
      return constructPos.createPosition(n);
    },
    changeActiveElement(element: Figure) {
      if (element !== this.active) {
        if (this.active === null) {
          this.active = element;
        } else {
          // eslint-disable-next-line no-unused-expressions
          this.active?.possibleMoves(this.board).forEach((el) => {
            // eslint-disable-next-line no-unused-expressions
            el.handlePosition()?.classList.remove('possibleMove');
          });
          // eslint-disable-next-line no-unused-expressions
          this.active.position.handlePosition()?.classList.remove('active');
          this.active = element;
        }
      } else {
        this.active = null;
      }
      console.log(this.active);
    },
    changeActivePlayer():void {
      if (this.player === FigureModule.Color.white) this.player = FigureModule.Color.black;
      else this.player = FigureModule.Color.white;
    },
  },
  created(): void {
    this.board = TemplateStartBoard;
    console.log(this.board);
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
