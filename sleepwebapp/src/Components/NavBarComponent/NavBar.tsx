import { FunctionComponent } from 'react';
import { Flex, Header, Text, Button, Menu, MenuItemProps } from '@fluentui/react-northstar';
import { NavLink } from 'react-router-dom';
import { TenantPersonalIcon, ToDoListIcon, ContactGroupIcon, ChatIcon, SettingsIcon, PersonIcon } from '@fluentui/react-icons-northstar';

type NavItem = {
  key: string;
  label: string;
  to: string;
  icon: JSX.Element;
};

const navItems: NavItem[] = [
  { key: 'home', label: 'Home', to: '/', icon: <TenantPersonalIcon color='brand'/> },
  { key: 'patients', label: 'Patients', to: '/patients', icon: <ContactGroupIcon color='brand'/> },
  { key: 'todo', label: 'To-Do', to: '/todo', icon: <ToDoListIcon color='brand'/> },
  { key: 'chat', label: 'Chat', to: '/chat', icon: <ChatIcon /> },
  { key: 'settings', label: 'Settings', to: '/settings', icon: <SettingsIcon /> },
  { key: 'profile', label: 'Profile', to: '/profile', icon: <PersonIcon /> },
];

export const NavBar: FunctionComponent = () => {
    const menuItems: MenuItemProps[] = navItems.map((item) => ({
    key: item.key,
    icon: (item.icon),
    content: item.label,
    as: NavLink,
    to: item.to,
    activeClassName: 'active',
  }));

  return (
    <Flex style={{ height: '100%' }}>
      <Flex.Item size="size.quarter" styles={{ backgroundColor: '#f8f8f8' }}>
        <Flex column gap="gap.medium">
          <Flex.Item>
            <Header>
              <Text size="larger" weight="bold" content="My App" />
            </Header>
          </Flex.Item>
          <Flex.Item>
            <Menu vertical defaultActiveIndex={0} items={menuItems} styles={{ width: '98%'}}/>
          </Flex.Item>
        </Flex>
      </Flex.Item>
      <Flex.Item size="size.threeQuarter" styles={{ padding: '1rem' }}>
        {/* Add your content here */}
        <Text content="Welcome to My App!" size="larger" />
      </Flex.Item>
    </Flex>
  );
};