import React, { useEffect, useState } from 'react';
import {
  Button,
  ChakraProvider,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  VStack,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  Box,
  TableContainer,
  Tbody,
  Th,
  Tr,
  Thead,
  Table,
  Grid,
  Heading,
  HStack,
  Td,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Icon,
  TableCaption,
  CheckboxGroup,
  Checkbox,
  ModalFooter,
  Flex,
} from '@chakra-ui/react';
import { FaPlus, FaUserPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import {
  addStudent,
  addSubject,
  allUser,
  getAllSubjects,
} from '../../Redux/Actions/StudentAction';
import PreLoader from '../../components/layout/Loader/Loader';
import Sidebar from '../../components/Sidebar';

const Database = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Class, setClass] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [newsubject, setNewsubject] = useState('');
  const [isloading, setIsloading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

  const { user, allsubjects } = useSelector(state => state.admin);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllSubjects());
      await dispatch(allUser());

      setIsloading(false);
    };

    fetchData();
  }, []);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleCreateStudent = async () => {
    dispatch(
      addStudent(name, password, Class, username, age, selectedSubjects)
    );
    toast.success(`Add ${name} into database`);
    setIsModalOpen(false);
  };

  const handleCreateSubject = async () => {
    dispatch(addSubject(newsubject));
    setIsSubjectModalOpen(false);
  };

  const handleAddSubjects = selectedSubjects => {
    setSubjects(selectedSubjects);
  };
  const handleAddSubjectButton = () => {
    setIsSubjectModalOpen(true);
  };

  return (
    <>
      {isloading === true ? (
        <PreLoader />
      ) : (
        <>
          <Sidebar />
          <ChakraProvider>
            <Container
              maxWidth={{
                base: '100%',
                md: 'container.lg',
                lg: 'container.xl',
              }}
              py={8}
              bg={'dark.700'}
            >
              <Stack
                direction="column"
                spacing={4}
                bg={'gray.800'}
                boxShadow="md"
                p={6}
                borderRadius="md"
                width="100%"
              >
                <Text fontSize="xl" fontWeight="semibold" color="yellow.700">
                  Create Student
                </Text>
                <Button
                  colorScheme="teal"
                  onClick={() => setIsModalOpen(true)}
                  leftIcon={<Icon as={FaUserPlus} />} // Use your add icon here
                >
                  Add Student
                </Button>

                {/* Modal */}
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader color={'yellow.600'}>Add Student</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {/* ... Form fields ... */}
                      <FormControl>
                        <FormLabel color={'yellow.600'}>Name</FormLabel>
                        <Input
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel color={'yellow.600'}>Class</FormLabel>
                        <Input
                          type="text"
                          value={Class}
                          onChange={e => setClass(e.target.value)}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel color={'yellow.600'}>Age</FormLabel>
                        <Input
                          type="text"
                          value={age}
                          onChange={e => setAge(e.target.value)}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel color={'yellow.600'}>User Name</FormLabel>
                        <Input
                          type="text"
                          value={username}
                          onChange={e => setUsername(e.target.value)}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel color={'yellow.600'}>Password</FormLabel>
                        <Input
                          type="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                      </FormControl>
                      <CheckboxGroup
                        value={selectedSubjects}
                        onChange={newSelectedSubjects => {
                          console.log(newSelectedSubjects);
                          setSelectedSubjects(newSelectedSubjects);
                        }}
                      >
                        <Stack spacing={2}>
                          {allsubjects.map(subject => (
                            <Checkbox
                              key={subject.id}
                              value={subject.name}
                              isChecked={selectedSubjects.includes(
                                subject.name
                              )}
                            >
                              {subject.name}
                            </Checkbox>
                          ))}
                        </Stack>
                      </CheckboxGroup>
                      <Modal
                        isOpen={isSubjectModalOpen}
                        onClose={() => setIsSubjectModalOpen(false)}
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader color={'yellow.600'}>
                            Add Subject
                          </ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <FormControl>
                              <FormLabel color={'yellow.600'}>
                                Subject Name
                              </FormLabel>
                              <Input
                                type="text"
                                placeholder="Enter subject name"
                                onChange={e => setNewsubject(e.target.value)}
                              />
                            </FormControl>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              colorScheme="teal"
                              onClick={handleCreateSubject}
                            >
                              Add
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                      <Flex justify="space-between" align="center">
                        <Button
                          colorScheme="teal"
                          mt={3}
                          onClick={handleAddSubjectButton}
                        >
                          Add Subject
                        </Button>
                        <Button
                          colorScheme="teal"
                          mt={7}
                          onClick={handleCreateStudent}
                        >
                          Create
                        </Button>
                      </Flex>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Stack>

              {/* List of Students */}
              <>
                <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
                  <Box overflowX="auto">
                    <Heading
                      textTransform="uppercase"
                      as="h1"
                      size="xl"
                      my="16"
                      color="gray.700"
                      textAlign={['center', 'left']}
                    >
                      All Students
                    </Heading>

                    <TableContainer
                      h={['auto', '700px']}
                      w={['100vw', 'full']}
                      style={{ overflow: 'scroll' }}
                    >
                      <Table variant="simple" size="lg">
                        <TableCaption>
                          All available users in the database
                        </TableCaption>
                        <Thead>
                          <Tr>
                            <Th>username</Th>
                            <Th>Name</Th>
                            <Th>Class</Th>
                            <Th>Age</Th>
                            <Th>Subjects</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {user &&
                            user.map(item => (
                              <Row key={item._id} item={item} />
                            ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Grid>
              </>
            </Container>
            <Toaster />
          </ChakraProvider>
        </>
      )}
    </>
  );
};

export default Database;

function Row({ item, updateHandler, deleteButtonHandler, loading }) {
  return (
    <Tr>
      <Td>{item.username}</Td>
      <Td>{item.name}</Td>
      <Td>{item.Class}</Td>
      <Td>{item.age}</Td>
      <Td>
        {item?.subjects &&
          item.subjects.map((subject, index) => <Td key={index}>{subject}</Td>)}
      </Td>
    </Tr>
  );
}
