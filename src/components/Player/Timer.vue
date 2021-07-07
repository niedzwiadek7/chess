<template>
  <div :class="{'timer': true, 'active': timer.measure}">
    <i class="clock fas fa-stopwatch" />
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
  methods: {
    styleSeconds(value: number) {
      if (value < 10) return `0${value}`;
      return value;
    },
  },
});
</script>

<style lang="scss" scoped>
.timer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  margin: 1rem 0 1rem 1rem;
  padding: .8rem 1.5rem;
  border-radius: .5rem;
  min-width: 65px;

  .time {
    font-size: 1.25rem;
  }
}

.active {
  background-color: rgba(black, .4);
  transition: all .3s ease-in-out;
}

@media (min-width: 600px) {
  .timer {
    padding: 1rem 1.8rem;
    min-width: 90px;
    .time {
      font-size: 1.5rem;
    }
    .clock {
      font-size: 1.7rem;
    }
  }
}

@media (min-width: 1366px) {
  .timer {
    padding: 1.2rem 2.7rem;
    .time {
      font-size: 1.6rem;
    }
  }
}

@media(min-width: 1440px) {
  .timer {
    min-width: 110px;
    padding: 1.4rem 3rem;

    .time {
      font-size: 1.8rem;
    }
  }
}
</style>
