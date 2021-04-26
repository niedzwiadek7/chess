<template>
  <div class="area" :class="{ blankArea: isBlank() }">
    <img v-show="typeof(figure)!=='undefined'" :src="figure?.path" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Position from '@/assets/interface/Position';
import Figure from '@/assets/interface/Figure';

export default defineComponent({
  name: 'Area',
  props: {
    position: {
      type: Object as PropType<Position>,
      require: true,
      default() {
        return {
          horizontally: 'A',
          perpendicularly: 1,
        };
      },
    },
    figure: {
      type: Object as PropType<(Figure | undefined)>,
      default() {
        return undefined;
      },
    },
  },
  methods: {
    isBlank() {
      return ((this.position.horizontally.charCodeAt(0) + this.position.perpendicularly) % 2 !== 0);
    },
  },
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.area {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12.5%;
  height: 12.5%;
  margin: 0;
  background: #630;

  img {
    width: 90%;
    height: 90%;
  }
}

.blankArea {
  background: #fc6;
}
</style>
