import { defaultAxios } from "@/shared/api/defaultAxios";
import { IPost } from "./IPost";

import { Observer } from "@shared/lib/Observer";

class PostsApiService extends Observer {
  private _posts = new Map<number, IPost>();

  get posts() {
    return Array.from(this._posts.values());
  }

  async getPost(postId: number) {
    if (this._posts.has(postId)) return this._posts.get(postId);

    const res = await defaultAxios.get<IPost | undefined>(`posts/${postId}`);
    return res.data;
  }

  async getPosts() {
    if (this._posts.size) return this._posts;

    const posts = await defaultAxios.get<IPost[]>("posts");

    if (!posts) return;

    this._setItems(posts.data);
  }

  async updatePost(id: number, post: IPost) {
    const oldPost = this._posts.get(id);
    if (!oldPost) return;

    this._updateItem(post);

    const res = await defaultAxios.put<IPost>(`posts/${id}`, post);
    if (res.status !== 200) this._updateItem(oldPost);

    return res.status === 200;
  }

  private _setItems(posts: IPost[]) {
    posts.forEach((post) => this._posts.set(post.id, post));
    this.emit("setItems", posts);
  }

  private _updateItem(post: IPost) {
    this._posts.set(post.id, post);
    this.emit("updateItem", post);
  }
}

const instance = new PostsApiService();

export { instance as PostsApiService };
