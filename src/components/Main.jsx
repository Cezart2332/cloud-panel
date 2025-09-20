import React from "react"
import { Flex, SimpleGrid, VStack, Box, Heading, Text, HStack, Avatar, Badge, Button } from "@chakra-ui/react"
import { useColorModeValue } from "./ui/color-mode";
import { motion, AnimatePresence } from "framer-motion";
import DashboardBox from "./DashboardBox";
import { MdEmojiPeople } from "react-icons/md";
import { FaUsers, FaHome, FaBuilding } from "react-icons/fa";
import { Tooltip } from "./ui/tooltip";

const MotionBox = motion.create(Box);

function SectionCard({ title, right, children }){
    const cardBg = useColorModeValue('white', 'blue.800');
    const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
    const titleGradient = useColorModeValue('linear(to-r, blue.600, cyan.500)', 'linear(to-r, blue.300, cyan.300)');
    return (
        <Box bg={cardBg} p="4" borderRadius="xl" boxShadow="sm" position="relative" overflow="hidden" borderWidth="1px" borderColor={borderColor}>
            <Box position="absolute" inset="-1" borderRadius="xl" bgGradient="linear(to-r, blue.500/15, transparent)" pointerEvents="none" />
            <HStack justify="space-between" mb="3">
                <Heading as="h3" size="sm" bgGradient={titleGradient} bgClip="text">{title}</Heading>
                {right}
            </HStack>
            <Box>
                {children}
            </Box>
        </Box>
    );
}

function Main(){
    const pageBg = useColorModeValue(
        'radial(circle at 20% 0%, rgba(59,130,246,0.06), transparent 40%), radial(circle at 80% 20%, rgba(59,130,246,0.05), transparent 45%)',
        'radial(circle at 20% 0%, rgba(59,130,246,0.12), transparent 40%), radial(circle at 80% 20%, rgba(59,130,246,0.08), transparent 45%)'
    );
    const listBorder = useColorModeValue('blackAlpha.200', 'blue.700');
    const rowHover = useColorModeValue('blackAlpha.50', 'whiteAlpha.50');
    const linkColor = useColorModeValue('blue.600', 'blue.200');
    const chipVariant = useColorModeValue('subtle', 'subtle');
    const chipActiveVariant = useColorModeValue('solid', 'subtle');

    const [filter, setFilter] = React.useState('all');
    // Mock data
    const updates = [
        { id: 1, title: "Server patch 1.2.4", body: "Balance tweaks for jobs, added 5 new missions, performance improvements.", tag: "Patch" },
        { id: 2, title: "Event: Double XP Weekend", body: "Earn double XP from Friday 18:00 to Sunday 23:59.", tag: "Event" },
    ];
    const news = [
        { id: 1, title: "New faction features", body: "Leaders can now schedule trainings and set objectives.", tag: "News" },
        { id: 2, title: "Marketplace revamp", body: "Safer trades, price history, and improved search.", tag: "News" },
    ];
    const actions = [
        {
            id: 1,
            text: [
                { t: "twiy47", player: { name: "twiy47", level: 38 } },
                { t: " was uninvited by " },
                { t: "AdmBot", player: { name: "AdmBot", level: 100 } },
                { t: " from faction Grove Street (rank 1) after 10 days, with 30 FP. Reason: 3/3 faction warns." },
            ],
            time: "2m",
            kind: 'uninvite',
        },
        {
            id: 2,
            text: [
                { t: "DuVaLe", player: { name: "DuVaLe", level: 21 } },
                { t: " has joined the faction Los Santos Police Department (invited by " },
                { t: "deathh", player: { name: "deathh", level: 55 } },
                { t: ")." },
            ],
            time: "10m",
            kind: 'join',
        },
    ];

    const filteredActions = actions.filter(a => filter === 'all' ? true : a.kind === filter);

    const PlayerToken = ({ player }) => {
        const tooltipBg = useColorModeValue('white', 'blue.900');
        const tooltipBorder = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
        return (
            <Tooltip
                showArrow
                placement="top"
                contentProps={{ p: 2, bg: tooltipBg, borderRadius: "md", boxShadow: "xl", borderWidth: "1px", borderColor: tooltipBorder }}
                content={
                    <HStack gap="2" align="center">
                        <Avatar size="xs" name={player.name} />
                        <VStack gap="0" align="start">
                            <Text fontWeight="bold" fontSize="sm">{player.name}</Text>
                            <Text fontSize="xs" color="fg.muted">Level {player.level}</Text>
                        </VStack>
                    </HStack>
                }
            >
                <Box as="span" color={linkColor} _hover={{ textDecoration: 'underline' }} cursor="pointer">{player.name}</Box>
            </Tooltip>
        );
    };

    const ActionLine = ({ item }) => (
        <HStack align="start" justify="space-between" w="full">
            <Box fontSize="sm" color="fg.muted">
                {item.text.map((part, idx) => part.player
                    ? <PlayerToken key={idx} player={part.player} />
                    : <Box as="span" key={idx}>{part.t}</Box>
                )}
            </Box>
            <Text fontSize="xs" color="fg.subtle">{item.time}</Text>
        </HStack>
    );

    return (
        <Flex
            direction="column"
            px={{ base: 4, md: 6 }}
            py={{ base: 4, md: 6 }}
            gap={{ base: 6, md: 8 }}
            bgGradient={pageBg}
            minH="calc(100vh - 56px)"
        >
            <AnimatePresence>
                <MotionBox
                    key="stats"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 4 }} gap={{ base: 4, md: 6 }}>
                        <DashboardBox icon={MdEmojiPeople} title="Online Players" content="300"/>
                        <DashboardBox icon={FaUsers} title="Registered" content="10,000"/>
                        <DashboardBox icon={FaHome} title="Houses" content="300"/>
                        <DashboardBox icon={FaBuilding} title="Business" content="100"/>
                    </SimpleGrid>
                </MotionBox>
            </AnimatePresence>

            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={{ base: 4, md: 6 }}>
                {/* Updates */}
                <SectionCard title="Updates" right={<Button size="xs" variant="ghost">View all</Button>}>
                    <VStack align="stretch" gap="2">
                        {updates.map((u, idx) => (
                            <Box key={u.id} py="2" borderTopWidth={idx === 0 ? "0" : "1px"} borderColor={listBorder} _hover={{ bg: rowHover, borderRadius: "md" }}>
                                <HStack justify="space-between" mb="1">
                                    <HStack gap="2">
                                        <Box boxSize="2" borderRadius="full" bgGradient="linear(to-b, blue.400, cyan.300)" />
                                        <Text fontWeight="semibold">{u.title}</Text>
                                    </HStack>
                                    <Badge colorPalette="blue" variant="subtle">{u.tag}</Badge>
                                </HStack>
                                <Text fontSize="sm" color="fg.muted">{u.body}</Text>
                            </Box>
                        ))}
                    </VStack>
                </SectionCard>

                {/* News */}
                <SectionCard title="News" right={<Button size="xs" variant="ghost">View all</Button>}>
                    <VStack align="stretch" gap="2">
                        {news.map((n, idx) => (
                            <Box key={n.id} py="2" borderTopWidth={idx === 0 ? "0" : "1px"} borderColor={listBorder} _hover={{ bg: rowHover, borderRadius: "md" }}>
                                <HStack justify="space-between" mb="1">
                                    <HStack gap="2">
                                        <Box boxSize="2" borderRadius="full" bgGradient="linear(to-b, gray.300, gray.400)" />
                                        <Text fontWeight="semibold">{n.title}</Text>
                                    </HStack>
                                    <Badge colorPalette="gray" variant="surface">{n.tag}</Badge>
                                </HStack>
                                <Text fontSize="sm" color="fg.muted">{n.body}</Text>
                            </Box>
                        ))}
                    </VStack>
                </SectionCard>

                {/* Recent Actions */}
                <SectionCard
                    title="Recent Actions"
                    right={
                        <HStack gap="2">
                            <Button size="xs" variant={filter==='all'?chipActiveVariant:chipVariant} borderRadius="full" onClick={()=>setFilter('all')}>All</Button>
                            <Button size="xs" variant={filter==='join'?chipActiveVariant:chipVariant} borderRadius="full" onClick={()=>setFilter('join')}>Joins</Button>
                            <Button size="xs" variant={filter==='uninvite'?chipActiveVariant:chipVariant} borderRadius="full" onClick={()=>setFilter('uninvite')}>Uninvites</Button>
                        </HStack>
                    }
                >
                    <VStack align="stretch" gap="2">
                        <AnimatePresence mode="popLayout">
                            {filteredActions.map((a, idx) => (
                                <MotionBox
                                    key={a.id}
                                    py="2"
                                    borderTopWidth={idx === 0 ? "0" : "1px"}
                                    borderColor={listBorder}
                                    _hover={{ bg: rowHover, borderRadius: "md" }}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ActionLine item={a} />
                                </MotionBox>
                            ))}
                        </AnimatePresence>
                    </VStack>
                </SectionCard>
            </SimpleGrid>
        </Flex>
    )
}
export default Main