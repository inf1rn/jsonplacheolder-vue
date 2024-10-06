import { defaultAxios } from "@shared/api/defaultAxios";
import { IComment } from "./IComment";
import { Observer } from "@shared/lib/Observer";

class CommentsApiService extends Observer {
  private _postComments = new Map<number, IComment[]>();

  get comments() {
    return Array.from(this._postComments);
  }

  async getPostComments(postId: number) {
    if (this._postComments.has(postId)) return this._postComments.get(postId);

    const comments = await defaultAxios.get<IComment[]>(
      `post/${postId}/comments`
    );

    if (!comments) return;

    this._setPostComments(postId, comments.data);
    return comments.data;
  }

  private _setPostComments(postId: number, comments: IComment[]) {
    this._postComments.set(postId, comments);
    this.emit("setPostComments", comments);
  }
}

const instance = new CommentsApiService();

export { instance as CommentsApiService };
