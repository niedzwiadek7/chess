<template>
  <div class="area" :class="{ blankArea: isBlank }" @click="activated()" :id="position.index"
  @dragover.prevent @drop.prevent="drop">
    <div class="wrapper"
         :class="[{ active: callActivated }, { possibleMove: callMoving },
         { isCheck: isChecking }, { possibleAttack: callMoving && position.figure }]">
         <Figure :figure="position.figure" :position="position.index" @choose="activated" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Position from '@/assets/interface/Position';
import Types from '@/assets/enums/Types';
import Player from '@/assets/interface/Player';
import Figure from '@/components/Board/Figure.vue';

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
        this.$emit('move', this.active, this.position);
        this.$emit('active', this.active);
      } else if (this.active !== null) {
        this.$emit('active', this.active);
      }
    },
    drop(e: any) {
      this.activated();
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
      return this.player.isChecked && this.position.figure?.type === Types.king
        && this.player.colour === this.position.figure?.colour
        && this.position !== this.active;
    },
  },
});

</script>

<style scoped lang="scss">
.area {
  width: 12.5%;
  height: 12.5%;
  margin: 0;
  background: #630;

  .wrapper {
    position: relative;
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
    &::after {
      content: '';
      display: block;
      width: 32%;
      height: 32%;
      background-color: rgba(#000, .25);
      border-radius: 50%;
    }
  }

  .possibleAttack {
    &::after {
      content: '';
      box-sizing: border-box;
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      background-color: unset;
      border: 3px solid rgba(#000, .5);
    }
  }

  .isCheck {
    background-color: rgba(255, 0, 0, 0.3);
  }
}

.blankArea {
  background: #fc6;
}

@media (min-width: 450px) {
  .area {
    .possibleAttack {
      &::after {
        border: 4px solid rgba(#000, .5);
      }
    }
  }
}

@media (min-width: 600px) {
  .area {
    .possibleAttack {
      &::after {
        border: 5px solid rgba(#000, .5);
      }
    }
  }
}

@media (min-width: 1440px) {
  .area {
    .possibleAttack {
      &::after {
        border: 6px solid rgba(#000, .5);
      }
    }
  }
}
</style>
