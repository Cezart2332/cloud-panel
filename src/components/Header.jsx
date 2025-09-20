import { Box, Text, Flex, HStack, Input, Button } from "@chakra-ui/react"
import cloudLogo from "../assets/cloudmp.png"
import { FaSearch } from "react-icons/fa";
import { LuBell } from "react-icons/lu";
import Menu from "./Menu";
// import { ColorModeButton } from "./ui/color-mode";

function Header(){
    return(
        <Flex 
            as="header" 
            px="6" 
            py="3" 
            gap="4" 
            align="center" 
            bg="blue.900" 
            boxShadow="0 4px 20px rgba(0,0,0,0.15)" 
            position="sticky" 
            top="0" 
            zIndex="docked" 
            borderBottomWidth="1px" 
            borderColor="blue.700"
            backdropFilter="blur(10px)"
        >
            <HStack gap="4" minW="fit-content">
                <Menu />
                <Box as="img" src={cloudLogo} style={{ width: '40px', height: '40px' }} alt="Cloud.MP logo" />
                <Text 
                    fontWeight="extrabold" 
                    fontSize="xl" 
                    bgGradient="linear(to-r, cyan.300, blue.200)" 
                    bgClip="text"
                    letterSpacing="tight"
                >
                    Cloud.MP
                </Text>
            </HStack>
            
            <Box flex="1" />

            <Box flex="1" maxW="lg" position="relative">
                <Text 
                    color="blue.300" 
                    fontSize="sm"
                    position="absolute" 
                    left="4" 
                    top="50%" 
                    transform="translateY(-50%)" 
                    pointerEvents="none" 
                >
                    🔍
                </Text>
                <Input
                    pl="12"
                    pr="4"
                    borderRadius="full"
                    size="md"
                    placeholder="Search players..."
                    bg="blue.800"
                    borderColor="blue.700"
                    color="white"
                    _placeholder={{ color: "blue.300" }}
                />
            </Box>

            <Box flex="1" />

            <HStack gap="3" minW="fit-content">
                {/* <ColorModeButton /> */}
                <Button 
                    size="md" 
                    variant="ghost" 
                    borderRadius="full" 
                    _hover={{ bg: "blue.800", transform: "scale(1.05)" }}
                    transition="all 0.2s ease"
                >
                    <Text>🔔</Text>
                </Button>
                <Box 
                    w="8" 
                    h="8"
                    borderRadius="full"
                    bg="cyan.500"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                >
                    <Text fontSize="sm" fontWeight="bold" color="blue.900">P</Text>
                </Box>
                <Button 
                    borderRadius="15px"
                    size="md" 
                    colorPalette="white"
                    fontWeight="semibold"
                    px="6"
                    variant="ghost"
                >
                    Login
                </Button>
            </HStack>
        </Flex>
    )
}

export default Header

