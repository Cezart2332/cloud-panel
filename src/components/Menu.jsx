import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  VStack,
  HStack,
  Text,
  Flex,
  Box,
  Drawer,
  CloseButton,
} from "@chakra-ui/react";

function Menu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={({ open }) => setIsOpen(open)} placement="start" size="sm">
      <Drawer.Trigger asChild>
        <Button
          borderRadius="10px"
          size={{ base: "md", md: "sm" }}
          variant="ghost"
          aria-label="Open menu"
        >
          <Text fontSize={{ base: "xl", md: "lg" }}>☰</Text>
        </Button>
      </Drawer.Trigger>
      
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content bg="blue.800" borderRight="1px" borderColor="blue.700">
          <Drawer.Header borderBottomWidth="1px" borderColor="blue.700" p="4">
            <Drawer.Title>
              <Text fontSize="lg" fontWeight="bold" color="white">
                Menu
              </Text>
            </Drawer.Title>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" aria-label="Close menu" />
            </Drawer.CloseTrigger>
          </Drawer.Header>

          <Drawer.Body p="4">
            <VStack align="stretch" gap="2">
              <MenuItem icon="📊" label="Dashboard" onClick={() => handleNavigation('/')} />
              <MenuItem icon="👥" label="Staff" onClick={() => handleNavigation('/staff')} />
              <MenuItem icon="⚠️" label="Complaints" count={10} onClick={() => handleNavigation('/complaints')} />
              <MenuItem icon="🛡️" label="Factions" count={20} onClick={() => handleNavigation('/factions')} />
              <MenuItem icon="📖" label="Wikipedia" onClick={() => setIsOpen(false)} />
              <MenuItem icon="🎟️" label="Tickets" count={1000} onClick={() => setIsOpen(false)} />
              <MenuItem icon="🛍️" label="Shop" onClick={() => setIsOpen(false)} />
              <MenuItem icon="🔄" label="Updates" onClick={() => setIsOpen(false)} />
              <MenuItem icon="❓" label="Help" onClick={() => setIsOpen(false)} />
            </VStack>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}

export default Menu;

function MenuItem({ icon, label, count, onClick }) {
  return (
    <Button
      justifyContent="space-between"
      borderRadius="md"
      size="md"
      width="full"
      variant="ghost"
      _hover={{ bg: "blue.700" }}
      onClick={onClick}
    >
      <HStack gap="2">
        <Text as="span" fontSize="lg">{icon}</Text>
        <Text color="white">{label}</Text>
      </HStack>
      {typeof count !== "undefined" && (
        <Flex
          as="span"
          align="center"
          justify="center"
          minW="6"
          h="6"
          bg="blue.400"
          color="black"
          borderRadius="full"
          fontSize="xs"
          px="2"
        >
          {count}
        </Flex>
      )}
    </Button>
  );
}
