import { useTranslations } from "next-intl";
import style from "./ConstInfo.module.scss";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { useEffect, useState } from "react";
import { Reviews } from "@/shared/types/reviews";
import { StarFilled } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { Discount } from "@/entities/Discount";
import { KaspiCredit } from "@/entities/Credit";

const { Text, Link } = Typography;

const Articul = ({ product }: { product: ProductsDetail | null }) => {
  const t = useTranslations();
  return (
    <Text type="secondary">
      {t("artikul")} {product?.id}
    </Text>
  );
};

const RatingSmall = ({ product }: { product: ProductsDetail | null }) => {
  const t = useTranslations();
  const [reviews, setReviews] = useState<Reviews[]>([]);
  useEffect(() => {
    fetch(`/api/v1/reviews/filter_by_prod/${product?.id}`, {
      cache:"no-cache"
    })
      .then((response) => response.json())
      .then((data) => setReviews(data));
  }, [product?.id]);

  return (
    <div
      className={style.ConstLineSpaceBetween}
    >
      <Text>
        <StarFilled style={{ color: "gold" }} />
        {product?.average_rating}
      </Text>
      <Link style={{color:'black'}}>
        ({t("otzyvov")} {reviews.length} )
      </Link>
    </div>
  );
};

const ConstInfo = ({
  product,
  currentCity,
}: {
  product: ProductsDetail | null;
  currentCity: string;
}) => {

  const t = useTranslations();

  return (
    <div className={style.CostContainer}>
      {/* Артикул и рейтинг */}
      <div className={style.ConstLineSpaceBetween}>
        <Articul product={product} />
        <RatingSmall product={product} />
      </div>

      <Discount product={product} City={currentCity} />

      {/* Кнопка купить */}
      {product?.id && (
        <Button
          className={style.CostBuy}
        >
          {t("dobavit-v-korzinu")}
        </Button>
      )}
      <KaspiCredit product={product} currentCity={currentCity}/>
    </div>
  );
};

export default ConstInfo;
