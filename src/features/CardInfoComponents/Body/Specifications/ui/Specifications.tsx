
import { CollapseProps, Collapse } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Typography } from "antd";

import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import { Specification } from "@/shared/types/specification";
import { selectDataByLangSpecificationName, selectDataByLangSpecificationValue } from "@/shared/tools/selectDataByLang";
import ucFirst from "@/shared/tools/ucFirst";

const { Title, Text } = Typography;

const SpecificationsBody = (
  specifications: Specification[]
): DescriptionsProps["items"] => {
  const localActive = useLocale();
  return specifications.map((item) => {
    return {
      label: ucFirst(String(selectDataByLangSpecificationName(item,localActive))),
      children: ucFirst(String(selectDataByLangSpecificationValue(item,localActive))),
    };
  });
};

export default function Specifications({ productId }: { productId: number }) {
  const [specifications, setSpecifications] = useState<Specification[]>([]);
  const t = useTranslations();
  const localActive = useLocale();
  const CollapseItems: CollapseProps["items"] = [
    {
      key: "1",
      label: t("kharakteristiki"),
      children: (
        <Descriptions
          bordered
          size="small"
          labelStyle={{ fontWeight: "bold" }}
          contentStyle={{ fontWeight: "normal", fontStyle: "italic"}} 
          column={1}
          items={SpecificationsBody(specifications)}
        />
      ),
    },
  ];

  useEffect(() => {
    fetch(`/api/v1/specif/filter_by_prod/${productId}`,{
      cache:"no-cache"
    }).then((response) =>
      response.json().then((data)=>setSpecifications(data)));    
  }, [productId]);

  return (
    <Collapse
      items={CollapseItems}
      bordered={false}
      defaultActiveKey={["1"]}
      style={{ width: "100%" }}
    />
  );
}
