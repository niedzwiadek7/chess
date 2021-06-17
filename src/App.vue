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
html {
  font-size: 10px;
}

body {
  margin: 0;
  background-color: #333;
  color: #ddd;
}

#app {
  margin: 0;
}

@media (min-width: 600px) {
  html {
    font-size: 12px;
  }
}
</style>
