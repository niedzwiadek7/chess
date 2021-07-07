<template>
  <div class="sidebar">
    <div class="moveArray">
      <h3> Lista ruchów </h3>
      <MovesArray :moves="moves" />
    </div>
    <div class="options">
      <div class="new-game option">
        <i class="fas fa-plus" />
        <span class="new"> Rozpocznij nową grę </span>
      </div>
      <div class="statistics option">
        <i class="fas fa-chart-area" />
        <span class="stat"> Ta funkcja jest obecnie niedostępna </span>
      </div>
      <div class="previous-move option">
        <i class="fas fa-backward" />
        <span class="prev"> Poprzedni ruch </span>
      </div>
      <div class="next-move option">
        <i class="fas fa-forward" />
        <span class="next"> Następny ruch </span>
      </div>
    </div>
    <div class="game-options">
      <span class="surrender">
        <i class="fas fa-flag" /> Poddaj się
      </span>
      <span class="draw">
        <i class="fas fa-handshake" /> Remis
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import RecordMove from '@/assets/class/RecordMove';
import MovesArray from '@/components/SidePanel/MovesArray.vue';

export default defineComponent({
  name: 'SidePanel',
  components: {
    MovesArray,
  },
  props: {
    moves: {
      type: [] as PropType<RecordMove[]>,
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
  .sidebar {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    background-color: #222;
    padding-bottom: 50px;
    // min-height: 200px;

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
        position: relative;
        cursor: pointer;
        font-size: 2rem;

        span {
          position: absolute;
          bottom: 55px;
          left: -32px;
          display: flex;
          align-items: center;
          justify-content: center;
          visibility: hidden;
          padding: 10px;
          text-align: center;
          font-size: 1rem;
          color: white;
          width: 60px;
          background-color: lighten(black, 10%);
          border-radius: 10px;
          transition: all .15s ease-in-out;

          &:after {
            content: '';
            position: absolute;
            bottom: -20%;
            display: block;
            width: 0;
            height: 0;
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            border-top: 15px solid lighten(black, 10%);
          }
        }

        &:hover {
          span {
            transform: translateY(20px);
            visibility: visible;
          }
        }
      }

      .statistics {
        color: rgba(white, .35);
      }
    }

    .game-options {
      display: flex;
      flex-wrap: wrap;
      position: absolute;
      left: 20px;
      bottom: 55px;
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

@media (min-width: 450px) {
  .sidebar {

    .game-options {
      .surrender, .draw {
        padding: .9rem;
      }
    }
  }
}

@media (min-width: 768px) {
  .sidebar {
    padding-bottom: 70px;
    .moveArray {
      h3 {
        font-size: 1.4rem;
      }
    }

    .options {
      .option {
        span {
          left: -35px;
          padding: 15px;
          font-size: 1.2rem;
        }
      }
    }

    .game-options {
      .surrender, .draw {
        font-size: 1.3rem;
      }
    }
  }
}

@media (min-width: 1024px) {
  .sidebar {
    height: 100%;

    .moveArray {
      margin: 0;
      h3 {
        display: none;
      }
    }

    .options {
      position: absolute;
      bottom: 0;
    }

    .game-options {
      bottom: 60px;
    }
  }
}
</style>
