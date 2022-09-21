import React from "react";
import s from "./s.module.scss";

import { Spin, Tabs } from "antd";
import ImgGrid from "../Home/ImgGrid/ImgGrid";
import { HiPhotograph } from "react-icons/hi";
import { AiTwotoneLike } from "react-icons/ai"
import { useSearchParams } from "react-router-dom";
import { useGetUserLikesQuery, useGetUserQuery } from "../../_shared/queries/unsplash";

const { TabPane } = Tabs;

const UserProfile = (): JSX.Element => {
    const [search] = useSearchParams();
    const [userID, setUserID] = React.useState<number>(0)

    const { data: user, isLoading: isGetUserLoading } = useGetUserQuery(userID, {
      refetchOnWindowFocus: true,
      refetchInterval: false,
      retry: 0,
      enabled: userID !== 0
    });

    const { data: userLikes, isLoading: isUserLikesLoading } = useGetUserLikesQuery(userID, {
      refetchInterval: false,
      enabled: userID !== 0
    })

    React.useEffect(() => {
      let id = search.get("id")
      if (id && id !== "") {
        setUserID(Number(id));
      }
      
    }, [search])

    return (
      <div className={s.userProfileContainer}>
        {
          isGetUserLoading ? (
            <div className={s.loadingSpin}><Spin size="large"/></div>
          ): (
            <>
              <div className={s.userProfile}>
                <img src={user?.profile_url || ""} />

                <div className={s.userInfo}>
                  <h1>{`${user?.last_name} ${user?.first_name}`}</h1>
                  <p>
                    {`Download free, beautiful high-quality photos curated by ${user?.last_name}.`}
                  </p>
                </div>
              </div>

              <div className={s.userPhotos}>
                <Tabs className={s.tabs} tabBarGutter={50}>
                  <TabPane
                    tab={
                      <span className={`${s.tabTitle} ${s.firstTab}`}>
                        <HiPhotograph className={s.tabIcon} />
                        Photos
                      </span>
                    }
                    key="1"
                  >
                    <div className={s.userImages}>
                      
                    </div>
                  </TabPane>
                  <TabPane
                    tab={
                      <span className={s.tabTitle}>
                        <AiTwotoneLike className={s.tabIcon} />
                        Likes
                      </span>
                    }
                    key="2"
                  >
                    <div className={s.userImages}>
                      
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </>
          )
        }
      </div>
    );
}

export default UserProfile;