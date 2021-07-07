<template>
  <div
    ref="list"
    class="list"
  >
    <div
      v-for="n in Math.floor((moves.length+1)/2)"
      :key="n"
      class="queue"
    >
      <div class="number">
        {{ n }}.
      </div>

      <div class="element">
        <Move :move="getMove(2*(n-1))" />
      </div>

      <div class="element">
        <Move
          v-show="getMove(2*(n-1)+1) !== undefined"
          :move="getMove(2*(n-1)+1)"
        />
      </div>

      <div class="time">
        <TimeComponent :time="moves[2*(n-1)].time" />
        <TimeComponent
          v-show="getMove(2*(n-1)+1) !== undefined"
          :time="moves[2*(n-1)+1]?.time"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import RecordMove from '@/assets/class/RecordMove';
import Move from '@/components/SidePanel/Move.vue';
import TimeComponent from '@/components/SidePanel/TimeComponent.vue';

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
  updated() {
    this.scrollToEnd();
  },
  methods: {
    getMove(n: number): RecordMove {
      return this.moves[n];
    },
    scrollToEnd() {
      const content: HTMLDivElement = (this.$refs.list as HTMLDivElement);
      content.scrollTop = content.scrollHeight;
    },
  },
});
</script>

<style lang="scss" scoped>
.list {
  max-height: 300px;
  overflow: auto;
  width: 100%;
  margin: auto;

  .queue {
    box-sizing: border-box;
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
      text-align: center;
      grid-area: number;
      user-select: none;
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

@media (min-width: 600px) {
  .list {
    width: 90%;

    .queue {
      border-left: 1px solid #000;
      border-right: 1px solid #000;
    }
  }
}

@media (min-width: 1024px) {
  .list {
    width: 100%;
    max-height: 85vh;

    .queue {
      border-left: 0;
      border-right: 0;
    }
  }
}
</style>
