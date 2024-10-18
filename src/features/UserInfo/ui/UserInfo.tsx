import { UrlApi } from "@/shared/api/url";
import { useEffect, useState } from "react";
import { Card, Spin, Typography, List, Divider } from "antd";

const { Title, Text } = Typography;

interface User {
  id: string;
  first_name: string;
  last_name: string;
  active: boolean;
}

interface Email {
  id: string;
  email: string;
}

interface SocialAccount {
  id: string;
  provider: string;
  provider_user_id: string;
}

interface PhoneNumber {
  id: string | null;
  phone_number: string | null;
}

interface UserInfoResponse {
  user: User;
  emails: Email[];
  social_accounts: SocialAccount[];
  phone_number: PhoneNumber;
}

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState<UserInfoResponse | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = window.localStorage.getItem('accessToken');
      const response = await fetch(UrlApi.getUserInfoApi, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ token: token }),
      });
      const data: UserInfoResponse = await response.json();
      setUserInfo(data);
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card style={{ maxWidth: 600, margin: '20px auto' }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        Профиль пользователя
      </Title>

      <Divider />

      <List
        bordered
        dataSource={[
          { label: 'ID', value: userInfo.user.id },
          { label: 'Имя', value: userInfo.user.first_name },
          { label: 'Фамилия', value: userInfo.user.last_name },
          { label: 'Активен', value: userInfo.user.active ? 'Да' : 'Нет' },
        ]}
        renderItem={(item) => (
          <List.Item>
            <Text strong>{item.label}:</Text> <Text>{item.value}</Text>
          </List.Item>
        )}
      />

      <Divider>Emails</Divider>

      <List
        bordered
        dataSource={userInfo.emails}
        renderItem={(email) => (
          <List.Item>
            <Text strong>Email:</Text> <Text>{email.email}</Text>
          </List.Item>
        )}
      />

      <Divider>Социальные аккаунты</Divider>

      <List
        bordered
        dataSource={userInfo.social_accounts}
        renderItem={(account) => (
          <List.Item>
            <Text strong>Провайдер:</Text> <Text>{account.provider}</Text>
            <br />
            <Text strong>ID провайдера:</Text> <Text>{account.provider_user_id}</Text>
          </List.Item>
        )}
      />

      <Divider>Номер телефона</Divider>

      {userInfo.phone_number.phone_number ? (
        <Text>{userInfo.phone_number.phone_number}</Text>
      ) : (
        <Text>Номер телефона не указан</Text>
      )}
    </Card>
  );
}
