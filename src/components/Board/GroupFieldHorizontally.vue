<template>
  <div class="groupFieldHorizontally">
    <div class="fieldDescription" v-for="n in 8" :key="n">
      {{ String.fromCharCode(64+n) }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'groupFieldHorizontally',
});
</script>

<style lang="scss" scoped>
@use '../../assets/scss/fieldDescription' as desc;

.groupFieldHorizontally {
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  bottom: 0;
  right: -5%;
  width: 100%;
  justify-content: space-around;
  user-select: none;

  .fieldDescription {
    @include desc.fieldDescription;

    &:nth-child(2n - 1) {
      color: black;
    }
  }
}

@media (min-width: 500px) {
  .groupFieldHorizontally {
    .fieldDescription {
      font-size: .9rem;
    }
  }
}

@media (min-width: 1366px) {
  .groupFieldHorizontally {
    .fieldDescription {
      font-size: 1.1rem;
    }
  }
}
</style>
