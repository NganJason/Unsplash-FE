import React from "react";
import SearchBar from "../../_shared/Components/Nav/Searchbar/Searchbar";
import { useGetImagesQuery } from "../../_shared/queries/unsplash";
import ImgGrid from "./ImgGrid/ImgGrid";
import s from "./s.module.scss";

const heroImg = "https://images.unsplash.com/photo-1660506826403-eb494645a7e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=1&auto=format%2Ccompress&fit=crop&w=1799&h=594"

const Home = (): JSX.Element => {
    const { data, fetchNextPage, isLoading, isFetching } = useGetImagesQuery(true)

    return (
      <div className={s.home}>
        <div className={s.hero}>
          <div className={s.heroImg}>
            <img src={heroImg} alt="hero_img" />
          </div>

          <div className={s.heroHeaderContainer}>
            <div className={s.heroHeader}>
              <h1>Unsplash</h1>
              <h2>
                The internet's source of freely-usable images.
                <br />
                Powered by creators everywhere.
              </h2>
              <SearchBar className={s.heroSearch} />
            </div>
          </div>
        </div>
        <div className={s.gridContent}>
          <ImgGrid
            data={data}
            fetchNextPage={fetchNextPage}
            isLoading={isLoading || isFetching}
          />
        </div>
      </div>
    );
}

export default Home;