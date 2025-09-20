import React from "react"
import { Flex, Text, HStack, Box } from "@chakra-ui/react"


function DashboardBox(props){
    const IconComponent = props.icon;
    return (
        <Flex
            direction="column"
            bg='blue.600'
            borderRadius="xl"
            p="6"
            gap="3"
            boxShadow="sm"
            _hover={{ boxShadow: '0 0 0 1px var(--chakra-colors-blue-400), 0 10px 30px rgba(59,130,246,.25)', transform: 'translateY(-3px)' }}
            _active={{ transform: 'translateY(0)' }}
            transition="all 0.2s ease"
            minW={{ base: '40', sm: '52' }}
            align="start"
        >
            <HStack gap="2" align="center">
                {IconComponent && (
                    <Box
                        as={IconComponent}
                        boxSize="5"
                        color="blue.50"
                    />
                )}
                <Text fontSize="md" fontWeight="semibold" color="blue.50">{props.title}</Text>
            </HStack>
            <Text fontSize="3xl" fontWeight="extrabold" lineHeight="shorter" color="white">
                {props.content}
            </Text>
        </Flex>
    )
}
export default DashboardBox;