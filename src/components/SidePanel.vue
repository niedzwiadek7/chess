<template>
  <div class="sidebar">
    <div class="moveArray">
      <h3> Moves list </h3>
      <MovesArray :moves="moves" />
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
    <div class="game-options">
      <span class="surrender">
        <i class="fas fa-flag"> </i> Poddaj się
      </span>
      <span class="draw">
        <i class="fas fa-handshake"></i> Remis
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import RecordMove from '@/assets/class/RecordMove';
import MovesArray from '@/components/MovesArray.vue';

export default defineComponent({
  name: 'SidePanel',
  props: {
    moves: {
      type: [] as PropType<RecordMove[]>,
      required: true,
    },
  },
  components: {
    MovesArray,
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
    position: relative;
    width: 100%;
    background-color: #222;
    margin-bottom: 50px;
    min-height: 200px;

    .moveArray {
      margin: 5% 5% 40px 0;
      width: 100%;
      font-size: 1.1rem;

      h3 {
        user-select: none;
        margin-left: 20px;
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
      z-index: 5;

      .option {
        cursor: pointer;
        font-size: 2rem;
      }
    }

    .game-options {
      position: absolute;
      left: 20px;
      bottom: 15px;
      font-size: 1.1rem;

      .surrender {
        margin-right: 10px;
        i {
          transform: rotate(-25deg);
        }
      }

      .surrender, .draw {
        transition: all .2s ease-in-out;
        padding: .6rem;
        border-radius: 5px;
        cursor: pointer;
        z-index: 1;

        &:hover {
          background-color: rgba(#000, .3);
        }
      }
    }
  }
</style>
