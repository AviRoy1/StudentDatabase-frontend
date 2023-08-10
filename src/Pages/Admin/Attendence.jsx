import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormLabel,
  Heading,
  Select,
  Stack,
  ChakraProvider,
  extendTheme,
  useColorMode,
  VStack,
  CheckboxGroup,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from '../../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAttendance,
  allUser,
  allUserFilter,
  getAllSubjects,
  penDingAttendanceStudents,
} from '../../Redux/Actions/StudentAction';
import PreLoader from '../../components/layout/Loader/Loader';
import axios from 'axios';

const customTheme = extendTheme({
  colors: {
    primary: {
      100: '#e2f5ff',
      500: '#007bff',
      900: '#0056b3',
    },
    neutral: {
      100: '#f7f7f7',
      800: '#1a202c',
    },
  },
  fonts: {
    body: 'Arial, sans-serif',
  },
});

const AttendanceCard = ({ student, colorMode, handleStudentAttendance }) => {
  const [selectedSubjects, setSelectedSubjects] = useState([]); // Move the state here

  return (
    <Box
      key={student.id}
      p={6}
      bg={colorMode === 'light' ? 'neutral.100' : 'neutral.800'}
      borderRadius="md"
      boxShadow="md"
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: 'lg' }}
    >
      <Heading
        as="h2"
        size="md"
        mb={2}
        color={colorMode === 'light' ? 'gray.800' : 'white'}
      >
        {student.name}
      </Heading>
      <VStack spacing={2} align="stretch">
        <CheckboxGroup
          value={selectedSubjects}
          onChange={newSelectedSubjects => {
            setSelectedSubjects(newSelectedSubjects);
          }}
        >
          <Stack spacing={2}>
            {student?.subjects.map(subject => (
              <Checkbox
                key={subject}
                value={subject}
                isChecked={selectedSubjects.includes(subject)}
              >
                {subject}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </VStack>
      <Button
        mt={4}
        colorScheme={colorMode === 'light' ? 'primary' : 'blue'}
        onClick={() => handleStudentAttendance(student._id, selectedSubjects)}
      >
        Mark Attendance
      </Button>
    </Box>
  );
};

const Attendence = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState('');
  const [isloading, setIsloading] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const classes = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
  const { user, allsubjects } = useSelector(state => state.admin);

  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllSubjects());
      await dispatch(allUser());
      setSelectedClass('');
      setIsloading(false);
    };

    fetchData();
  }, []);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleClassChange = async event => {
    setIsloading(true);
    setSelectedClass(event.target.value);

    const data = await dispatch(
      penDingAttendanceStudents(event.target.value, selectedDate)
    );

    setIsloading(false);
  };

  const handleStudentAttendance = async (studentId, subjects) => {
    setIsloading(true);
    console.log(studentId);
    const data = await dispatch(
      addAttendance(studentId, selectedDate, subjects)
    );
    const obj = await dispatch(
      penDingAttendanceStudents(selectedClass, selectedDate)
    );
    setIsloading(false);
  };

  return (
    <>
      {isloading === true ? (
        <PreLoader />
      ) : (
        <ChakraProvider theme={customTheme}>
          <Sidebar />
          <Container maxW="container.lg" p={6} ml={{ base: 0, md: 72 }}>
            <Heading as="h1" size="xl" mb={4}>
              Mark Attendance
            </Heading>
            <Stack spacing={6} mt={6}>
              <Box>
                <FormLabel>Date</FormLabel>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  maxDate={new Date()}
                />
              </Box>

              <Box>
                <FormLabel>Class</FormLabel>
                <Select
                  value={selectedClass}
                  onChange={handleClassChange}
                  size="md"
                  variant="filled"
                >
                  <option value="">Select a class</option>
                  {classes.map(classOption => (
                    <option key={classOption} value={classOption}>
                      {classOption}
                    </option>
                  ))}
                </Select>
              </Box>
            </Stack>

            <Stack spacing={6} mt={8}>
              {user.map(student => (
                <AttendanceCard
                  key={student.id}
                  student={student}
                  colorMode={colorMode}
                  selectedSubjects={selectedSubjects}
                  setSelectedSubjects={setSelectedSubjects}
                  handleStudentAttendance={handleStudentAttendance}
                />
              ))}
            </Stack>
          </Container>
        </ChakraProvider>
      )}
    </>
  );
};

export default Attendence;
