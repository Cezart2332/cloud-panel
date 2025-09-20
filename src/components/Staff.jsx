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
  Grid,
  GridItem,
  Stack
} from '@chakra-ui/react';

const Staff = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  // Mock staff data for a RageMP server (Admin, Helper, Leader)
  const staffMembers = [
    {
      id: 1,
      name: 'Andrei Pop',
      email: 'andrei.pop@server.com',
      role: 'Admin',
      status: 'active',
      avatar: null,
      joinDate: '2024-11-15',
      lastActive: '5 minutes ago'
    },
    {
      id: 2,
      name: 'Mara Ionescu',
      email: 'mara.ionescu@server.com',
      role: 'Helper',
      status: 'active',
      avatar: null,
      joinDate: '2025-02-10',
      lastActive: '2 hours ago'
    },
    {
      id: 3,
      name: 'Alex Dobre',
      email: 'alex.dobre@server.com',
      role: 'Leader',
      status: 'inactive',
      avatar: null,
      joinDate: '2024-09-01',
      lastActive: '1 week ago'
    },
    {
      id: 4,
      name: 'Vlad Petrescu',
      email: 'vlad.petrescu@server.com',
      role: 'Admin',
      status: 'active',
      avatar: null,
      joinDate: '2023-12-01',
      lastActive: '1 day ago'
    },
    {
      id: 5,
      name: 'Bianca Marin',
      email: 'bianca.marin@server.com',
      role: 'Helper',
      status: 'active',
      avatar: null,
      joinDate: '2025-05-20',
      lastActive: '30 minutes ago'
    },
    {
      id: 6,
      name: 'Costin Radu',
      email: 'costin.radu@server.com',
      role: 'Leader',
      status: 'active',
      avatar: null,
      joinDate: '2024-06-18',
      lastActive: '3 hours ago'
    }
  ];

  const roleOptions = ['all', 'Admin', 'Helper', 'Leader'];

  const roleColors = {
    Admin: 'red',
    Helper: 'blue',
    Leader: 'purple'
  };

  const roleEmojis = {
    Admin: '🛡️',
    Helper: '🆘',
    Leader: '�'
  };

  const filteredStaff = staffMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const StaffCard = ({ member }) => {
    const roleEmoji = roleEmojis[member.role] || '👥';
    
    return (
      <Box
        bg="rgba(0, 0, 0, 0.7)"
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.1)"
        borderRadius="xl"
        overflow="hidden"
        _hover={{
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
          bg: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(255, 255, 255, 0.2)'
        }}
        transition="all 0.3s ease"
      >
        <Box p={6}>
          <Flex justify="space-between" align="flex-start">
            <HStack spacing={3}>
              <Box
                bg="gray.600"
                color="white"
                borderRadius="full"
                w={12}
                h={12}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="md"
                fontWeight="bold"
              >
                {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </Box>
              <VStack align="flex-start" spacing={1}>
                <Text fontSize="lg" fontWeight="bold" color="white">
                  {member.name}
                </Text>
                <Text fontSize="sm" color="gray.400">
                  {member.email}
                </Text>
                <HStack>
                  <Badge
                    colorScheme={roleColors[member.role] || 'gray'}
                    variant="subtle"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <Text as="span" fontSize="xs">{roleEmoji}</Text>
                    <Text as="span">{member.role}</Text>
                  </Badge>
                  <Badge
                    colorScheme={member.status === 'active' ? 'green' : 'gray'}
                    variant="subtle"
                  >
                    <Text as="span">{member.status}</Text>
                  </Badge>
                </HStack>
              </VStack>
            </HStack>
            <Button variant="ghost" size="sm" color="gray.400">⋮</Button>
          </Flex>
        </Box>
        
        <Box p={6} pt={0}>
          <VStack align="flex-start" spacing={2}>
            <HStack>
              <Text fontSize="sm" color="gray.400" fontWeight="medium">
                Department:
              </Text>
              <Text fontSize="sm" color="gray.300">
                {member.role}
              </Text>
            </HStack>
            <HStack>
              <Text fontSize="sm" color="gray.400" fontWeight="medium">
                Joined:
              </Text>
              <Text fontSize="sm" color="gray.300">
                {new Date(member.joinDate).toLocaleDateString()}
              </Text>
            </HStack>
            <HStack>
              <Text fontSize="sm" color="gray.400" fontWeight="medium">
                Last Active:
              </Text>
              <Text fontSize="sm" color="gray.300">
                {member.lastActive}
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Box>
    );
  };

  return (
    <Box p={6} bg="linear-gradient(135deg, #1a202c 0%, #2d3748 100%)" minH="100vh">
      <VStack align="stretch" spacing={6}>
        {/* Header */}
        <Flex justify="space-between" align="center">
          <VStack align="flex-start" spacing={1}>
            <Text fontSize="3xl" fontWeight="bold" color="white">
              Staff Management
            </Text>
            <Text color="gray.400">
              Manage Admins, Helpers, and Leaders
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
              <Text as="span">➕</Text>
              <Text>Add Staff Member</Text>
            </HStack>
          </Button>
        </Flex>

        {/* Stats Cards */}
        <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
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
            borderLeftColor={`blue.500`}
          >
            <HStack spacing={4}>
              <Box p={3} bg="rgba(59, 130, 246, 0.2)" borderRadius="xl" backdropFilter="blur(10px)">
                <Text fontSize="2xl">👥</Text>
              </Box>
              <VStack align="flex-start" spacing={0}>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {staffMembers.length}
                </Text>
                <Text fontSize="sm" color="gray.400">Total Staff</Text>
              </VStack>
            </HStack>
          </Box>

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
            borderLeftColor={`red.500`}
          >
            <HStack spacing={4}>
              <Box p={3} bg="rgba(239, 68, 68, 0.2)" borderRadius="xl" backdropFilter="blur(10px)">
                <Text fontSize="2xl">🛡️</Text>
              </Box>
              <VStack align="flex-start" spacing={0}>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {staffMembers.filter(s => s.role === 'Admin').length}
                </Text>
                <Text fontSize="sm" color="gray.400">Admins</Text>
              </VStack>
            </HStack>
          </Box>

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
            borderLeftColor={`blue.500`}
          >
            <HStack spacing={4}>
              <Box p={3} bg="rgba(59, 130, 246, 0.2)" borderRadius="xl" backdropFilter="blur(10px)">
                <Text fontSize="2xl">🆘</Text>
              </Box>
              <VStack align="flex-start" spacing={0}>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {staffMembers.filter(s => s.role === 'Helper').length}
                </Text>
                <Text fontSize="sm" color="gray.400">Helpers</Text>
              </VStack>
            </HStack>
          </Box>

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
            borderLeftColor={`purple.500`}
          >
            <HStack spacing={4}>
              <Box p={3} bg="rgba(168, 85, 247, 0.2)" borderRadius="xl" backdropFilter="blur(10px)">
                <Text fontSize="2xl">👑</Text>
              </Box>
              <VStack align="flex-start" spacing={0}>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {staffMembers.filter(s => s.role === 'Leader').length}
                </Text>
                <Text fontSize="sm" color="gray.400">Leaders</Text>
              </VStack>
            </HStack>
          </Box>
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
                    placeholder="Search staff members..."
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
                  Role:
                </Text>
                <Box>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      minWidth: '140px',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    {roleOptions.map(role => (
                      <option key={role} value={role} style={{ backgroundColor: '#2d3748', color: 'white' }}>
                        {role === 'all' ? 'All Roles' : role}
                      </option>
                    ))}
                  </select>
                </Box>
              </HStack>
            </Stack>
        </Box>

        {/* Staff Grid */}
        <Grid templateColumns="repeat(auto-fill, minmax(400px, 1fr))" gap={6}>
          {filteredStaff.map(member => (
            <GridItem key={member.id}>
              <StaffCard member={member} />
            </GridItem>
          ))}
        </Grid>

        {filteredStaff.length === 0 && (
          <Box
            bg="rgba(0, 0, 0, 0.7)"
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.1)"
            borderRadius="2xl"
            py={12}
          >
            <VStack spacing={4}>
              <Text fontSize="4xl" color="gray.500">👥</Text>
              <Text fontSize="xl" color="gray.400" textAlign="center">
                No staff members found
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

export default Staff;