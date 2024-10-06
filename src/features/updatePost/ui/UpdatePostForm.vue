<script setup lang="ts">
import { Comment } from "@entities/comments";
import CustomInput from "@shared/ui/CustomInput/CustomInput.vue";
import CustomButton from "@shared/ui/CustomButton/CustomButton.vue";
import CustomTextarea from "@shared/ui/CustomTextarea/CustomTextarea.vue";

import { storeToRefs } from "pinia";

import { useUpdatePostStore } from "@features/updatePost/model/useUpdatePostStore";
import { ref } from "vue";

const postId = ref<string>("");

const updatePostStore = useUpdatePostStore();

const { postsComments, currentPostCopy } = storeToRefs(updatePostStore);

const onBlurPostId = () =>
  updatePostStore.setPost(postId.value ? +postId.value : null);
</script>
<template>
  <div class="UpdatePostForm">
    <div class="UpdatePostForm-form">
      <CustomInput
        class="UpdatePostForm-input"
        v-model="postId"
        placeholder="Идентификатор сообщения"
        type="number"
        @blur="onBlurPostId"
      />
      <template v-if="currentPostCopy">
        <CustomInput
          class="UpdatePostForm-input"
          v-model="currentPostCopy.title"
          placeholder="Название сообщения"
        />
        <CustomTextarea
          class="UpdatePostForm-input"
          v-model="currentPostCopy.body"
          placeholder="Текст сообщения"
        />
      </template>
    </div>

    <div class="UpdatePostForm-buttons">
      <CustomButton
        label="Отмена"
        theme="cancel"
        v-if="currentPostCopy"
        @click="updatePostStore.cancelUpdatePost()"
      />

      <CustomButton
        label="Обновить"
        theme="accept"
        v-if="currentPostCopy"
        @click="updatePostStore.updatePost()"
      />
    </div>

    <div class="UpdatePostForm-comments" v-if="postsComments.length">
      <label class="UpdatePostForm-labelComments">Комментарии</label>

      <div class="UpdatePostForm-commentsContainer">
        <Comment
          class="UpdatePostForm-comment"
          :comment="comment"
          v-for="comment in postsComments"
          :key="comment.id"
        />
      </div>
    </div>
  </div>
</template>
<style lang="sass">
.UpdatePostForm
  width: 400px

  &-input
    margin-bottom: 8px

    &:last-child
      margin-bottom: 0

  &-buttons
    display: flex
    justify-content: flex-end
    gap: 4px
    margin-bottom: 8px

  &-comments
    border-top: 1px solid var(--app-color-gray)
    padding-top: 8px

  &-commentsContainer
    max-height: 500px
    overflow-y: scroll

  &-comment
    margin-bottom: 4px

  &-labelComments
    font-weight: bold
</style>
