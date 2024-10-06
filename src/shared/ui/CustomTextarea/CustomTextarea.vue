<script lang="ts" setup>
const model = defineModel<string>();

defineProps<{
  disabled?: boolean;
  placeholder?: string;
}>();

const emit = defineEmits<{ (e: "blur"): void }>();
</script>

<template>
  <textarea
    rows="auto"
    class="CustomTextarea"
    :class="{ 'CustomTextarea-disabled': disabled }"
    v-model="model"
    @blur="emit('blur')"
    :disabled="disabled"
    :placeholder="placeholder"
  />
</template>
<style lang="sass">
.CustomTextarea
    padding: 4px 8px
    font-size: 13px
    resize: none
    min-height: 120px

    border: 1px solid var(--app-color-gray)
    background: none
    outline: 0
    border-radius: 3px
    width: 100%

    &::placeholder
      font-size: 13px
      font-style: italic

    &:focus
      border: 1px solid var(--app-color-blue)
</style>
