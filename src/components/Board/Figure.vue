<template>
  <img
    v-show="figure !== undefined"
    :id="`${figure?.name}_${position}`"
    class="figure"
    :src="figure?.path"
    alt=""
    :draggable="draggable"
    @dragstart="dragStart"
  >
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
      required: false,
      default() {
        return {};
      },
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
    transition: all 1s;
    display: inline-block;
    width: 90%;
    height: 90%;
    user-select: none;
  }

  .fade-leave-active {
    transition: all 2s ease-in-out;
  }

  .fade-leave-to {
    opacity: 0;
  }
</style>
