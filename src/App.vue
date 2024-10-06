<script lang="ts" setup>
import { UpdatePostForm } from "@features/updatePost";
import { UsersTable } from "@features/usersTable";
</script>
<template>
  <div class="content">
    <UsersTable />
    <UpdatePostForm />
  </div>
</template>

<style lang="sass">
.content
  display: flex
  padding-top: 120px
  justify-content: center
  gap: 40px
</style>
