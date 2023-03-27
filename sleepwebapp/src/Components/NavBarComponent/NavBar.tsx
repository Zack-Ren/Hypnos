import { FunctionComponent } from 'react';
import { Flex, Header, Image, Menu, } from '@fluentui/react-northstar';
import { NavLink } from 'react-router-dom';
import { TenantPersonalIcon, ToDoListIcon, ChatIcon, SettingsIcon, PersonIcon } from '@fluentui/react-icons-northstar';
import logo from '../../darkMode.png';
/**
 * Represents the navigation bar that will be shown on the main pages
 * @returns A Side-Vertical-Navigation Bar
 */
export const NavBar: FunctionComponent = () => {
    // Navigation Bar Items
    const menuItems = [
        { key: 'home', content: 'Home', to: '/homeV2', icon: <TenantPersonalIcon color='brand' size="medium" xSpacing='after'/>, as: NavLink },
        { key: 'todo', content: 'To-Do', to: '/todo', icon: <ToDoListIcon color='brand' size="medium" xSpacing='after'/>, as: NavLink },
        { key: 'chat', content: 'Chat', to: '/chat', icon: <ChatIcon color='brand' size="medium" xSpacing='after'/>, as: NavLink },
        { key: 'settings', content: 'Settings', to: '/settings', icon: <SettingsIcon color='brand' size="medium" xSpacing='after'/>, as: NavLink },
        { key: 'profile', content: 'Profile', to: '/profile', icon: <PersonIcon color='brand' size="medium" xSpacing='after'/>, as: NavLink },
    ];

    // Rendering Components
    return (
        <Flex column className='navbar-container' gap="gap.small">
            <Image fluid src={logo} styles={{maxWidth: "200px", maxHeight:"200px", padding: "20px 10px 0px 0px"}}/>
            <Menu defaultActiveIndex={0} items={menuItems} styles={{ width: '98%', height: '100%', fontSize: '20px', color: 'black'}} vertical pointing primary/>
        </Flex>
    );
};