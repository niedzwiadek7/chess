<template>
  <div class="move">
    <img
      :src="generateImageLink()"
      alt=""
    >
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
      required: true,
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
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
  user-select: none;
  margin: .3rem .5rem;
  padding: .3rem .5rem;
  width: max-content;
  transition: all .2s ease-in-out;
  font-weight: bold;

  img {
    width: 1.7rem;
    height: 1.7rem;
    margin-right: .2rem;
  }

  &:hover {
    background-color: rgba(#000, .3);
    color: white;
    cursor: pointer;
    border-radius: 2px;
  }
}
</style>
