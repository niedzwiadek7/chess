<template>
  <div class="area" :class="{ blankArea: isBlank }" @click="activated()" :id="position.index"
  @dragover.prevent @drop.prevent="drop">
    <div class="wrapper"
         :class="[{ active: callActivated }, { possibleMove: callMoving },
         { isCheck: isChecking }]">
         <Figure :figure="position.figure" :position="position.index" @choose="activated" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Position from '@/assets/interface/Position';
import Types from '@/assets/enums/Types';
import Player from '@/assets/interface/Player';
import Figure from '@/components/Figure.vue';

export default defineComponent({
  name: 'Area',
  components: { Figure },
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
    activated() {
      if (this.position.figure?.colour === this.player.colour) {
        this.$emit('active', this.position);
      } else if (this.position.handlePosition?.classList.contains('possibleMove')) {
        // eslint-disable-next-line no-unused-expressions
        this.$emit('move', this.active?.figure?.move(this.active, this.position));
        this.$emit('active', this.active);
      }
    },
    drop(e: any) {
      console.log(this.active);
      console.log(this.position);

      if (this.position.handlePosition?.classList.contains('possibleMove')) {
        // eslint-disable-next-line no-unused-expressions
        this.$emit('move', this.active?.figure?.move(this.active, this.position));
        this.$emit('active', this.active);
      }
    },
  },
  computed: {
    isBlank(): boolean {
      return ((this.position.horizontally.charCodeAt(0)
        + this.position.perpendicularly) % 2 !== 0);
    },
    callActivated(): boolean {
      return this.position === this.active;
    },
    callMoving(): boolean {
      return this.active !== null
        && this.active?.figure?.possibleMoving.findIndex((el) => el === this.position) !== -1;
    },
    isChecking(): boolean {
      return this.player.isChecked === true
        && this.position.figure?.type === Types.king
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
