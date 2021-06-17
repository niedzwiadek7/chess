<template>
  <div class="wrapper">
    <div class="player">
      <img src="https://www.chess.com/bundles/web/images/user-image.007dad08.svg" class="photo">
      <span class="name"> {{ name }} </span>
    </div>
    <div class="timer">
      <span class="time">
        10 : 00
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Player',
  props: {
    name: {
      type: String as PropType<string>,
      required: true,
    },
  },
});

</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin: 1rem 2rem;
  height: 40px;
  width: 90%;
  user-select: none;

  .player {
    display: flex;
    align-self: start;

    .photo {
      width: 40px;
      height: 40px;
      margin-right: .7rem;
      border-radius: .2rem;
    }

    .name {
      margin-top: .1rem;
      font-size: 1.2rem;
      font-weight: bold;
    }
  }

  .timer {
    background-color: black;
    margin: 1rem;
    padding: .65rem 1.5rem;
    border-radius: .5rem;

    .time {
      font-size: 1.5rem;

      &::before {
        content: '\f017';
        font-family: FontAwesome;
        margin-right: .7rem;
      }
    }
  }
}

@media (min-width: 768px) {
  .wrapper {
    width: 75%;
    margin: 2rem auto;
  }
}
</style>
