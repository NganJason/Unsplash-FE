import React from "react";
import s from "./s.module.scss";

import { Tabs } from "antd";
import ImgGrid from "../Home/ImgGrid/ImgGrid";
import { HiPhotograph } from "react-icons/hi";
import { AiTwotoneLike } from "react-icons/ai"

const profileImg =
  "https://images.unsplash.com/profile-fb-1661997390-82e6e46bf7e2.jpg?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff 1x, https://images.unsplash.com/profile-fb-1661997390-82e6e46bf7e2.jpg?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff 2x";

const { TabPane } = Tabs;

const UserProfile = (): JSX.Element => {
    return (
      <div className={s.userProfileContainer}>
        <div className={s.userProfile}>
          <img src={profileImg} />

          <div className={s.userInfo}>
            <h1>Jason Ngan</h1>
            <p>
              Download free, beautiful high-quality photos curated by Jason.
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
                <ImgGrid />
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
                <ImgGrid />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
}

export default UserProfile;