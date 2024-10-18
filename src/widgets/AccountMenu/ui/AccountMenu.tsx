"use client";

import { Flex, Radio, Space, Tabs, Typography } from "antd";
import { RightOutlined, LogoutOutlined } from "@ant-design/icons";
import Favorites from "./Favorites";
import { Exit } from "@/features/Exit";
import { UserInfo } from "@/features/UserInfo";

const { Text } = Typography;

const userSvg = (
  <svg
    width="17"
    height="19"
    viewBox="0 0 17 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.9999 5.28582C10.9999 3.62813 9.65761 2.28582 7.99993 2.28582C6.34225 2.28582 4.99993 3.62813 4.99993 5.28582C4.99993 6.9435 6.34225 8.28582 7.99993 8.28582C9.65761 8.28582 10.9999 6.9435 10.9999 5.28582ZM12.7142 5.28582C12.7142 7.89028 10.6044 10.0001 7.99993 10.0001C5.39547 10.0001 3.28564 7.89028 3.28564 5.28582C3.28564 2.68136 5.39547 0.571533 7.99993 0.571533C10.6044 0.571533 12.7142 2.68136 12.7142 5.28582ZM1.99993 15.694C1.99993 16.5026 1.93125 16.4287 2.39069 16.4287H14.0377C14.4972 16.4287 14.4285 16.5026 14.4285 15.694C14.4285 13.7327 11.5965 12.5715 8.21422 12.5715C4.83195 12.5715 1.99993 13.7327 1.99993 15.694ZM0.285645 15.694C0.285645 12.3681 3.97043 10.8572 8.21422 10.8572C12.458 10.8572 16.1428 12.3681 16.1428 15.694C16.1428 17.4224 15.4733 18.143 14.0377 18.143H2.39069C0.955166 18.143 0.285645 17.4224 0.285645 15.694Z"
      fill="#3F54CF"
    />
  </svg>
);

const TabButton = ({
  children,
  icon,
  color = "#3F54CF",
  arrow = true,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  color?: string;
  arrow?: boolean;
}) => {
  return (
    <Flex align="space-between" style={{ width: "100%" }} gap={15}>
      {!icon ? userSvg : icon}
      <Text strong style={{ color: color }}>
        {children}
      </Text>
      {arrow && <RightOutlined />}
    </Flex>
  );
};

const items = [
  {
    key: '1',
    label: <TabButton>Профиль</TabButton>,
    children: <UserInfo/> ,
  },
  {
    key: '2',
    label: <TabButton>Мои заказы</TabButton>,
    children: <div>Корзина</div>,
  },
  {
    key: '3',
    label: <TabButton>Бонусы</TabButton>,
    children: <div>Бонусы</div>,
  },
  {
    key: '4',
    label: <TabButton>Избранное</TabButton>,
    children: <Favorites/>,
  },
  {
    key: '5',
    label: <TabButton>Мои адреса</TabButton>,
    children: <div>Мои адреса</div>,
  },
  {
    key: '6',
    label: (
      <TabButton icon={<LogoutOutlined style={{ color: '#FF0000' }} />} color="#FF0000" arrow={false}>
        Выход
      </TabButton>
    ),
    children: <Exit/>,
  },
];

export default function AccountMenu({ params }: { params: any }) {
  return (
    <Flex vertical={true} align="center" style={{ width: "100%" }}>
      <Flex vertical={true} style={{ width: "80%" }}>
        <Tabs size="large" defaultActiveKey="1" tabPosition="left" centered items={items}/> 
      </Flex>
    </Flex>
  );
}
