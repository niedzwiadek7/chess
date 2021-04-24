<template>
  <Board />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Area from './components/Area.vue';
import Board from './components/Board.vue';

@Options({
  data() {
    return {
      msg: 'Damian',
    };
  },
  components: {
    Area,
    Board,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  margin: 0;
  background-image: url('./assets/images/wallpaper.png');
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
