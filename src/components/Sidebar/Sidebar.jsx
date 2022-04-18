import React from 'react';
import './Sidebar.css';
import TwitterIcon from '@material-ui/icons/Twitter';
import { SidebarOption } from './components';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ExitToApp from '@material-ui/icons/ExitToApp';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Button } from '@material-ui/core';

// Routing
import { routes } from '../../utils';
import { useNavigate } from 'react-router-dom';

// Hooks
import { useAccount } from '../../utils/aws/hooks';

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAccount();

  const handleProfile = (event) => {
    event.preventDefault();

    navigate(routes.profile.path);
  };

  const handleLogout = (event) => {
    event.preventDefault();

    logout();
  };

  const handleLoadMore = (event) => {
    event.preventDefault();

    // $
    console.log('Loading more tweets...');
  };

  return (
    <div className='sidebar'>
      <TwitterIcon className='sidebar__twitterIcon' />

      <SidebarOption active Icon={HomeIcon} text='Home' />
      <SidebarOption Icon={SearchIcon} text='Explore' />
      <SidebarOption Icon={NotificationsNoneIcon} text='Notifications' />
      <SidebarOption Icon={MailOutlineIcon} text='Messages' />
      <SidebarOption Icon={BookmarkBorderIcon} text='Bookmarks' />
      <SidebarOption Icon={ListAltIcon} text='Lists' />
      <SidebarOption
        Icon={PermIdentityIcon}
        text='Profile'
        onClick={handleProfile}
      />
      <SidebarOption Icon={ExitToApp} text='Logout' onClick={handleLogout} />
      <SidebarOption Icon={MoreHorizIcon} text='More' />

      <Button
        variant='outlined'
        className='sidebar__tweet'
        fullWidth
        onClick={handleLoadMore}
      >
        Load more
      </Button>
    </div>
  );
}

export default Sidebar;
