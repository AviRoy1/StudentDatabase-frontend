import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorModeValue,
  Heading,
  Text,
  Button,
  List,
  ListItem,
  FormLabel,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import ColorModeSwitcher from '../../ColorModeSwitcher';
import { useDispatch, useSelector } from 'react-redux';
import { myProfile } from '../../Redux/Actions/StudentAction';
import PreLoader from '../../components/layout/Loader/Loader';
import axios from 'axios';
import { server } from '../../Redux/store';

const StudentProfile = ({ student, accessToken }) => {
  console.log(student);

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [present, setPresent] = useState([]);
  const [absent, setAbsent] = useState([]);

  const findSubjects = async () => {
    try {
      console.log(selectedDate);
      const originalDate = new Date(selectedDate);
      const isoFormattedDate = originalDate.toISOString();
      const res = await axios.post(
        `${server}/api/attendance/myattendance`,
        { date: isoFormattedDate },
        {
          headers: {
            token: accessToken,
          },
        }
      );
      console.log(' received:', res.data);
      setAbsent(res.data.absent);
      setPresent(res.data.attended);
    } catch (error) {
      console.log('API error:', error);
    }
  };

  const handleDateChange = date => {
    console.log(date);
    setSelectedDate(date);
  };
  const getAttendance = async () => {
    await findSubjects();
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setloading] = useState(false);

  const handleTabChange = index => {
    setSelectedTab(index);
  };

  const tabBackgroundColor = useColorModeValue('primary.500', 'neutral.800');
  const tabColor = useColorModeValue('white', 'gray.800');
  const panelBackgroundColor = useColorModeValue('white', 'neutral.800');

  return (
    <>
      <ColorModeSwitcher />
      <Container maxW="xl" mt={8}>
        <Heading mb={4} fontSize="xl">
          Student Profile
        </Heading>

        <Tabs
          variant="enclosed-colored"
          onChange={handleTabChange}
          colorScheme="primary"
        >
          <TabList>
            <Tab
              _selected={{ color: 'yellow.600', bg: tabBackgroundColor }}
              color={selectedTab === 0 ? 'yellow.600' : tabColor} // Set text color based on selectedTab
            >
              Profile
            </Tab>
            <Tab
              _selected={{ color: 'yellow.600', bg: tabBackgroundColor }}
              color={selectedTab === 1 ? 'yellow.600' : tabColor} // Set text color based on selectedTab
            >
              Attendance
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box
                p={4}
                shadow="md"
                borderWidth="1px"
                bg={panelBackgroundColor}
              >
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  Name: {student.name}
                </Text>
                <Text fontSize="lg" mb={2}>
                  Age: {student.age}
                </Text>
                <Text fontSize="lg" mb={2}>
                  Class: {student.Class}
                </Text>
                <Text fontSize="lg">
                  Subjects: {student.subjects.map(s => s).join(', ')}
                </Text>
              </Box>
            </TabPanel>

            <TabPanel>
              <Box
                p={4}
                shadow="md"
                borderWidth="1px"
                bg={panelBackgroundColor}
              >
                <Box>
                  <FormLabel>Date</FormLabel>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    maxDate={new Date()}
                  />
                </Box>

                <Button
                  mt={4}
                  color="yellow.400"
                  _hover={{ transform: 'scale(1.05)' }}
                  onClick={getAttendance}
                >
                  Get Attendance
                </Button>

                <Text mt={4} fontWeight="bold">
                  Present Subjects:
                </Text>
                <List mt={2} spacing={2}>
                  {/* List of Present Subjects */}
                  {present.length === 0 ? (
                    <Text>NO SUBJECTS...</Text>
                  ) : (
                    present.map(e => <Text key={e}>{e}</Text>)
                  )}
                </List>

                <Text mt={4} fontWeight="bold">
                  Absent Subjects:
                </Text>
                <List mt={2} spacing={2}>
                  {/* List of Absent Subjects */}
                  {absent.length === 0 ? (
                    <Text>NO SUBJECTS...</Text>
                  ) : (
                    absent.map(e => <Text key={e}>{e}</Text>)
                  )}
                </List>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};

export default StudentProfile;
