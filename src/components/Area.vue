<template>
  <div class="area"
       :class="{ blankArea: isBlank() }"
       :id="position.index"
       @click="activated()"
  >
    <div class="wrapper">
      <img v-show="typeof(figure)!=='undefined'" :src="figure?.path" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Position from '@/assets/interface/Position';
import Figure, * as FigureModule from '@/assets/interface/Figure';
import board from '@/assets/TemplateStartBoard';

export default defineComponent({
  name: 'Area',
  props: {
    position: {
      type: Object as PropType<Position>,
      require: true,
      default() {
        return {
          horizontally: 'A',
          perpendicularly: 1,
        };
      },
    },
    figure: {
      type: Object as PropType<(Figure | undefined)>,
      default() {
        return undefined;
      },
    },
    active: {
      type: Object as PropType<(Figure | null)>,
      default() {
        return null;
      },
    },
    board: {
      type: Array as PropType<(Figure | undefined)[][]>,
      default() {
        return [[]];
      },
    },
    player: {
      type: String as PropType<FigureModule.Color>,
      default() {
        return FigureModule.Color.white;
      },
    },
  },
  methods: {
    isBlank(): boolean {
      return ((this.position.horizontally.charCodeAt(0) + this.position.perpendicularly) % 2 !== 0);
    },
    activated(): void {
      if (this.figure?.color === this.player) {
        this.$emit('changeActive', this.figure);
        if (this.position.handlePosition()?.classList.contains('active')) {
          // eslint-disable-next-line no-unused-expressions
          this.position.handlePosition()?.classList.remove('active');
          this.figure.possibleMoves(this.board).forEach((el) => {
            // eslint-disable-next-line no-unused-expressions
            el.handlePosition()?.classList.remove('possibleMove');
          });
        } else {
          // eslint-disable-next-line no-unused-expressions
          this.position.handlePosition()?.classList.add('active');
          // eslint-disable-next-line no-unused-expressions
          this.figure.possibleMoves(this.board).forEach((el) => { el.handlePosition()?.classList.add('possibleMove'); });
        }
      } else if (this.active !== null) this.move();
    },
    move() {
      // eslint-disable-next-line max-len
      if (this.active?.possibleMoves(this.board).findIndex((el) => el.index === this.position.index) !== -1) {
        // eslint-disable-next-line no-unused-expressions
        this.active?.possibleMoves(this.board).forEach((el) => {
          // eslint-disable-next-line no-unused-expressions
          el.handlePosition()?.classList.remove('possibleMove');
        });
        // eslint-disable-next-line no-unused-expressions
        this.active?.position.handlePosition()?.classList.remove('active');
        // eslint-disable-next-line no-unused-expressions
        this.active?.move(board, this.position);
        this.$emit('changeActive', this.active);
        this.$emit('move');
      } else console.log('no nie');
    },
  },
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.area {
  width: 12.5%;
  height: 12.5%;
  margin: 0;
  background: #630;

  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 90%;
      height: 90%;
    }
  }

  .active {
    background-color: rgba(0, 255, 0, 0.4);
  }

  .possibleMove {
    background-color: rgba(0, 255, 0, 0.2);
  }

  .checked {
    background-color: rgba(255, 0, 0, 0.3);
  }

}

.blankArea {
  background: #fc6;
}

</style>
