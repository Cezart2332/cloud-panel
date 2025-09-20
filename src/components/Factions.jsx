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
  Stack,
  Image
} from '@chakra-ui/react';
import { 
  FaSearch, 
  FaPlus, 
  FaUsers, 
  FaExclamationTriangle, 
  FaFileAlt, 
  FaClipboardList,
  FaEllipsisV,
  FaEye,
  FaEdit,
  FaTrash,
  FaCrown,
  FaFlag,
  FaStar
} from 'react-icons/fa';

const Factions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // GTA V RageMP server factions data
  const factions = [
    {
      id: 1,
      name: 'Los Santos Police Department',
      type: 'Government',
      photo: '/src/assets/lspd.jpg',
      description: 'The primary law enforcement agency for Los Santos, dedicated to maintaining peace and order throughout the city.',
      members: 87,
      complaints: 12,
      logs: 342,
      applications: 23,
      status: 'active',
      leader: 'Chief of Police',
      established: '1955-03-15',
      reputation: 'excellent'
    },
    {
      id: 2,
      name: 'Federal Bureau of Investigation',
      type: 'Government',
      photo: '/src/assets/fbi.jpg',
      description: 'Elite federal law enforcement agency handling high-priority crimes and national security matters.',
      members: 45,
      complaints: 3,
      logs: 189,
      applications: 8,
      status: 'active',
      leader: 'FBI Director',
      established: '1935-07-26',
      reputation: 'excellent'
    },
    {
      id: 3,
      name: 'Los Santos National Guard',
      type: 'Military',
      photo: '/src/assets/nationalguard.png',
      description: 'Military reserve force responsible for homeland security and emergency response operations.',
      members: 62,
      complaints: 5,
      logs: 234,
      applications: 15,
      status: 'active',
      leader: 'General Commander',
      established: '1903-12-13',
      reputation: 'excellent'
    },
    {
      id: 4,
      name: 'Taxi Los Santos',
      type: 'Commercial',
      photo: '/src/assets/taxi.png',
      description: 'Premier taxi service providing reliable transportation throughout Los Santos and surrounding areas.',
      members: 34,
      complaints: 8,
      logs: 567,
      applications: 19,
      status: 'recruiting',
      leader: 'Fleet Manager',
      established: '1987-05-20',
      reputation: 'good'
    },
    {
      id: 5,
      name: 'Ballas',
      type: 'Gang',
      photo: '/src/assets/ballas.jpg',
      description: 'Notorious street gang controlling territory in South Los Santos, known for their purple colors.',
      members: 28,
      complaints: 45,
      logs: 123,
      applications: 7,
      status: 'active',
      leader: 'Big Boss',
      established: '1980-08-12',
      reputation: 'poor'
    },
    {
      id: 6,
      name: 'Grove Street Families',
      type: 'Gang',
      photo: '/src/assets/grove.jpg',
      description: 'Historic street gang from Grove Street, rivals of the Ballas, known for their green colors.',
      members: 31,
      complaints: 38,
      logs: 156,
      applications: 5,
      status: 'active',
      leader: 'OG Leader',
      established: '1975-11-03',
      reputation: 'fair'
    },
    {
      id: 7,
      name: 'Los Santos Medical Center',
      type: 'Medical',
      photo: '/src/assets/paramedics.jpg',
      description: 'Primary medical facility providing emergency healthcare services and medical support to the city.',
      members: 52,
      complaints: 2,
      logs: 289,
      applications: 12,
      status: 'recruiting',
      leader: 'Chief Medical Officer',
      established: '1952-09-18',
      reputation: 'excellent'
    },
    {
      id: 8,
      name: 'Los Santos Fire Department',
      type: 'Emergency',
      photo: '/src/assets/firedepartament.jpg',
      description: 'Fire and rescue service protecting Los Santos from fires, accidents, and emergency situations.',
      members: 41,
      complaints: 1,
      logs: 198,
      applications: 9,
      status: 'active',
      leader: 'Fire Chief',
      established: '1963-04-07',
      reputation: 'excellent'
    }
  ];

  const factionTypes = ['all', 'Government', 'Military', 'Commercial', 'Gang', 'Medical', 'Emergency'];
  
  const typeColors = {
    Government: 'blue',
    Military: 'red',
    Commercial: 'green',
    Gang: 'purple',
    Medical: 'teal',
    Emergency: 'orange'
  };

  const statusColors = {
    active: 'green',
    inactive: 'gray',
    recruiting: 'blue'
  };

  const reputationColors = {
    excellent: 'green',
    good: 'yellow',
    fair: 'orange',
    poor: 'red'
  };

  const filteredFactions = factions.filter(faction => {
    const matchesSearch = faction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || faction.type === selectedType;
    return matchesSearch && matchesType;
  });

  const FactionCard = ({ faction }) => {
    return (
      <Box
        overflow="hidden"
        bg="rgba(0, 0, 0, 0.7)"
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.1)"
        _hover={{
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          bg: 'rgba(0, 0, 0, 0.8)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        borderRadius="2xl"
        position="relative"
      >
        {/* Header with Image */}
        <Box position="relative" height="200px" overflow="hidden">
          <Image
            src={faction.photo}
            alt={faction.name}
            width="100%"
            height="100%"
            objectFit="cover"
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.1)' }}
          />
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)"
          />
          <Box position="absolute" top="4" right="4">
            <IconButton
              variant="ghost"
              size="sm"
              bg="rgba(255, 255, 255, 0.2)"
              backdropFilter="blur(10px)"
              color="white"
              _hover={{ bg: 'rgba(255, 255, 255, 0.3)' }}
              borderRadius="xl"
              icon={<FaEllipsisV />}
            />
          </Box>
          <Box position="absolute" bottom="4" left="4" right="4">
            <VStack align="flex-start" spacing={1}>
              <Text fontSize="2xl" fontWeight="bold" color="white" textShadow="2px 2px 4px rgba(0,0,0,0.5)">
                {faction.name}
              </Text>
              <HStack>
                <Badge
                  colorScheme={typeColors[faction.type]}
                  variant="solid"
                  borderRadius="full"
                  px={3}
                  py={1}
                  fontSize="xs"
                  bg="rgba(255, 255, 255, 0.2)"
                  color="white"
                  backdropFilter="blur(10px)"
                >
                  {faction.type}
                </Badge>
                <Badge
                  colorScheme={statusColors[faction.status]}
                  variant="solid"
                  borderRadius="full"
                  px={3}
                  py={1}
                  fontSize="xs"
                  bg="rgba(255, 255, 255, 0.2)"
                  color="white"
                  backdropFilter="blur(10px)"
                >
                  {faction.status}
                </Badge>
              </HStack>
            </VStack>
          </Box>
        </Box>

        <Box p={6}>
          <VStack align="stretch" spacing={4}>
            {/* Description */}
            <Text fontSize="sm" color="gray.300" lineHeight="1.6">
              {faction.description}
            </Text>

            {/* Leader and Reputation */}
            <HStack justify="space-between">
              <HStack>
                <Box as={FaCrown} color="yellow.500" />
                <Text fontSize="sm" fontWeight="medium" color="white">
                  {faction.leader}
                </Text>
              </HStack>
              <HStack>
                <Box as={FaStar} color="yellow.500" />
                <Badge
                  colorScheme={reputationColors[faction.reputation]}
                  variant="subtle"
                  fontSize="xs"
                  textTransform="capitalize"
                >
                  {faction.reputation}
                </Badge>
              </HStack>
            </HStack>

            {/* Stats Grid */}
            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
              <StatsCard
                icon={<FaUsers />}
                label="Members"
                value={faction.members}
                color="blue"
                link="/staff"
              />
              <StatsCard
                icon={<FaExclamationTriangle />}
                label="Complaints"
                value={faction.complaints}
                color="orange"
                link="/complaints"
              />
              <StatsCard
                icon={<FaFileAlt />}
                label="Logs"
                value={faction.logs}
                color="green"
                link="/logs"
              />
              <StatsCard
                icon={<FaClipboardList />}
                label="Applications"
                value={faction.applications}
                color="purple"
                link="/applications"
              />
            </Grid>

            {/* Action Buttons */}
            <HStack spacing={2} pt={2}>
              <Button
                size="sm"
                colorScheme="blue"
                variant="solid"
                flex={1}
                borderRadius="xl"
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                transition="all 0.2s ease"
              >
                Apply
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Box>
    );
  };

  const StatsCard = ({ icon, label, value, color, link }) => {
    return (
      <Box
        as="button"
        p={3}
        bg={`${color}.50`}
        borderRadius="xl"
        border="1px solid"
        borderColor={`${color}.200`}
        _hover={{
          bg: `${color}.100`,
          transform: 'translateY(-2px)',
          boxShadow: 'md',
          transition: 'all 0.2s ease'
        }}
        transition="all 0.2s ease"
        cursor="pointer"
      >
        <VStack spacing={2}>
          <Box color={`${color}.500`} fontSize="lg">
            {icon}
          </Box>
          <Text fontSize="2xl" fontWeight="bold" color={`${color}.600`}>
            {value}
          </Text>
          <Text fontSize="xs" color="gray.600" textTransform="uppercase" letterSpacing="wider">
            {label}
          </Text>
        </VStack>
      </Box>
    );
  };

  return (
    <Box 
      p={6} 
      bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
      minH="100vh"
      position="relative"
    >
      {/* Background Pattern */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.1"
        backgroundImage="radial-gradient(circle at 25% 25%, white 2px, transparent 2px)"
        backgroundSize="50px 50px"
      />

      <VStack align="stretch" spacing={6} position="relative">
        {/* Header */}
        <Flex justify="space-between" align="center">
          <VStack align="flex-start" spacing={1}>
            <Text fontSize="3xl" fontWeight="bold" color="white" textShadow="2px 2px 4px rgba(0,0,0,0.3)">
              Factions Management
            </Text>
            <Text color="rgba(255, 255, 255, 0.8)">
              Manage and oversee all faction activities and memberships
            </Text>
          </VStack>
        </Flex>

        {/* Stats Overview */}
        <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
          <Box bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(10px)" borderRadius="2xl" boxShadow="md">
            <Box p={4}>
              <HStack>
                <Box p={3} bg="blue.100" borderRadius="xl">
                  <Box as={FaFlag} boxSize={6} color="blue.500" />
                </Box>
                <VStack align="flex-start" spacing={0}>
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    {factions.length}
                  </Text>
                  <Text fontSize="sm" color="gray.300">
                    Total Factions
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Box>

          <Box bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(10px)" borderRadius="2xl" boxShadow="md">
            <Box p={4}>
              <HStack>
                <Box p={3} bg="green.100" borderRadius="xl">
                  <Box as={FaUsers} boxSize={6} color="green.500" />
                </Box>
                <VStack align="flex-start" spacing={0}>
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    {factions.reduce((acc, f) => acc + f.members, 0)}
                  </Text>
                  <Text fontSize="sm" color="gray.300">
                    Total Members
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Box>

          <Box bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(10px)" borderRadius="2xl" boxShadow="md">
            <Box p={4}>
              <HStack>
                <Box p={3} bg="purple.100" borderRadius="xl">
                  <Box as={FaClipboardList} boxSize={6} color="purple.500" />
                </Box>
                <VStack align="flex-start" spacing={0}>
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    {factions.reduce((acc, f) => acc + f.applications, 0)}
                  </Text>
                  <Text fontSize="sm" color="gray.300">
                    Pending Applications
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Box>
        </Grid>

        {/* Filters */}
        <Box bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(10px)" borderRadius="2xl" boxShadow="md">
          <Box p={6}>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Box flex={1}>
                <HStack>
                  <Box as={FaSearch} color="gray.400" />
                  <Input
                    placeholder="Search factions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="gray.600"
                    bg="rgba(255, 255, 255, 0.1)"
                    color="white"
                    _placeholder={{ color: 'gray.400' }}
                    _focus={{
                      borderColor: 'blue.500',
                      boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)'
                    }}
                  />
                </HStack>
              </Box>
              <HStack>
                <Text fontSize="sm" color="gray.400" whiteSpace="nowrap">
                  Type:
                </Text>
                <Box>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '12px',
                      border: '1px solid var(--chakra-colors-gray-600)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      minWidth: '140px'
                    }}
                  >
                    {factionTypes.map(type => (
                      <option key={type} value={type} style={{ backgroundColor: '#1a202c', color: 'white' }}>
                        {type === 'all' ? 'All Types' : type}
                      </option>
                    ))}
                  </select>
                </Box>
              </HStack>
            </Stack>
          </Box>
        </Box>

        {/* Factions Grid */}
        <Grid templateColumns="repeat(auto-fill, minmax(400px, 1fr))" gap={8}>
          {filteredFactions.map(faction => (
            <GridItem key={faction.id}>
              <FactionCard faction={faction} />
            </GridItem>
          ))}
        </Grid>

        {filteredFactions.length === 0 && (
          <Box bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(10px)" borderRadius="2xl" boxShadow="md">
            <Box py={12}>
              <VStack spacing={4}>
                <Box as={FaFlag} boxSize={12} color="gray.500" />
                <Text fontSize="xl" color="gray.300" textAlign="center">
                  No factions found
                </Text>
                <Text color="gray.400" textAlign="center">
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

export default Factions;