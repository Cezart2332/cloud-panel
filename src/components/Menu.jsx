import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoPeopleSharp } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaWikipediaW } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import { FaTicketAlt } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { MdUpdate } from "react-icons/md";
import { IoMdHelp } from "react-icons/io";

import {
  Button,
  VStack,
  HStack,
  Text,
  Flex,
  Box,
  Drawer,
} from "@chakra-ui/react";

function Menu() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Drawer.Root open={isOpen} onOpenChange={({ open }) => setIsOpen(open)} placement="start" size="sm">
      <Drawer.Trigger asChild>
        <Button
          borderRadius="10px"
          size="sm"
          variant="ghost"
        >
          <Box as={GiHamburgerMenu} boxSize="4" />
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
            <Drawer.CloseTrigger />
          </Drawer.Header>

          <Drawer.Body p="4">
            <VStack align="stretch" gap="2">
              <MenuItem icon={<FaWikipediaW />} label="Wikipedia" onClick={() => setIsOpen(false)} />
              <MenuItem icon={<IoPeopleSharp />} label="Staff" onClick={() => setIsOpen(false)} />
              <MenuItem icon={<GoAlertFill />} label="Complaints" count={10} onClick={() => setIsOpen(false)} />
              <MenuItem icon={<FaPeopleGroup />} label="Factions" count={20} onClick={() => setIsOpen(false)} />
              <MenuItem icon={<FaTicketAlt />} label="Tickets" count={1000} onClick={() => setIsOpen(false)} />
              <MenuItem icon={<FaShoppingBag />} label="Shop" onClick={() => setIsOpen(false)} />
              <MenuItem icon={<MdUpdate />} label="Updates" onClick={() => setIsOpen(false)} />
              <MenuItem icon={<IoMdHelp />} label="Help" onClick={() => setIsOpen(false)} />
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
        <Box as="span">{icon}</Box>
        <Text>{label}</Text>
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
