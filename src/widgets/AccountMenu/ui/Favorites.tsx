import React, { useEffect, useState } from "react";
import { Avatar, Button, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetFavoritesProduct } from "../api";
import { useLocalStorage } from "usehooks-ts";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { Products } from "@/shared/types/products";
import { UrlApi } from "@/shared/api/url";
import { useLocale, useTranslations } from "next-intl";
import { useGetCityParams } from "@/shared/hook/useGetCityParams";
import useSelectCurrentCity from "@/shared/hook/useSelectCurrentCity";

const Favorites: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Products[]>([]);
  const [FavoritesProduct, setFavoritesProduct] = useLocalStorage<number[]>(
    "FavoritesProduct",
    []
  );
  const t = useTranslations();
  const localActive = useLocale();
  const currentCityEN = useGetCityParams();
  const currentCityRU = useSelectCurrentCity("en", currentCityEN)?.name_city!;
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);

    if (FavoritesProduct) {
      fetch(`${UrlApi.getProducts}/by_ids/${FavoritesProduct?.join(",")}`)
        .then((res) => res.json())
        .then((body: Products[]) => {
          setData([...body]);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    loadMoreData();
  }, [FavoritesProduct]);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      {/* <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < FavoritesProduct?.length}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>{t("it-is-all-nothing-more")}</Divider>}
        scrollableTarget="scrollableDiv"
      > */}
        <List
          dataSource={data}
          renderItem={(item) => {
            if (item === null) return null;
            if (currentCityRU === undefined) return null;
            if (item?.price?.[currentCityRU] === undefined) return null;
            return (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={item.list_url_to_image[0]}
                      alt={item.name_product}
                      shape="square"
                    />
                  }
                  title={
                    <a
                      href={`/${localActive}/${currentCityEN}/product/${item.slug}`}
                    >
                      {item.name_product}
                    </a>
                  }
                  description={`${t("artikul")} ${item.vendor_code}`}
                />
                <Button
                  onClick={() => {
                    const index = FavoritesProduct?.indexOf(item.id);
                    if (index !== -1) {
                      const newFavorites = [...FavoritesProduct];
                      newFavorites.splice(index, 1);
                      setFavoritesProduct(newFavorites);
                    } else {
                      const newFavorites = [...FavoritesProduct, item.id];
                      setFavoritesProduct(newFavorites);
                    }
                    setData(data.filter((i) => i.id !== item.id));
                  }}
                >
                  {t("ubrat-iz-izbrannogo")}
                </Button>
              </List.Item>
            );
          }}
        />
      {/* </InfiniteScroll> */}
    </div>
  );
};

export default Favorites;
