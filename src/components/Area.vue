<template>
  <div class="area" :class="{ blankArea: isBlank() }" @click="activated()" :id="position.index">
    <div class="wrapper"
         :class="[{ active: callActivated() }, { possibleMove: callMoving() },
         { isCheck: isChecking() }]">
      <img v-show="position.figure !== undefined" :src="position.figure?.path" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Position from '@/assets/interface/Position';
import * as FigureModule from '@/assets/interface/Figure';
import Player from '@/assets/interface/Player';

export default defineComponent({
  name: 'Area',
  props: {
    position: {
      type: Object as PropType<Position>,
      required: true,
    },
    active: {
      type: Object as PropType<(null | Position)>,
      default() {
        return null;
      },
    },
    player: {
      type: Object as PropType<Player>,
      required: true,
    },
  },
  methods: {
    isBlank() {
      return ((this.position.horizontally.charCodeAt(0)
        + this.position.perpendicularly) % 2 !== 0);
    },
    activated() {
      if (this.position.figure !== undefined
        && this.position.figure.colour === this.player.colour) {
        this.$emit('active', this.position);
      } else if (this.position.handlePosition?.classList.contains('possibleMove')) {
        // eslint-disable-next-line max-len
        this.$emit('move', this.active?.figure?.move(this.active, this.position));
        this.$emit('active', this.active);
      }
    },
    callActivated() {
      return this.position === this.active;
    },
    callMoving() {
      return this.active !== null
      && this.active?.figure?.possibleMoving.findIndex((el) => el === this.position) !== -1;
    },
    isChecking() {
      return this.player.isChecked === true
        && this.position.figure?.type === FigureModule.Types.king
        && this.player.colour === this.position.figure?.colour
        && this.position !== this.active;
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

  img {
    width: 90%;
    height: 90%;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .active {
    background-color: rgba(0, 255, 0, 0.4);
  }

  .possibleMove {
    background-color: rgba(0, 255, 0, 0.15);
  }

  .isCheck {
    background-color: rgba(255, 0, 0, 0.3);
  }
}

.blankArea {
  background: #fc6;
}
</style>
