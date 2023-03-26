import { FunctionComponent } from 'react';
import { Flex, Header, Text, Menu, } from '@fluentui/react-northstar';
import { NavLink } from 'react-router-dom';
import { TenantPersonalIcon, ToDoListIcon, ContactGroupIcon, ChatIcon, SettingsIcon, PersonIcon } from '@fluentui/react-icons-northstar';

/**
 * Represents the navigation bar that will be shown on the main pages
 * @returns 
 */
export const NavBar: FunctionComponent = () => {
    // Navigation Bar Items
    const menuItems = [
        { key: 'home', content: 'Home', to: '/home', icon: <TenantPersonalIcon color='brand' size="medium" xSpacing='after'/>, as: NavLink },
        { key: 'todo', content: 'To-Do', to: '/todo', icon: <ToDoListIcon color='brand' size="medium" xSpacing='after'/>, as: NavLink },
        { key: 'chat', content: 'Chat', to: '/chat', icon: <ChatIcon color='brand' size="medium" xSpacing='after'/>, as: NavLink },
        { key: 'settings', content: 'Settings', to: '/settings', icon: <SettingsIcon color='brand' size="medium" xSpacing='after'/>, as: NavLink },
        { key: 'profile', content: 'Profile', to: '/profile', icon: <PersonIcon color='brand' size="medium" xSpacing='after'/>, as: NavLink },
    ];

    // Rendering Components
    return (
        <Flex column className='navbar-container' gap="gap.small">
            <Header content="Hypnosos" />
            <Menu defaultActiveIndex={0} items={menuItems} styles={{ width: '98%', height: '100%', fontSize: '20px', color: 'black'}} vertical pointing primary/>
        </Flex>
    );
};