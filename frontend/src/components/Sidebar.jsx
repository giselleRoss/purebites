import React, { useState } from 'react';

import {
  HeartTwoTone,
  EditTwoTone,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RestTwoTone,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}


const items = [
  getItem('See all recipes', '1', <RestTwoTone twoToneColor="#52c41a"/>),
  getItem('Add your own recipes', '2',<EditTwoTone twoToneColor="#52c41a"/>),
  getItem('Favorites', '3', <HeartTwoTone twoToneColor="#52c41a"/>),
];

const Sidebar = ({handleMenuClick}) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      style={{
        width: 256,
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        onClick={({ key }) => handleMenuClick({ key })}
      >
        {items.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default Sidebar;