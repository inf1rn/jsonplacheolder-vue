import { IComment } from "@entities/comments";
import { CommentsApiService } from "@entities/comments";
import { IPost } from "@entities/posts";
import { PostsApiService } from "@entities/posts";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUpdatePostStore = defineStore("updatePostStore", () => {
  const postsComments = ref<IComment[]>([]);
  const currentPostCopy = ref<null | IPost>(null);
  const currentPost = ref<null | IPost>(null);

  const getPostComments = async (postId: number) => {
    const res = await CommentsApiService.getPostComments(postId);

    postsComments.value = res;
  };

  const updatePost = async () => {
    const res = await PostsApiService.updatePost(
      currentPostCopy.value.id,
      currentPostCopy.value
    );

    if (!res) currentPostCopy.value = { ...currentPost.value };
    else currentPost.value = { ...currentPostCopy.value };
  };

  const cancelUpdatePost = async () => {
    currentPostCopy.value = { ...currentPost.value };
  };

  const setPost = async (postId: number | null) => {
    clear();
    if (postId === null) return;

    const post = await PostsApiService.getPost(postId);

    if (post) {
      currentPost.value = post;
      currentPostCopy.value = { ...post };

      getPostComments(postId);
    }
  };

  const clear = () => {
    currentPost.value = null;
    currentPostCopy.value = null;
    postsComments.value = [];
  };

  return {
    postsComments,
    updatePost,
    setPost,
    currentPostCopy,
    cancelUpdatePost,
  };
});
