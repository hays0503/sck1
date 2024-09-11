"use client";
import { Button, Typography } from "antd";
import { CSSProperties } from "react";
const { Text } = Typography;
const ButtonNavigation: React.FC<{
  item: string;
  style?: CSSProperties;
  role?: string;
}> = ({ item, style, role }) => {
  return (
    <>
      <Button
        type="text"
        style={{ ...style, backgroundColor: "#F5F5F5BF", marginRight: "8px" }}
        role={role}
        aria-label={item}        
      >
        <Text>{item}</Text>
      </Button>
    </>
  );
};
export default ButtonNavigation;
