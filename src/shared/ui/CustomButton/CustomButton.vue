<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    label: string;
    theme: string;
  }>(),
  { theme: "accept" }
);

const theme = props.theme;

const emit = defineEmits<{ (e: "click", data: MouseEvent): void }>();
</script>
<template>
  <div
    class="CustomButton"
    @click="emit('click', $event)"
    :class="{ [`CustomButton-theme-${theme}`]: theme }"
  >
    {{ label }}
  </div>
</template>
<style lang="sass">
.CustomButton
  color: white
  cursor: pointer
  display: inline-block
  padding: 4px 8px
  border-radius: 4px

  &:hover
      opacity: 0.75

  &-theme
    &-accept
      background-color: var(--app-color-blue)
    &-cancel
      background-color: var(--app-color-red)
</style>
