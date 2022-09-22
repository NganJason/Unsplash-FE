import React from "react";
import s from "./s.module.scss";

import { Spin, Tabs } from "antd";
import ImgGrid from "../Home/ImgGrid/ImgGrid";
import { HiPhotograph } from "react-icons/hi";
import { AiTwotoneLike } from "react-icons/ai"
import { useSearchParams } from "react-router-dom";
import { useGetImagesQuery, useGetUserLikesQuery, useGetUserQuery } from "../../_shared/queries/unsplash";

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

    const { data, fetchNextPage } = useGetUserLikesQuery(userID, userID !== 0)
    const { data: imgPostedByUser, fetchNextPage: fetchNextImgPostedByUser } = useGetImagesQuery(userID !== 0, userID);

    React.useEffect(() => {
      let id = search.get("id")
      if (id && id !== "") {
        setUserID(Number(id));
      }
      
    }, [search])

    return (
      <div className={s.userProfileContainer}>
        {isGetUserLoading ? (
          <div className={s.loadingSpin}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className={s.userProfile}>
              <img
                src={
                  user?.profile_url ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
              />

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
                    <ImgGrid
                      data={imgPostedByUser}
                      fetchNextPage={fetchNextImgPostedByUser}
                    />
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
                    <ImgGrid data={data} fetchNextPage={fetchNextPage} />
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </>
        )}
      </div>
    );
}

export default UserProfile;