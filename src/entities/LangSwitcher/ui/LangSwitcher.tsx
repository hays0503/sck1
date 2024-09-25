'use client'
import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, message,Space,Typography  } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';


export default function LangSwitcher({params}:{params:any}) {

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    message.info(`Выбран язык ${key}`);
    startTransition(() => {
      const url = `/${key}/${params.city}`;
      window.location.replace(url);
      // router.replace(`/${key}/${params.city}`);
    });
  };

  const items = [
    {
      key: 'kz',
      label: <Space>
      <Typography.Text>Қазақ</Typography.Text>
      </Space>,
    },
    {
      key: 'ru',
      label: <Space>
        <Typography.Text>Русский</Typography.Text></Space>,
    },
    {
      key: 'en',
      label: <Space>
        <Typography.Text>English</Typography.Text></Space>,
    },

  ];

  return <Dropdown
    menu={{ items, onClick }}
    overlayStyle={{ zIndex: 2000 }}>
    <Space>
      <Typography.Text>{items.find(({ key }) => key === localActive)?.label}</Typography.Text>
      <DownOutlined />
    </Space>
  </Dropdown>
}
