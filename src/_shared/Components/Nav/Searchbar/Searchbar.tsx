import React from "react";
import s from "./s.module.scss";

import { Input, AutoComplete, Spin } from "antd";
import { BsSearch } from "react-icons/bs";
import lodash from "lodash";
import axios from "axios";
import { User } from "../../../api/client";

type SearchBarProps = {
  className?: string;
}

const debounceTimeout = 500;

interface UserValue {
  label: string;
  value: string;
}

const SearchBar = (props: SearchBarProps): JSX.Element => {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState<UserValue[]>([]);
  const fetchRef = React.useRef(0);

  const [value, setValue] = React.useState<string>("");
  const [dropdownVisible, setDropdownVisible] = React.useState<boolean>(false)

  async function searchUsers(keyword: string) {
    let url: string = "/api/user/search";

    try {
      let resp = await axios.post(
        url,
        {
          keyword: keyword,
        },
        { withCredentials: true }
      );

      return handleResp(resp);
    } catch (err) {
      throw err;
    }
  }

  const handleResp = (resp: any): any => {
    if (resp.data.debug_msg && resp.data.debug_msg !== "") {
      throw new Error(resp.data.debug_msg);
    }

    return resp.data;
  };

  async function fetchUserList(username: string): Promise<UserValue[]> {
    return searchUsers(username).then((resp) => {
      let users = resp.users;
      
      return users?.map((user: User) => ({
        label: `${user.username}`,
        value: `${user.username}`,
      }));
    });
  }

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchUserList(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return lodash.debounce(loadOptions, debounceTimeout);
  }, [fetchUserList, debounceTimeout]);

    return (
      <AutoComplete
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
        size="large"
        onChange={(e)=> setValue(e)}
        className={s.autocomplete}
        onDropdownVisibleChange={(e) => setDropdownVisible(e)}
      >
        <div className={s.searchBarContainer}>
          <Input
            className={`${s.searchBar} ${props.className}`}
            placeholder="Search your favourite creator"
            value={value}
            onKeyDown={(e) => {
              if (!dropdownVisible && e.key === "Enter") {
                console.log("search")
              }
            }}
          />
          <div className={s.searchBarIcon} onClick={(e) => {e.stopPropagation()}}>
            <BsSearch className={s.searchIcon}/>
          </div>
        </div>
      </AutoComplete>
    );
}

export default SearchBar;