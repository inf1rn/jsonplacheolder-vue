<script setup lang="ts">
import { ITableCellModel } from "./ITableCellModel";
import { computed } from "vue";

const props = defineProps<{
  cellModel: ITableCellModel;
  row: any;
  hasChildren?: boolean;
  level: number;
  expanded: boolean;
}>();

const cellModel = props.cellModel;
const row = props.row;
const level = props.level;
const hasChildren = props.hasChildren;

const style = computed(() => {
  const stylesVar = { "--cell-width": cellModel.width + "px" };

  if (cellModel.rowGroup) {
    stylesVar["--cell-indent"] = `${level * 12}px`;
  }
  return stylesVar;
});

const cellValue = computed(() => {
  if (cellModel.valueGetter) return cellModel.valueGetter(row);
  else if (cellModel.field) return row[cellModel.field] ?? "";

  return "";
});

const emit = defineEmits<{
  (
    e: "expand",
    data: {
      row: any;
    }
  ): void;
}>();
</script>
<template>
  <div
    class="TableCell"
    :class="{
      'TableCell-expanded': expanded,
      'TableCell-expandable': hasChildren && cellModel.rowGroup,
    }"
    :style="style"
  >
    <span
      v-if="cellModel.rowGroup"
      class="TableCell-expand"
      @click="emit('expand', { row })"
    ></span>
    <div class="TableCell-content">{{ cellValue ?? "" }}</div>
  </div>
</template>

<style lang="sass">
.TableCell
    width: var(--cell-width)
    display: flex
    align-items: center

    &-content
        margin-left: var(--cell-indent)

    &-expand
        visibility: hidden
        margin-right: 8px

    &-expandable
      .TableCell-expand
        visibility: visible

    &-expand::before
        content: ''
        display: block
        background-image: url('/right-chevron.svg')
        background-size: 9px
        width: 9px
        height: 9px
        cursor: pointer

    &-expanded
        .TableCell-expand::before
            transform: rotate(90deg)

    padding: 4px 8px
</style>
