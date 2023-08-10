import { Box, Button, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  RiAddCircleFill,
  RiDatabaseFill,
  RiEyeFill,
  RiUser3Fill,
} from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import { AiFillAccountBook } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
          text="Database"
          url={'database'}
          active={location.pathname === '/dashboard'}
        />
        <LinkButton
          Icon={RiUser3Fill}
          text="Attendance"
          url={'attendance'}
          active={location.pathname === '/attendance'}
        />
      </VStack>
      <Box p="16">
        <LogoutButton />
      </Box>
    </>
  );
};

export default Sidebar;

function LogoutButton() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate('/');
  };

  return (
    <Button
      colorScheme="pink"
      fontSize="large"
      variant="ghost"
      w="full"
      onClick={logoutHandler}
    >
      <FiLogOut style={{ marginRight: '8px' }} />
      Logout
    </Button>
  );
}

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
