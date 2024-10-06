<script lang="ts" setup>
const model = defineModel();

withDefaults(
  defineProps<{
    disabled?: boolean;
    placeholder?: string;
    type?: string;
  }>(),
  {
    type: "text",
  }
);

const emit = defineEmits<{ (e: "blur"): void }>();
</script>

<template>
  <input
    :type="type"
    class="CustomInput"
    :class="{ 'CustomInput-disabled': disabled }"
    :disabled="disabled"
    :placeholder="placeholder"
    v-model="model"
    @blur="emit('blur')"
  />
</template>
<style lang="sass">
.CustomInput
    padding: 4px 8px
    font-size: 13px
    border: 1px solid var(--app-color-gray)
    outline: 0
    border-radius: 3px
    width: 100%

    &::placeholder
      font-size: 13px
      font-style: italic

    &:focus
      border: 1px solid var(--app-color-blue)!important

    &[type="number"]::-webkit-outer-spin-button,
    &[type="number"]::-webkit-inner-spin-button
      -webkit-appearance: none
      margin: 0

    &[type="number"]
      -moz-appearance: textfield
</style>
