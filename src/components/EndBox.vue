<template>
  <div class="endBox">
    Koniec gry
    <div> Wygrały {{ winner.winner.colour }} </div>
  </div>
</template>

<script lang="ts">
import Colour from '@/assets/enums/Colour';
import { defineComponent, PropType } from 'vue';
import Player from '@/assets/interface/Player';
import EndGame from '@/assets/interface/EndGame';

export default defineComponent({
  name: 'EndBox',
  props: {
    winner: {
      type: Object as PropType<EndGame>,
      required: true,
    },
  },
});

</script>

<style lang="scss" scoped>
  .endBox {
    background-color: black;
    color: white;
    position: absolute;
    top: 25%;
    left: 25%;
    width: 50%;
    height: 50%;
    opacity: .95;
    border-radius: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
