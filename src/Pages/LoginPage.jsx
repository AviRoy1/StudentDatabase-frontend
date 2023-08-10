import React, { useState } from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Icon,
  ColorModeScript,
} from '@chakra-ui/react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { studentLogin } from '../Redux/Actions/StudentAction';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function LoginPage() {
  const hoverBgColor = useColorModeValue('gray.100', 'gray.600');
  const [studentName, setStudentName] = useState('');
  const [studentPass, setStudentPass] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { student, accessToken } = useSelector(state => state.student);
  const studentloginHandler = () => {
    dispatch(studentLogin(studentName, studentPass));
    navigate('/profile');
  };

  const [adminName, setAdminName] = useState('');
  const [adminPass, setAdminPass] = useState('');

  const adminLogin = () => {
    if (adminName === 'admin@123' && adminPass === 'admin@123') {
      navigate('/database');
    } else {
      toast.error('Invalid Username or Password');
    }
  };

  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode="light" />
      <Container maxWidth="container.lg">
        <Stack direction="column" spacing={8} align="center" mt={16}>
          <Text
            fontSize="2xl"
            fontWeight="semibold"
            mb={4}
            textAlign="center"
            color={'yellow.600'}
          >
            Welcome to MyApp
          </Text>

          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={20}
            align="center"
          >
            {/* Admin Login */}
            <Box>
              <Text fontSize="lg" mb={8} textAlign="center">
                Admin Login
              </Text>
              <FormControl id="adminUsername">
                <FormLabel>Admin Username</FormLabel>

                <Input
                  type="text"
                  _hover={{ backgroundColor: hoverBgColor }}
                  onChange={e => setAdminName(e.target.value)}
                />
              </FormControl>
              <FormControl id="adminPassword" mt={8}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  _hover={{ backgroundColor: hoverBgColor }}
                  onChange={e => setAdminPass(e.target.value)}
                />
              </FormControl>
              <Button
                colorScheme="blue"
                mt={4}
                leftIcon={<Icon as={FaUser} />}
                onClick={adminLogin}
              >
                Login as Admin
              </Button>
            </Box>

            <Divider
              orientation="vertical"
              display={{ base: 'none', md: 'block' }}
            />

            {/* Student Login */}
            <Box mt={{ base: 4, md: 0 }}>
              <Text fontSize="lg" mb={8} textAlign="center">
                Student Login
              </Text>
              <FormControl id="studentUsername">
                <FormLabel>Student Username</FormLabel>
                <Input
                  type="text"
                  onChange={e => setStudentName(e.target.value)}
                  _hover={{ backgroundColor: hoverBgColor }}
                />
              </FormControl>
              <FormControl id="studentPassword" mt={8}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={e => setStudentPass(e.target.value)}
                  _hover={{ backgroundColor: hoverBgColor }}
                />
              </FormControl>
              <Button
                colorScheme="green"
                mt={4}
                leftIcon={<Icon as={FaLock} />}
                onClick={studentloginHandler}
              >
                Login as Student
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Container>
      <Toaster />
    </ChakraProvider>
  );
}

export default LoginPage;
