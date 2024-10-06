<script setup lang="ts">
import { IComment } from "@entities/comments/api/IComment";

defineProps<{
  comment: IComment;
}>();
</script>
<template>
  <div class="Comment">
    <div class="Comment-email">{{ comment.email }}</div>
    <div class="Comment-name">{{ comment.name }}</div>
    <div class="Comment-body">{{ comment.body }}</div>
  </div>
</template>
<style lang="sass">
.Comment
  width: 100%
  border: 1px solid rgb(228, 228, 228)
  border-radius: 4px
  padding: 4px 8px

  &-email
    font-size: 12px
    font-style: italic
    color: rgb(38, 123, 215)

  &-name
    font-weight: bold
</style>
