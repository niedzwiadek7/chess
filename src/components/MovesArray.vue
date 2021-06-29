<template>
  <div v-if="moves.length > 0" class="list">
    <div v-for="n in Math.floor((moves.length+1)/2)" :key="n" class="queue">
      <div class="number"> {{ n }}. </div>

      <div class="element">
        <Move :move="getMove(2*(n-1))" />
      </div>

      <div class="element">
        <Move v-show="getMove(2*(n-1)+1) !== undefined"
              :move="getMove(2*(n-1)+1)" />
      </div>

      <div class="time">
        <TimeComponent :time="moves[2*(n-1)].time" />
        <TimeComponent v-show="getMove(2*(n-1)+1) !== undefined"
              :time="moves[2*(n-1)+1]?.time" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import RecordMove from '@/assets/class/RecordMove';
import Move from '@/components/Move.vue';
import TimeComponent from '@/components/TimeComponent.vue';

export default defineComponent({
  name: 'MovesArray',
  components: {
    Move,
    TimeComponent,
  },
  props: {
    moves: {
      type: Object as PropType<RecordMove[]>,
      required: true,
    },
  },
  methods: {
    getMove(n: number): RecordMove {
      return this.moves[n];
    },
  },
});
</script>

<style lang="scss" scoped>
.list {

  .queue {
    box-sizing: border-box;
    width: 100%;
    height: 3rem;
    display: grid;
    align-items: center;
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas: "number number move1 move1 move1 move2 move2 move2 time time time time";
    border-bottom: 1px solid black;

    .number {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #333;
      height: 100%;
      border-right: 1px solid black;
      border-top: 1px solid black;
      text-align: center;
      grid-area: number;
      user-select: none;

      &:first-child {
        border-top: 1px solid black;
      }
    }

    .element {
      padding-left: 0;
      text-align: center;
      width: 100%;

      &:nth-child(2n) {
        grid-area: move1;
      }

      &:nth-child(2n-1) {
        grid-area: move2;
      }
    }

    &:nth-child(2n) {
      background-color: #333;
    }

    .time {
      grid-area: time;
      user-select: none;
    }
  }

  &:last-child {
    border-top: 1px solid black;
  }
}
</style>
