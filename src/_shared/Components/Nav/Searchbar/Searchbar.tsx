import React from "react";
import s from "./s.module.scss";

import { Input, Dropdown, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              1st menu item
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.aliyun.com"
            >
              2nd menu item
            </a>
          ),
        },
        {
          key: "3",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.luohanacademy.com"
            >
              3rd menu item
            </a>
          ),
        },
      ]}
    />
  );

const SearchBar = (): JSX.Element => {
    return (
      <Dropdown overlay={menu} placement="bottomLeft" trigger={["click"]}>
        <Input
          className={s.searchBar}
          size="large"
          placeholder="Search free high-resolution photos"
          prefix={<SearchOutlined />}
        />
      </Dropdown>
    );
}

export default SearchBar;