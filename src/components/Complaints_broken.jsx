import { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  HStack,
  VStack,
  Badge,
  Avatar,
  Grid,
  GridItem,
  IconButton,
  Stack
} from '@chakra-ui/react';
import { 
  FaSearch, 
  FaPlus, 
  FaEye, 
  FaReply, 
  FaEllipsisV, 
  FaExclamationTriangle,
  FaClock,
  FaCheckCircle,
  FaFlag,
  FaUser,
  FaCalendarAlt
} from 'react-icons/fa';

const Complaints = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  // Mock complaints data
  const complaints = [
    {
      id: 1,
      title: 'Unable to access dashboard',
      description: 'I have been trying to log into my dashboard for the past 2 hours but keep getting error messages.',
      customer: {
        name: 'John Doe',
        email: 'john.doe@email.com',
        avatar: null
      },
      status: 'open',
      priority: 'high',
      category: 'Technical',
      createdAt: '2025-09-20T09:30:00Z',
      updatedAt: '2025-09-20T10:15:00Z',
      assignedTo: 'Alice Johnson',
      responses: 3
    },
    {
      id: 2,
      title: 'Billing discrepancy',
      description: 'There seems to be an error in my last invoice. I was charged twice for the same service.',
      customer: {
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        avatar: null
      },
      status: 'in-progress',
      priority: 'medium',
      category: 'Billing',
      createdAt: '2025-09-20T08:45:00Z',
      updatedAt: '2025-09-20T11:30:00Z',
      assignedTo: 'Bob Smith',
      responses: 1
    },
    {
      id: 3,
      title: 'Feature request: Dark mode',
      description: 'Would love to have a dark mode option in the application for better user experience.',
      customer: {
        name: 'Mike Johnson',
        email: 'mike.johnson@email.com',
        avatar: null
      },
      status: 'resolved',
      priority: 'low',
      category: 'Feature Request',
      createdAt: '2025-09-19T14:20:00Z',
      updatedAt: '2025-09-20T09:00:00Z',
      assignedTo: 'Carol Davis',
      responses: 5
    },
    {
      id: 4,
      title: 'Password reset not working',
      description: 'The password reset email is not being received. Checked spam folder as well.',
      customer: {
        name: 'Sarah Wilson',
        email: 'sarah.wilson@email.com',
        avatar: null
      },
      status: 'open',
      priority: 'high',
      category: 'Account',
      createdAt: '2025-09-20T11:15:00Z',
      updatedAt: '2025-09-20T11:15:00Z',
      assignedTo: null,
      responses: 0
    },
    {
      id: 5,
      title: 'Slow loading times',
      description: 'The application has been very slow to load pages, especially during peak hours.',
      customer: {
        name: 'David Brown',
        email: 'david.brown@email.com',
        avatar: null
      },
      status: 'closed',
      priority: 'medium',
      category: 'Performance',
      createdAt: '2025-09-18T16:30:00Z',
      updatedAt: '2025-09-19T14:45:00Z',
      assignedTo: 'David Wilson',
      responses: 7
    }
  ];

  const statusOptions = ['all', 'open', 'in-progress', 'resolved', 'closed'];
  const priorityOptions = ['all', 'low', 'medium', 'high', 'urgent'];
  
  const statusColors = {
    open: 'blue',
    'in-progress': 'orange',
    resolved: 'green',
    closed: 'gray'
  };

  const priorityColors = {
    low: 'green',
    medium: 'yellow',
    high: 'orange',
    urgent: 'red'
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || complaint.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || complaint.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };
  };

  const ComplaintCard = ({ complaint }) => {
    return (
      <Box
        bg="white"
        borderRadius="xl"
        overflow="hidden"
        boxShadow="md"
        _hover={{
          transform: 'translateY(-4px)',
          boxShadow: 'lg',
          transition: 'all 0.2s ease-in-out'
        }}
        transition="all 0.2s ease-in-out"
        borderLeft="4px solid"
        borderLeftColor={`${priorityColors[complaint.priority]}.500`}
      >
        <Box p={6}>
          <VStack align="stretch" spacing={4}>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold" color="gray.800" noOfLines={1}>
                #{complaint.id} {complaint.title}
              </Text>
              <IconButton
                variant="ghost"
                size="sm"
                color="gray.500"
                aria-label="More options"
              >
                <FaEllipsisV />
              </IconButton>
            </HStack>
            
            <HStack flexWrap="wrap" spacing={2}>
              <Badge
                colorScheme={statusColors[complaint.status]}
                variant="subtle"
                display="flex"
                alignItems="center"
                gap={1}
              >
                <FaClock size={12} />
                {complaint.status.replace('-', ' ')}
              </Badge>
              <Badge
                colorScheme={priorityColors[complaint.priority]}
                variant="solid"
                display="flex"
                alignItems="center"
                gap={1}
              >
                <FaFlag size={12} />
                {complaint.priority}
              </Badge>
              <Badge variant="outline">
                {complaint.category}
              </Badge>
            </HStack>
            
            <Text fontSize="sm" color="gray.700" noOfLines={2}>
              {complaint.description}
            </Text>
            
            <HStack justify="space-between" width="100%">
              <HStack>
                <Avatar
                  name={complaint.customer.name}
                  src={complaint.customer.avatar}
                  size="sm"
                  bg="gray.400"
                />
                <VStack align="flex-start" spacing={0}>
                  <Text fontSize="sm" fontWeight="medium" color="gray.800">
                    {complaint.customer.name}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {complaint.customer.email}
                  </Text>
                </VStack>
              </HStack>
              
              <VStack align="flex-end" spacing={1}>
                <HStack spacing={1}>
                  <FaCalendarAlt size={12} color="gray.500" />
                  <Text fontSize="xs" color="gray.600">
                    {formatDate(complaint.createdAt)}
                  </Text>
                </HStack>
                {complaint.assignedTo && (
                  <HStack spacing={1}>
                    <FaUser size={12} color="blue.500" />
                    <Text fontSize="xs" color="blue.600">
                      {complaint.assignedTo}
                    </Text>
                  </HStack>
                )}
              </VStack>
            </HStack>
            
            <HStack justify="space-between" width="100%">
              <HStack>
                <Button size="sm" variant="outline" display="flex" alignItems="center" gap={2}>
                  <FaEye size={14} /> View
                </Button>
                <Button size="sm" colorScheme="blue" display="flex" alignItems="center" gap={2}>
                  <FaReply size={14} /> Respond
                </Button>
              </HStack>
              
              {complaint.responses > 0 && (
                <Badge colorScheme="gray" variant="subtle">
                  {complaint.responses} responses
                </Badge>
              )}
            </HStack>
          </VStack>
        </Box>
      </Box>
    );
  };

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <VStack align="stretch" spacing={6}>
        {/* Header */}
        <Flex justify="space-between" align="center">
          <VStack align="flex-start" spacing={1}>
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">
              Complaints Management
            </Text>
            <Text color="gray.600">
              Track and resolve customer complaints efficiently
            </Text>
          </VStack>
          <Button
            colorScheme="blue"
            size="lg"
            borderRadius="xl"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <FaPlus /> New Complaint
          </Button>
        </Flex>

        {/* Stats Cards */}
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
          <Box bg="white" borderLeft="4px solid" borderLeftColor="blue.500" borderRadius="xl" boxShadow="md">
            <Box p={4}>
              <HStack>
                <Box p={3} bg="blue.100" borderRadius="xl">
                  <FaClock size={24} color="blue.500" />
                </Box>
                <VStack align="flex-start" spacing={0}>
                  <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                    {complaints.filter(c => c.status === 'open').length}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Open Complaints
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Box>

          <Box bg="white" borderLeft="4px solid" borderLeftColor="orange.500" borderRadius="xl" boxShadow="md">
            <Box p={4}>
              <HStack>
                <Box p={3} bg="orange.100" borderRadius="xl">
                  <FaExclamationTriangle size={24} color="orange.500" />
                </Box>
                <VStack align="flex-start" spacing={0}>
                  <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                    {complaints.filter(c => c.status === 'in-progress').length}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    In Progress
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Box>

          <Box bg="white" borderLeft="4px solid" borderLeftColor="red.500" borderRadius="xl" boxShadow="md">
            <Box p={4}>
              <HStack>
                <Box p={3} bg="red.100" borderRadius="xl">
                  <FaFlag size={24} color="red.500" />
                </Box>
                <VStack align="flex-start" spacing={0}>
                  <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                    {complaints.filter(c => c.priority === 'urgent' || c.priority === 'high').length}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    High Priority
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Box>

          <Box bg="white" borderLeft="4px solid" borderLeftColor="green.500" borderRadius="xl" boxShadow="md">
            <Box p={4}>
              <HStack>
                <Box p={3} bg="green.100" borderRadius="xl">
                  <FaCheckCircle size={24} color="green.500" />
                </Box>
                <VStack align="flex-start" spacing={0}>
                  <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                    {complaints.filter(c => c.status === 'resolved').length}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Resolved Today
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Box>
        </Grid>

        {/* Filters */}
        <Box bg="white" borderRadius="xl" boxShadow="md">
          <Box p={6}>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Box flex={1}>
                <HStack>
                  <FaSearch color="gray.500" />
                  <Input
                    placeholder="Search complaints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: 'blue.500',
                      boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)'
                    }}
                  />
                </HStack>
              </Box>
              <HStack>
                <Text fontSize="sm" color="gray.600" whiteSpace="nowrap">
                  Status:
                </Text>
                <Box>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '12px',
                      border: '1px solid var(--chakra-colors-gray-300)',
                      backgroundColor: 'white',
                      minWidth: '120px'
                    }}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status === 'all' ? 'All Status' : status.replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                </Box>
              </HStack>
              <HStack>
                <Text fontSize="sm" color="gray.600" whiteSpace="nowrap">
                  Priority:
                </Text>
                <Box>
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '12px',
                      border: '1px solid var(--chakra-colors-gray-300)',
                      backgroundColor: 'white',
                      minWidth: '120px'
                    }}
                  >
                    {priorityOptions.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority === 'all' ? 'All Priority' : priority}
                      </option>
                    ))}
                  </select>
                </Box>
              </HStack>
            </Stack>
          </Box>
        </Box>

        {/* Complaints Grid */}
        <Grid templateColumns="repeat(auto-fill, minmax(450px, 1fr))" gap={6}>
          {filteredComplaints.map(complaint => (
            <GridItem key={complaint.id}>
              <ComplaintCard complaint={complaint} />
            </GridItem>
          ))}
        </Grid>

        {filteredComplaints.length === 0 && (
          <Box bg="white" borderRadius="xl" boxShadow="md">
            <Box py={12}>
              <VStack spacing={4}>
                <FaExclamationTriangle size={48} color="gray.400" />
                <Text fontSize="xl" color="gray.600" textAlign="center">
                  No complaints found
                </Text>
                <Text color="gray.500" textAlign="center">
                  Try adjusting your search or filter criteria
                </Text>
              </VStack>
            </Box>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Complaints;