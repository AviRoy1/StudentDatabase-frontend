import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  RiAddCircleFill,
  RiDatabaseFill,
  RiEyeFill,
  RiUser3Fill,
} from 'react-icons/ri';
import { AiFillAccountBook } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import ColorModeSwitcher from '../ColorModeSwitcher';

const Sidebar = () => {
  const location = useLocation();
  return (
    <>
      <ColorModeSwitcher />
      <VStack
        spacing={'8'}
        p="16"
        boxShadow={'-8px 0 10px rgba(255, 102, 153,0.5)'}
      >
        <LinkButton
          Icon={RiDatabaseFill}
          text="Profile"
          url={'profile'}
          active={location.pathname === '/profile'}
        />
        <LinkButton
          Icon={RiUser3Fill}
          text="Attendance"
          url={'myattendance'}
          active={location.pathname === '/myattendance'}
        />
      </VStack>
    </>
  );
};

export default Sidebar;

function LinkButton({ url, Icon, text, active }) {
  return (
    <Link to={`/${url}`}>
      <Button
        colorScheme={active ? 'pink' : ''}
        fontSize={'large'}
        variant="ghost"
      >
        <Icon style={{ margin: '4px' }} />
        {text}
      </Button>
    </Link>
  );
}
