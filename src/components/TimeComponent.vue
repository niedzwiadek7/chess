<template>
  <div class="wrapper">
    <div class="bar">
      <div class="time"> {{ generateTime }} </div>
      <div class="status" :style="`width: ${time / 6}%`"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TimeComponent',
  props: {
    time: {
      type: Number as PropType<(number | undefined)>,
      required: true,
    },
  },
  computed: {
    generateTime(): string {
      if (this.time !== undefined) {
        const minutes: number = Math.floor(this.time / 60);
        let seconds: (string | number) = this.time % 60;
        if (minutes > 0 && seconds < 10) seconds = `0${seconds}`;
        if (minutes > 0) return `${minutes}:${seconds}`;
        return `${seconds}s`;
      }
      return '';
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 90%;
  display: flex;
  justify-content: flex-end;
  padding-top: 2px;
  padding-bottom: 2px;

  .bar {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 8px;
    margin-left: 5px;

    .status {
      margin-left: 4px;
      height: 100%;
      background-color: white;
      border-radius: 10%;
    }

    .time {
      font-size: 0.75em;
    }
  }
}

</style>
