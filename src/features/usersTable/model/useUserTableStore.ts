import { PostsApiService } from "@entities/posts/api/PostsApiService";
import { UsersApiService } from "@entities/users/api/UsersApiService";
import { defineStore } from "pinia";
import {
  IUserPostTableRow,
  IUserTableRow,
  TUserTableRow,
} from "./IUserTableRow";
import { computed, reactive } from "vue";
import { IPost } from "@/entities/posts/api/IPost";

export const useUserTableStore = defineStore("userTableStore", () => {
  const parentItemsMap = reactive(new Map<string, Set<string>>());
  const itemsParentsMap = reactive(new Map<string, string>());
  const itemsMap = reactive(new Map<string, TUserTableRow>());
  const config = {
    idKey: "rowId",
    parentKey: "parent",
  };

  const fetchTableData = async () => {
    return [UsersApiService.getUsers(), PostsApiService.getPosts()];
  };

  const onSetItems = () => {
    if (!UsersApiService.users.length || !PostsApiService.posts.length) return;

    const users: IUserTableRow[] = UsersApiService.users.map((user) => ({
      username: user.username,
      name: user.name,
      companyName: user.company.name,
      website: user.website,
      id: user.id,
      rowId: user.id.toString(),
      parent: null,
      type: "user",
    }));

    const posts: IUserPostTableRow[] = PostsApiService.posts.map((post) => ({
      name: post.title,
      parent: post.userId.toString(),
      rowId: `Post:${post.id}`,
      id: post.id,
      type: "post",
    }));

    [...users, ...posts].forEach((item) => {
      let parentChildrenSet =
        parentItemsMap.get(item.parent) ?? new Set<string>();
      parentChildrenSet.add(item.rowId);

      itemsParentsMap.set(item.rowId, item.parent);
      parentItemsMap.set(item.parent, parentChildrenSet);
      itemsMap.set(item.rowId, item);
    });
  };

  const onUpdatePost = (post: IPost) => {
    const tablePostId = `Post:${post.id}`;

    const tablePost = itemsMap.get(tablePostId);

    tablePost.name = post.title;

    itemsMap.set(tablePostId, tablePost);
  };

  const items = computed(() => Array.from(itemsMap.values()));

  const getRootItems = () => {
    return Array.from(parentItemsMap.get(null) ?? []).map((childId) =>
      itemsMap.get(childId)
    );
  };

  const getChildren = (itemId: string) => {
    return Array.from(parentItemsMap.get(itemId) ?? []).map((childId) =>
      itemsMap.get(childId)
    );
  };

  const getParent = (itemId: string) => {
    const parentId = itemsParentsMap.get(itemId);
    return itemsMap.get(parentId);
  };

  const getLevel = (itemId: string) => {
    const parents = [];
    let currentParent = getParent(itemId);

    while (currentParent) {
      parents.push(currentParent);

      currentParent = getParent(currentParent.rowId);
    }

    return parents.length;
  };

  UsersApiService.on("setItems", onSetItems);
  PostsApiService.on("setItems", onSetItems);
  PostsApiService.on("updateItem", onUpdatePost);

  return {
    fetchTableData,
    items,
    getChildren,
    getRootItems,
    getParent,
    getLevel,
    config,
  };
});
