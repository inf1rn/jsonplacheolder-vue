<script lang="ts" setup>
import { ref } from "vue";
import { ITableCellModel } from "./ITableCellModel";
import { computed } from "vue";
import CustomTableCell from "./CustomTableCell.vue";
import CustomTableHeaderCell from "./CustomTableHeaderCell.vue";

interface IConfig {
  idKey: string;
  parentKey: string;
}

const props = defineProps<{
  model: ITableCellModel[];
  getChildren: (id: string) => any[];
  getLevel: (id: string) => number;
  getRootItems: () => any[];
  config: IConfig;
}>();

const expanded = ref<string[]>([]);

const config = props.config;
const getRootItems = props.getRootItems;
const getChildren = props.getChildren;
const getLevel = props.getLevel;

const showedRows = computed(() => {
  const rows: any[] = [];

  const parents = [...getRootItems()];

  while (parents.length) {
    const parent = parents.shift();

    if (expanded.value.includes(parent[config.idKey])) {
      const children = getChildren(parent[config.idKey]);
      parents.unshift(...children)
    }

    rows.push(parent);
  }

  return rows;
});

const onExpand = ({ row }) => {
  const rowId = row[config.idKey];
  if (expanded.value.includes(rowId)) {
    expanded.value = expanded.value.filter(
      (expandedRowId) => expandedRowId !== rowId
    );
  } else expanded.value.push(rowId);
};
</script>

<template>
  <div class="Table">
    <div class="Table-header">
      <CustomTableHeaderCell
        v-for="cellModel in model"
        :key="cellModel.colId"
        :cellModel="cellModel"
      />
    </div>
    <div class="Table-body">
      <div class="Table-row" v-for="row in showedRows" :key="row[config.idKey]">
        <CustomTableCell
          v-for="cellModel in model"
          :row="row"
          :expanded="expanded.includes(row[config.idKey])"
          :hasChildren="!!getChildren(row[config.idKey]).length"
          :cellModel="cellModel"
          :level="getLevel(row)"
          @expand="onExpand"
        />
      </div>
    </div>
  </div>
</template>
<style lang="sass">
.Table
  border: 1px solid var(--app-color-gray)
  width: max-content
  color: rgb(24, 29, 31)
  font-size: 14px

  &-header
    display: flex
    border-bottom: 1px solid var(--app-color-gray)

  &-row
    display: flex
    flex-grow: 1
    border-bottom: 1px solid var(--app-color-gray)

  .TableCell
    border-right: 1px solid var(--app-color-gray)

    &:last-child
      border-right: none

  .TableHeaderCell
    border-right: 1px solid var(--app-color-gray)

    &:last-child
      border-right: none
</style>
