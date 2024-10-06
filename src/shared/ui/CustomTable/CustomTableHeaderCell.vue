<script lang="ts" setup>
import { ITableCellModel } from "./ITableCellModel";

const props = defineProps<{ cellModel: ITableCellModel }>();

const cellModel = props.cellModel;

const style = { "--cell-width": cellModel.width + "px" };
</script>
<template>
  <div class="TableHeaderCell" :style="style">{{ cellModel.headerName }}</div>
</template>
<style lang="sass">
.TableHeaderCell
    width: var(--cell-width)
    text-align: center
</style>
