<template>
  <div class="sidebar">
    <div class="moveArray">
      <h3> Moves list </h3>
      <ol class="list">
        <li v-for="n in Math.floor((moves.length+1)/2)" :key="n" class="queue">
          <ul class="queueList">
            <li :key="2*(n-1)" class="element">
              <Move :move="getMove(2*(n-1))" />
            </li>
            <li :key="2*(n-1)+1" class="element">
              <Move v-show="getMove(2*(n-1)+1) !== undefined" :move="getMove(2*(n-1)+1)" />
            </li>
          </ul>
        </li>
      </ol>
    </div>
    <div class="options">
      <div class="option">
        <i class="fas fa-plus"></i>
      </div>
      <div class="option">
        <i class="fas fa-chart-area"></i>
      </div>
      <div class="option">
        <i class="fas fa-backward"></i>
      </div>
      <div class="option">
        <i class="fas fa-forward"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import RecordMove from '@/assets/class/RecordMove';
import Move from '@/components/Move.vue';

export default defineComponent({
  name: 'SidePanel',
  props: {
    moves: {
      type: Object as PropType<RecordMove[]>,
      required: true,
    },
  },
  components: {
    Move,
  },
  methods: {
    getMove(n: number): RecordMove {
      return this.moves[n];
    },
  },
});
</script>

<style lang="scss" scoped>
  .sidebar {
    width: 100%;
    background-color: #222;
    margin-bottom: 50px;

    .moveArray {
      margin: 5%;
      width: 90%;
      font-size: 1.4rem;

       .list {
        list-style-position: inside;

        .queue {
          padding-left: 1rem;
          padding-top: .7rem;
          padding-bottom: .7rem;

          .queueList {
            display: inline-flex;
            justify-content: space-around;
            padding-left: 0;
            align-items: center;
            width: 70%;
            list-style: none;
            position: relative;
          }

          &:nth-child(2n) {
            background-color: #333;
          }
        }
      }

      h3 {
        font-weight: normal;
      }
    }

    .options {
      width: 90%;
      height: 50px;
      background-color: #111;
      position: fixed;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 5%;

      .option {
        cursor: pointer;
        font-size: 2rem;
      }
    }
  }
</style>
