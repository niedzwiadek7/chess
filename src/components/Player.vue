<template>
  <div class="wrapper">
    <div class="player">
      <img src="https://www.chess.com/bundles/web/images/user-image.007dad08.svg" class="photo">
      <span class="name"> {{ player.name }} </span>
    </div>
    <Timer :time="player.time" @endTime="fun" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Timer from '@/components/Timer.vue';
import Player from '@/assets/interface/Player';

export default defineComponent({
  name: 'Player',
  components: { Timer },
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
  height: 40px;
  width: 90%;
  user-select: none;

  .player {
    display: flex;
    align-self: start;

    .photo {
      width: 40px;
      height: 40px;
      margin-right: .7rem;
      border-radius: .2rem;
    }

    .name {
      margin-top: .1rem;
      font-size: 1.2rem;
      font-weight: bold;
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
