<template>
  <img class="figure" v-show="figure !== undefined" :src="figure?.path" alt=""
       :id="`${figure?.name}_${position}`"
       :draggable="draggable" @dragstart="dragStart" @dragover.stop />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Figure from '@/assets/interface/Figure';

export default defineComponent({
  name: 'Figure',
  props: {
    figure: {
      type: Object as PropType<(Figure | undefined)>,
      default() {
        return undefined;
      },
    },
    draggable: {
      type: Object as PropType<any>,
    },
    position: {
      type: String as PropType<string>,
      default() {
        return '';
      },
    },
  },
  methods: {
    dragStart(e: any) {
      if (this.figure !== undefined) {
        this.$emit('choose');
      }
    },
  },
});
</script>

<style lang="scss" scoped>
  img {
    width: 90%;
    height: 90%;
  }
</style>
