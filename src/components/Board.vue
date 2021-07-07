<template>
  <div class="boardWrapper">
    <div class="board">
      <PlayerComp
        :player="white"
        @endTime="endTime"
      />
      <div class="fieldPlay">
        <Area
          v-for="n in 64"
          :key="board[Math.floor(n / 8)[n % 8]]"
          :position="getPosition(n)"
          :active="active"
          :player="player"
          @active="activated"
          @move="move"
        />

        <GroupFieldPerpendicularly />
        <GroupFieldHorizontally />
      </div>
      <PlayerComp
        :player="black"
        @endTime="endTime"
      />
    </div>

    <SidePanel
      :moves="moves"
      class="side-panel"
    />

    <EndBox
      v-if="isEnd"
      :winner="endGame"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Position from '@/assets/interface/Position';
import TemplateStartBoard from '@/assets/TemplateStartBoard';
import GroupFieldPerpendicularly from '@/components/Board/GroupFieldPerpendicularly.vue';
import GroupFieldHorizontally from '@/components/Board/GroupFieldHorizontally.vue';
import Player from '@/assets/interface/Player';
import PlayerModule from '@/assets/class/PlayerModule';
import Colour from '@/assets/enums/Colour';
import EndBox from '@/components/EndBox.vue';
import RecordMove from '@/assets/class/RecordMove';
import SidePanel from '@/components/SidePanel/SidePanel.vue';
import PlayerComp from '@/components/Player/Player.vue';
import EndGame from '@/assets/interface/EndGame';
import Area from '@/components/Board/Area.vue';
import Time from '@/assets/interface/Time';

export default defineComponent({
  name: 'Board',
  components: {
    Area,
    EndBox,
    SidePanel,
    PlayerComp,
    GroupFieldPerpendicularly,
    GroupFieldHorizontally,
  },
  data() {
    return {
      board: [] as Position[][],
      active: null as Position | null,
      white: {} as Player,
      black: {} as Player,
      player: {} as Player,
      moves: [] as RecordMove[],
      endGame: {} as EndGame,
      timeMove: {} as Time,
    };
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
    this.timeMove = { ...this.player.time };
  },
  mounted(): void {
    this.board.forEach((el) => {
      el.forEach((elem) => {
        // eslint-disable-next-line no-param-reassign
        elem.handlePosition = document.querySelector(`#${elem.index}`)?.querySelector('.wrapper') || null;
      });
    });
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

      // moving time
      // eslint-disable-next-line max-len
      this.moves[this.moves.length - 1].time = (this.timeMove.minutes - this.player.time.minutes) * 60
        + (this.timeMove.seconds - this.player.time.seconds);

      // settings measure time
      if (this.black.time) this.black.time.measure = !this.black.time.measure;
      if (this.white.time) this.white.time.measure = !this.white.time.measure;

      // change player
      if (this.player.colour === Colour.white) this.player = this.black;
      else this.player = this.white;
      this.timeMove = { ...this.player.time };

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
});
</script>

<style lang="scss" scoped>
.boardWrapper {
  position: relative;
  margin: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .board {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 10px;
    width: 100%;

    .fieldPlay {
      position: relative;
      width: 95vw;
      height: 95vw;
      display: flex;
      flex-wrap: wrap;
      border: 2px solid black;
      overflow: hidden;
    }
  }
}

@media (min-width: 450px) {
  .boardWrapper {
    .board {
      .fieldPlay {
        width: 85vw;
        height: 85vw;
      }
    }
  }
}

@media (min-width: 1024px) {
  .boardWrapper {
    flex-direction: row;
    gap: 2vw;
    justify-content: space-between;
    width: 100vw;
    height: 100vh;

    .board {
      justify-content: space-evenly;
      box-sizing: border-box;
      width: 90vh;
      height: 100vh;
      padding-left: 2vw;
      margin-left: auto;
      margin-right: auto;

      .fieldPlay {
        width: 80vh;
        height: 80vh;
      }
    }

    .side-panel {
      width: 30vw;
      justify-self: end;
    }
  }
}
</style>
