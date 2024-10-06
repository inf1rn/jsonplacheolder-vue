<script setup lang="ts">
import CustomTable from "@shared/ui/CustomTable/CustomTable.vue";
import { usersTableModel } from "./usersTableModel";
import { useUserTableStore } from "@features/usersTable/model/useUserTableStore";

const userTableStore = useUserTableStore();
userTableStore.fetchTableData();

const tableModel = usersTableModel();
</script>
<template>
  <CustomTable
    class="UsersTable"
    :model="tableModel"
    :getRootItems="userTableStore.getRootItems"
    :getChildren="userTableStore.getChildren"
    :getLevel="userTableStore.getLevel"
    :config="userTableStore.config"
  />
</template>
<style lang="sass">
.UsersTable
  height: 800px
  overflow-y: scroll
</style>
