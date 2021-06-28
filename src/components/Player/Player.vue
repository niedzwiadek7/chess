<template>
  <div class="wrapper">
    <div class="player">
      <img src="https://www.chess.com/bundles/web/images/user-image.007dad08.svg" class="photo">
      <div class="info-wrapper">
        <span class="name"> {{ player.name }} </span>
        <BrokenFigures :figures="player.broken" :colour="opponentPlayer()" />
      </div>
    </div>
    <Timer :time="player.time" @endTime="fun" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Colour from '@/assets/enums/Colour';
import Timer from '@/components/Player/Timer.vue';
import Player from '@/assets/interface/Player';
import BrokenFigures from '@/components/Player/BrokenFigures.vue';

export default defineComponent({
  name: 'Player',
  components: { Timer, BrokenFigures },
  props: {
    player: {
      type: Object as PropType<Player>,
      required: true,
    },
  },
  methods: {
    fun() {
      this.$emit('endTime');
    },
    opponentPlayer(): Colour {
      return this.player.colour === Colour.white ? Colour.black : Colour.white;
    },
  },
});

</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin: 1rem 2rem;
  height: 30px;
  width: 90%;
  user-select: none;

  .player {
    display: flex;
    align-self: start;

    .photo {
      width: 30px;
      height: 30px;
      margin-right: .7rem;
      border-radius: .2rem;
    }

    .name {
      margin-top: .1rem;
      font-size: 1.2rem;
      font-weight: bold;
      color: #eee;
    }
  }
}

@media (min-width: 768px) {
  .wrapper {
    width: 75%;
    margin: 2rem auto;
  }
}
</style>
