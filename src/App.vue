<script lang="ts" setup>
import UpdatePostForm from "@features/updatePost/ui/UpdatePostForm.vue";
import UsersTable from "@features/usersTable/ui/UsersTable.vue";
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
