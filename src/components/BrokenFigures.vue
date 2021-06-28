<template>
  <div class="brokenFigures">
    <span class="wrapper" :style="`max-width: ${15+(figureCount('pawn')*7)}px`">
      <img v-for="n in figureCount('pawn')" :key="n"
           class="figure" :src="pawn.path" :style="`left: ${-8*(n-1)}px`">
    </span>
    <span class="wrapper">
      <img v-for="n in figureCount('knight')" :key="n"
           class="figure" :src="knight.path" :style="`left: ${-8*(n-1)}px`">
    </span>
    <span class="wrapper">
      <img v-for="n in figureCount('bishop')" :key="n"
           class="figure" :src="bishop.path" :style="`left: ${-8*(n-1)}px`">
    </span>
    <span class="wrapper">
      <img v-for="n in figureCount('rook')" :key="n"
           class="figure" :src="rook.path" :style="`left: ${-8*(n-1)}px`">
    </span>
    <span class="wrapper">
      <img v-for="n in figureCount('queen')" :key="n"
           class="figure" :src="queen.path" :style="`left: ${-8*(n-1)}px`">
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Figure from '@/assets/interface/Figure';
import Types from '@/assets/enums/Types';
import Pawn from '@/assets/Figure/Pawn';
import Colour from '@/assets/enums/Colour';
import Knight from '@/assets/Figure/Knight';
import Bishop from '@/assets/Figure/Bishop';
import Rook from '@/assets/Figure/Rook';
import Queen from '@/assets/Figure/Queen';

export default defineComponent({
  name: 'BrokenFigures',
  props: {
    figures: {
      type: [] as PropType<Figure[]>,
      required: true,
    },
    colour: {
      type: Object as PropType<Colour>,
      required: true,
    },
  },
  data() {
    return {
      pawn: new Pawn(this.colour),
      knight: new Knight(this.colour),
      bishop: new Bishop(this.colour),
      rook: new Rook(this.colour),
      queen: new Queen(this.colour),
    };
  },
  methods: {
    figureCount(typeValue: string): number {
      const type = typeValue as Types;
      let count = 0;
      this.figures.forEach((figure) => {
        if (figure.type === type) count += 1;
      });
      return count;
    },
  },
});
</script>

<style lang="scss" scoped>
.brokenFigures {
  // position: relative;
  .wrapper {
    position: relative;
    left: 10px;
    img {
      position: absolute;
      display: inline-block;
      width: 15px;
      height: 15px;
    }
  }
}
</style>
