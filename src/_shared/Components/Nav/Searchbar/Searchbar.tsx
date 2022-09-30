import React from "react";
import s from "./s.module.scss";

import { Input, AutoComplete, Spin, message } from "antd";
import { BsSearch } from "react-icons/bs";
import lodash from "lodash";
import { User } from "../../../api/client";
import { unsplashRequest } from "../../../api";
import { useGetUserQuery } from "../../../queries/unsplash";
import { useNavigate } from "react-router-dom";

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
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false)
  const navigate = useNavigate();

  const { data: user, isLoading: isGetUserLoading } = useGetUserQuery(
    undefined,
    value,
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      retry: false,
      enabled: isSubmit,
      onSuccess: (user) => {
        if (user) {
          if (isSubmit) {
            setIsSubmit(false);
            navigate(`/user?id=${user.id}`);
            window.location.reload();
          }
          
        } else {
          setIsSubmit(false)
          message.destroy("user_not_found");
          message.error({ content: "user not found", key: "user_not_found" });
        }
      },
      onError: () => {
        setIsSubmit(false);
        message.destroy("user_not_found");
        message.error({ content: "user not found" , key: "user_not_found"});
      }
    }
  );

  async function fetchUserList(username: string): Promise<UserValue[]> {
    return unsplashRequest.searchUsers.post(
      {keyword: username}
    ).then((resp) => {
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

  const submitHandler = () => {
    setIsSubmit(true)
  }

    return (
      <AutoComplete
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
        size="large"
        onChange={(e) => setValue(e)}
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
                submitHandler();
              }
            }}
          />
          <div
            className={`${s.searchBarIcon} ${props.className}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {isGetUserLoading ? (
              <Spin size="small" />
            ) : (
              <BsSearch className={s.searchIcon} onClick={submitHandler} />
            )}
          </div>
        </div>
      </AutoComplete>
    );
}

export default SearchBar;