<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */

/** 表格过滤器数据定义 -- 暂不可用 */
export interface Filter {
  text: string;
  value: string;
}

/** 表格列字段定义 */
export interface Column {
  // 表头名称
  title: string;
  // 列关键字
  key: string;
  // 所属数据字段名
  dataIndex?: string;
  // 数据是否为数值型
  isNumber?: boolean;
  // 使用排序
  sorter?: boolean | any;
  // 使用过滤
  // filters?: Array<Filter>; -- 暂未实现
  // 使用查询过滤器
  customFilterDropdown?: boolean;
  onFilter?: any;
  onFilterDropdownVisibleChange?: any;
}

import { SearchOutlined } from "@ant-design/icons-vue";
import { onMounted, reactive, ref } from "vue";

const props = defineProps<{
  title: string;
  subTitle?: string;
  data: unknown;
  columns: Array<Column>;
  loading?: boolean;
}>();

onMounted(() => {
  props.columns?.forEach((col) => {
    // 初始化查询方法
    if (col.customFilterDropdown && col.customFilterDropdown) {
      col.onFilter = (value: any, record: any) =>
        record.name.toString().toLowerCase().includes(value.toLowerCase());
      col.onFilterDropdownVisibleChange = (visible: any) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      };
    }

    // 初始化排序方法
    if (col.sorter && col.sorter === true) {
      if (col.isNumber) {
        // 数据是值类型 直接比较
        col.sorter = (a: any, b: any) => {
          const name: string = col.dataIndex as string;
          const left: number = a[name] as unknown as number;
          const right: number = b[name] as unknown as number;
          return left - right;
        };
      } else {
        // 数据是字符串类型 比较长度
        col.sorter = (a: any, b: any) => {
          const name: string = col.dataIndex as string;
          const left: string = a[name] as string;
          const right: string = b[name] as string;
          return left.length - right.length;
        };
      }
    }
  });
});

// 查询条件 state
const state = reactive({
  searchText: "",
  searchedColumn: "",
});

const searchInput = ref();

// 数据查询方法
const handleSearch = (
  selectedKeys: string[],
  confirm: () => void,
  dataIndex: string
) => {
  confirm();
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
};

// 数据恢复方法
const handleReset = (clearFilters: () => void) => {
  clearFilters();
  state.searchText = "";
};
</script>

<template>
  <!-- 页头部分 -->
  <a-page-header :title="title" :sub-title="subTitle" class="header" />

  <!-- 主体表格部分 -->
  <a-table
    class="table"
    :dataSource="data"
    :columns="columns"
    :loading="loading"
    :pagination="{
      pageSize: 6,
      hideOnSinglePage: true,
      showSizeChanger: false,
    }"
  >
    <!-- 表头 -->
    <template #headerCell></template>

    <!-- 表查询控件 -->
    <template
      #customFilterDropdown="{
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        column,
      }"
    >
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="
            (e: any) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template #icon><SearchOutlined /></template>
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="handleReset(clearFilters)"
        >
          Reset
        </a-button>
      </div>
    </template>

    <!-- 表查询图标 -->
    <template #customFilterIcon="{ filtered }">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>

    <!-- 表数据 -->
    <template #bodyCell="{ text, column }">
      <span
        v-if="state.searchText && state.searchedColumn === column.dataIndex"
      >
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(
              new RegExp(
                `(?<=${state.searchText})|(?=${state.searchText})`,
                'i'
              )
            )"
        >
          <mark
            v-if="fragment.toLowerCase() === state.searchText.toLowerCase()"
            :key="i"
            class="highlight"
          >
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
    </template>
  </a-table>
</template>

<style lang="less">
.header {
  margin: 0;
  padding: 0;
  border: 1px, solid rgb(235, 237, 240);
}

.table {
  height: 500px;
  margin-top: 20px;
}
</style>
