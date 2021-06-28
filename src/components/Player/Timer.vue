<template>
  <div :class="{'timer': true, 'active': timer.measure}">
    <span class="time">
      {{ timer.minutes }} : {{ styleSeconds(timer.seconds) }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Time from '@/assets/interface/Time';

export default defineComponent({
  name: 'Timer',
  props: {
    time: {
      type: Object as PropType<Time>,
      required: true,
    },
  },
  data() {
    return {
      timer: this.time,
      interval: 0 as number,
    };
  },
  methods: {
    styleSeconds(value: number) {
      if (value < 10) return `0${value}`;
      return value;
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.time.measure) {
        if (this.time.minutes === 0 && this.time.seconds === 0) {
          this.$emit('endTime');
          clearInterval(this.interval);
        } else {
          if (this.timer.seconds === 0) {
            this.timer.seconds = 60;
            this.timer.minutes -= 1;
          }
          this.timer.seconds -= 1;
        }
      }
    }, 1000);
  },
});
</script>

<style lang="scss" scoped>
.timer {
  background-color: black;
  margin: 1rem;
  padding: .65rem 1.5rem;
  border-radius: .5rem;

  .time {
    font-size: 1.25rem;

    &::before {
       content: '\f017';
       font-family: FontAwesome;
       margin-right: .7rem;
     }
  }
}

.active {
  background-color: lighten(black, 35%);
}
</style>
