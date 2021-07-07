<template>
  <div class="groupFieldPerpendicularly">
    <div
      v-for="n in 8"
      :key="n"
      class="fieldDescription"
    >
      {{ n }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GroupFieldPerpendicularly',
});
</script>

<style lang="scss" scoped>
@use '../../assets/scss/fieldDescription' as desc;

.groupFieldPerpendicularly {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: .5%;
  top: -5%;
  height: 100%;
  justify-content: space-around;
  overflow: hidden;
  user-select: none;

  .fieldDescription {
    @include desc.fieldDescription;

    &:nth-child(2n) {
      color: black;
    }
  }
}

@media (min-width: 500px) {
  .groupFieldPerpendicularly {
    .fieldDescription {
      font-size: .9rem;
    }
  }
}

@media (min-width: 1366px) {
  .groupFieldPerpendicularly {
    .fieldDescription {
      font-size: 1.1rem;
    }
  }
}
</style>
