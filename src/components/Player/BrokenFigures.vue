<template>
  <div class="brokenFigures">
    <span
      v-if="figureCount('pawn') > 0 || true"
      class="wrapper"
      :style="`max-width: ${imgWidth+((figureCount('pawn') -1) * (imgWidth * 0.45))}px`"
    >
      <img
        v-for="n in figureCount('pawn')"
        :key="n"
        alt=""
        class="figure"
        :src="pawn.path"
        :style="`transform: translateX(${-55*(n-1)}%)`"
      >
    </span>
    <span
      v-if="figureCount('knight') > 0 || true"
      class="wrapper"
      :style="`max-width: ${imgWidth+((figureCount('knight') -1) * (imgWidth * 0.45))}px`"
    >
      <img
        v-for="n in figureCount('knight')"
        :key="n"
        alt=""
        class="figure"
        :src="knight.path"
        :style="`transform: translateX(${-55*(n-1)}%)`"
      >
    </span>
    <span
      v-if="figureCount('bishop') > 0 || true"
      class="wrapper"
      :style="`max-width: ${imgWidth+((figureCount('bishop') -1) * (imgWidth * 0.45))}px`"
    >
      <img
        v-for="n in figureCount('bishop')"
        :key="n"
        alt=""
        class="figure"
        :src="bishop.path"
        :style="`transform: translateX(${-55*(n-1)}%)`"
      >
    </span>
    <span
      v-if="figureCount('rook') > 0 || true"
      class="wrapper"
      :style="`max-width: ${imgWidth+((figureCount('rook') -1) * (imgWidth * 0.45))}px`"
    >
      <img
        v-for="n in figureCount('rook')"
        :key="n"
        alt=""
        class="figure"
        :src="rook.path"
        :style="`transform: translateX(${-55*(n-1)}%)`"
      >
    </span>
    <span
      v-if="figureCount('queen') > 0 || true"
      class="wrapper"
      :style="`max-width: ${imgWidth+((figureCount('queen') -1) * (imgWidth * 0.45))}px`"
    >
      <img
        v-for="n in figureCount('queen')"
        :key="n"
        alt=""
        class="figure"
        :src="queen.path"
        :style="`transform: translateX(${-55*(n-1)}%)`"
      >
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
      imgWidth: 15 as number,
    };
  },
  mounted() {
    this.widthOperation();
    window.addEventListener('resize', this.widthOperation);
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
    widthOperation() {
      const widthInner = window.innerWidth;
      if (widthInner < 600) this.imgWidth = 15;
      else if (widthInner < 1024) this.imgWidth = 20;
      else if (widthInner < 1440) this.imgWidth = 25;
      else this.imgWidth = 30;
    },
  },
});
</script>

<style lang="scss" scoped>
.brokenFigures {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 2px;
  max-width: max-content;

  .wrapper {
    display: flex;
    flex-direction: row;
    img {
      display: inline-block;
      width: 15px;
      height: 15px;
    }
  }
}

@media (min-width: 600px) {
  .brokenFigures {
    .wrapper {
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}

@media (min-width: 1024px) {
  .brokenFigures {
    .wrapper {
      img {
        width: 25px;
        height: 25px;
      }
    }
  }
}

@media (min-width: 1440px) {
  .brokenFigures {
    .wrapper {
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
