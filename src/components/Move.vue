<template>
  <div class="move">
    <img :src="generateImageLink()" alt="" />
    <span class="value"> {{ findElem() }} </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import RecordMove from '@/assets/class/RecordMove';

export default defineComponent({
  name: 'Move',
  props: {
    move: {
      type: Object as PropType<RecordMove>,
      required: false,
    },
  },
  methods: {
    findElem(): string {
      return this.move?.value || '';
    },
    generateImageLink(): string {
      return this.move?.figure.path || '#';
    },
  },
});
</script>

<style lang="scss" scoped>
.move {
  display: flex;
  align-items: center;
  padding: .2rem .5rem;
  position: absolute;
  top: -1.6rem;
  user-select: none;

  img {
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
  }

  .value {
    font-size: 1.3rem;
  }

  &:hover {
    background-color: #444;
    cursor: pointer;
    border-radius: 3px;
  }
}
</style>
