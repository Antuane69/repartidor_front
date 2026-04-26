import { Input, Button, Space } from "antd";
import type { InputRef } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnType } from "antd/es/table";
import type { FilterDropdownProps } from "antd/es/table/interface";
import React, { useRef } from "react";

type SearchConfig<T> = {
  dataIndex: keyof T;
  onSearchRemote?: (dataIndex: string, value: string) => void; // callback para fetch remoto
};

export function buscadorColumnasTabla<T extends object>({
  dataIndex,
  onSearchRemote,
}: SearchConfig<T>): ColumnType<T> {
  const searchInput = useRef<InputRef>(null);

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Buscar ${String(dataIndex)}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedKeys(value ? [value] : []);
          }}
          onPressEnter={() => {
            confirm();
            if (onSearchRemote) {
              onSearchRemote(String(dataIndex), selectedKeys[0] as string);
            }
          }}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              confirm();
              if (onSearchRemote) {
                onSearchRemote(String(dataIndex), selectedKeys[0] as string);
              }
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => {
              clearFilters && clearFilters();
              confirm();
              if (onSearchRemote) {
                onSearchRemote(String(dataIndex), "");
              }
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    // onFilter: (value, record: any) =>
    //   record[dataIndex]
    //     ? String(record[dataIndex])
    //         .toLowerCase()
    //         .includes((value as string).toLowerCase())
    //     : false,
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  };
}
