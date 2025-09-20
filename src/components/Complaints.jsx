import React, { useState } from 'react';
import { Box, Flex, Text, Input, Button, HStack, VStack, Badge, Grid, GridItem, Stack } from '@chakra-ui/react';

const Complaints = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock complaints data for a RageMP server
  const complaints = [
    {
      id: 1,
      title: 'DM at Grove Street',
      description: 'Player ID 1234 randomly killed me near Grove Street without any RP context. I have bodycam footage.',
      customer: {
        name: 'Lucian Popescu',
        email: 'lucian.popescu@example.com',
        avatar: null
      },
      status: 'open',
      priority: 'high',
      category: 'DM',
      createdAt: '2025-09-20T09:30:00Z',
      updatedAt: '2025-09-20T10:15:00Z',
      assignedTo: 'Helper Andrei',
      responses: 3
    },
    {
      id: 2,
      title: 'Trolling at Hospital',
      description: 'Group of players repeatedly blocking ambulance entrance with vehicles, preventing EMS from doing their job.',
      customer: {
        name: 'Ana Ionescu',
        email: 'ana.ionescu@example.com',
        avatar: null
      },
      status: 'in-progress',
      priority: 'medium',
      category: 'Trolling',
      createdAt: '2025-09-20T08:45:00Z',
      updatedAt: '2025-09-20T11:30:00Z',
      assignedTo: 'Moderator Vlad',
      responses: 1
    },
    {
      id: 3,
      title: 'Admin Abuse during chase',
      description: 'Admin TP’d to our chase and froze our vehicle without reason. We want a review of the situation.',
      customer: {
        name: 'Mihai Georgescu',
        email: 'mihai.g@example.com',
        avatar: null
      },
      status: 'resolved',
      priority: 'low',
      category: 'Admin Abuse',
      createdAt: '2025-09-19T14:20:00Z',
      updatedAt: '2025-09-20T09:00:00Z',
      assignedTo: 'Senior Admin Alex',
      responses: 5
    },
    {
      id: 4,
      title: 'Leader Abuse in LSPD',
      description: 'Faction leader gave strikes without explanation and removed salary for the entire shift.',
      customer: {
        name: 'Bogdan Marinescu',
        email: 'bogdan.marinescu@example.com',
        avatar: null
      },
      status: 'open',
      priority: 'high',
      category: 'Leader Abuse',
      createdAt: '2025-09-20T11:15:00Z',
      updatedAt: '2025-09-20T11:15:00Z',
      assignedTo: null,
      responses: 0
    },
    {
      id: 5,
      title: 'VDM/RDM in Downtown',
      description: 'Multiple players ramming pedestrians with cars and shooting randomly during restarts.',
      customer: {
        name: 'Radu Enache',
        email: 'radu.enache@example.com',
        avatar: null
      },
      status: 'closed',
      priority: 'medium',
      category: 'DM',
      createdAt: '2025-09-18T16:30:00Z',
      updatedAt: '2025-09-19T14:45:00Z',
      assignedTo: 'Helper Mara',
      responses: 7
    }
  ];

  const statusOptions = ['all', 'open', 'in-progress', 'resolved', 'closed'];
  const priorityOptions = ['all', 'low', 'medium', 'high', 'urgent'];
  const categoryOptions = ['all', 'DM', 'Trolling', 'Admin Abuse', 'Leader Abuse'];
  
  // Note: Badge colors are handled by getStatusBadgeColor/getPriorityBadgeColor below.

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.category.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesStatus = selectedStatus === 'all' || complaint.status === selectedStatus;
  const matchesPriority = selectedPriority === 'all' || complaint.priority === selectedPriority;
  const matchesCategory = selectedCategory === 'all' || complaint.category === selectedCategory;
  return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
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

  const ComplaintCard = ({ complaint }) => {
    const getStatusBadgeColor = (status) => {
      switch(status) {
        case 'open': return 'rgba(59, 130, 246, 0.8)'; // blue
        case 'in-progress': return 'rgba(251, 146, 60, 0.8)'; // orange
        case 'resolved': return 'rgba(34, 197, 94, 0.8)'; // green
        case 'closed': return 'rgba(107, 114, 128, 0.8)'; // gray
        default: return 'rgba(107, 114, 128, 0.8)';
      }
    };

    const getPriorityBadgeColor = (priority) => {
      switch(priority) {
        case 'low': return 'rgba(34, 197, 94, 0.8)'; // green
        case 'medium': return 'rgba(251, 191, 36, 0.8)'; // yellow
        case 'high': return 'rgba(251, 146, 60, 0.8)'; // orange
        case 'urgent': return 'rgba(239, 68, 68, 0.8)'; // red
        default: return 'rgba(107, 114, 128, 0.8)';
      }
    };

    return (
      <Box
        bg="rgba(0, 0, 0, 0.7)"
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.1)"
        borderRadius="xl"
        p={4}
        _hover={{
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
          bg: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(255, 255, 255, 0.2)'
        }}
        transition="all 0.3s ease"
        borderLeft="4px solid"
        borderLeftColor={getPriorityBadgeColor(complaint.priority)}
      >
        <VStack align="stretch" spacing={3}>
          <HStack justify="space-between" align="flex-start">
            <Text fontSize="lg" fontWeight="bold" color="white">
              #{complaint.id} {complaint.title}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {complaint.category}
            </Text>
          </HStack>

          <HStack spacing={2}>
            <Badge
              bg={getStatusBadgeColor(complaint.status)}
              color="white"
              borderRadius="full"
              px={3}
              py={1}
              fontSize="xs"
              backdropFilter="blur(5px)"
              border="1px solid rgba(255, 255, 255, 0.1)"
            >
              <HStack spacing={1}>
                <Text fontSize="xs">⏰</Text>
                <Text>{complaint.status.replace('-', ' ')}</Text>
              </HStack>
            </Badge>
            <Badge
              bg={getPriorityBadgeColor(complaint.priority)}
              color="white"
              borderRadius="full"
              px={3}
              py={1}
              fontSize="xs"
              backdropFilter="blur(5px)"
              border="1px solid rgba(255, 255, 255, 0.1)"
            >
              <HStack spacing={1}>
                <Text fontSize="xs">🚩</Text>
                <Text>{complaint.priority}</Text>
              </HStack>
            </Badge>
          </HStack>

          <Text fontSize="sm" color="gray.300">
            {complaint.description}
          </Text>

          <HStack justify="space-between" align="center">
            <HStack spacing={3}>
              <Box
                bg="gray.600"
                color="white"
                borderRadius="full"
                w={8}
                h={8}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="sm"
                fontWeight="bold"
              >
                {complaint.customer.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </Box>
              <VStack align="flex-start" spacing={0}>
                <Text fontSize="sm" fontWeight="medium" color="white">
                  {complaint.customer.name}
                </Text>
                <Text fontSize="xs" color="gray.400">
                  {complaint.customer.email}
                </Text>
              </VStack>
            </HStack>
            <VStack align="flex-end" spacing={1}>
              <HStack spacing={1}>
                <Text fontSize="xs" color="gray.400">📅</Text>
                <Text fontSize="xs" color="gray.400">
                  {formatDate(complaint.createdAt)}
                </Text>
              </HStack>
              {complaint.assignedTo && (
                <HStack spacing={1}>
                  <Text fontSize="xs" color="blue.400">👤</Text>
                  <Text fontSize="xs" color="blue.400">
                    {complaint.assignedTo}
                  </Text>
                </HStack>
              )}
              {complaint.responses > 0 && (
                <HStack spacing={1}>
                  <Text fontSize="xs" color="green.400">💬</Text>
                  <Text fontSize="xs" color="green.400">
                    {complaint.responses} responses
                  </Text>
                </HStack>
              )}
            </VStack>
          </HStack>

          <HStack spacing={2} pt={2}>
            <Button
              size="sm"
              variant="outline"
              bg="rgba(255, 255, 255, 0.1)"
              backdropFilter="blur(10px)"
              color="white"
              borderColor="rgba(255, 255, 255, 0.2)"
              _hover={{
                bg: 'rgba(255, 255, 255, 0.2)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                transform: 'translateY(-1px)'
              }}
              borderRadius="xl"
              transition="all 0.2s ease"
            >
              <HStack spacing={1}>
                <Text fontSize="xs">👁️</Text>
                <Text>View</Text>
              </HStack>
            </Button>
            <Button
              size="sm"
              bg="rgba(59, 130, 246, 0.8)"
              backdropFilter="blur(10px)"
              color="white"
              _hover={{
                bg: 'rgba(59, 130, 246, 1)',
                transform: 'translateY(-1px)'
              }}
              borderRadius="xl"
              transition="all 0.2s ease"
            >
              <HStack spacing={1}>
                <Text fontSize="xs">💬</Text>
                <Text>Respond</Text>
              </HStack>
            </Button>
          </HStack>
        </VStack>
      </Box>
    );
  };

  const StatsCard = ({ emoji, label, value, color, bgColor }) => (
    <Box
      overflow="hidden"
      bg="rgba(0, 0, 0, 0.7)"
      backdropFilter="blur(10px)"
      border="1px solid"
      borderColor="rgba(255, 255, 255, 0.1)"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        bg: 'rgba(0, 0, 0, 0.8)',
        transition: 'all 0.3s ease'
      }}
      transition="all 0.3s ease"
      borderRadius="2xl"
      p={6}
      borderLeft="4px solid"
      borderLeftColor={`${color}.500`}
    >
      <HStack spacing={4}>
        <Box
          p={3}
          bg={bgColor}
          borderRadius="xl"
          backdropFilter="blur(10px)"
        >
          <Text fontSize="2xl">{emoji || ''}</Text>
        </Box>
        <VStack align="flex-start" spacing={0}>
          <Text fontSize="2xl" fontWeight="bold" color="white">
            {value}
          </Text>
          <Text fontSize="sm" color="gray.400">
            {label}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );

  return (
    <Box
      p={6}
      bg="linear-gradient(135deg, #1a202c 0%, #2d3748 100%)"
      minH="100vh"
    >
      <VStack align="stretch" spacing={6}>
        {/* Header */}
        <Flex justify="space-between" align="center">
          <VStack align="flex-start" spacing={2}>
            <Text fontSize="3xl" fontWeight="bold" color="white">
              Complaints Management
            </Text>
            <Text color="gray.400">
              Track and resolve customer complaints efficiently
            </Text>
          </VStack>
          <Button
            bg="rgba(59, 130, 246, 0.8)"
            backdropFilter="blur(10px)"
            color="white"
            _hover={{
              bg: 'rgba(59, 130, 246, 1)',
              transform: 'translateY(-2px)'
            }}
            size="lg"
            borderRadius="xl"
          >
            <HStack spacing={2}>
              <Text fontSize="lg">➕</Text>
              <Text>New Complaint</Text>
            </HStack>
          </Button>
        </Flex>

        {/* Stats Cards */}
        <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
          <StatsCard
            emoji="⏰"
            label="Open Complaints"
            value={complaints.filter(c => c.status === 'open').length}
            color="blue"
            bgColor="rgba(59, 130, 246, 0.2)"
          />
          <StatsCard
            emoji="⚠️"
            label="In Progress"
            value={complaints.filter(c => c.status === 'in-progress').length}
            color="orange"
            bgColor="rgba(251, 146, 60, 0.2)"
          />
          <StatsCard
            emoji="🚩"
            label="Admin/Leader Complaints"
            value={complaints.filter(c => c.category === 'Admin Abuse' || c.category === 'Leader Abuse').length}
            color="red"
            bgColor="rgba(239, 68, 68, 0.2)"
          />
          <StatsCard
            emoji="✅"
            label="DM/Trolling Issues"
            value={complaints.filter(c => c.category === 'DM' || c.category === 'Trolling').length}
            color="green"
            bgColor="rgba(34, 197, 94, 0.2)"
          />
        </Grid>

        {/* Filters */}
        <Box
          bg="rgba(0, 0, 0, 0.7)"
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="rgba(255, 255, 255, 0.1)"
          borderRadius="2xl"
          p={6}
        >
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Box flex={1}>
              <HStack>
                <Text color="gray.400">🔍</Text>
                <Input
                  placeholder="Search complaints..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  bg="rgba(255, 255, 255, 0.1)"
                  border="1px solid"
                  borderColor="rgba(255, 255, 255, 0.2)"
                  color="white"
                  _placeholder={{ color: 'gray.400' }}
                  _focus={{
                    borderColor: 'blue.500',
                    bg: 'rgba(255, 255, 255, 0.15)'
                  }}
                  borderRadius="xl"
                />
              </HStack>
            </Box>
            <HStack>
              <Text fontSize="sm" color="gray.400" whiteSpace="nowrap">
                Status:
              </Text>
              <Box>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    minWidth: '120px',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status} style={{ backgroundColor: '#2d3748', color: 'white' }}>
                      {status === 'all' ? 'All Status' : status.replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </Box>
            </HStack>
            <HStack>
              <Text fontSize="sm" color="gray.400" whiteSpace="nowrap">
                Priority:
              </Text>
              <Box>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    minWidth: '120px',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {priorityOptions.map((priority) => (
                    <option key={priority} value={priority} style={{ backgroundColor: '#2d3748', color: 'white' }}>
                      {priority === 'all' ? 'All Priority' : priority}
                    </option>
                  ))}
                </select>
              </Box>
            </HStack>
            <HStack>
              <Text fontSize="sm" color="gray.400" whiteSpace="nowrap">
                Category:
              </Text>
              <Box>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    minWidth: '150px',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat} style={{ backgroundColor: '#2d3748', color: 'white' }}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </Box>
            </HStack>
          </Stack>
        </Box>

        {/* Complaints Grid */}
        <Grid templateColumns="repeat(auto-fill, minmax(400px, 1fr))" gap={6}>
          {filteredComplaints.map(complaint => (
            <GridItem key={complaint.id}>
              <ComplaintCard complaint={complaint} />
            </GridItem>
          ))}
        </Grid>

        {filteredComplaints.length === 0 && (
          <Box
            bg="rgba(0, 0, 0, 0.7)"
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.1)"
            borderRadius="2xl"
            py={12}
          >
            <VStack spacing={4}>
              <Text fontSize="4xl" color="gray.500">⚠️</Text>
              <Text fontSize="xl" color="gray.400" textAlign="center">
                No complaints found
              </Text>
              <Text color="gray.500" textAlign="center">
                Try adjusting your search or filter criteria
              </Text>
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Complaints;