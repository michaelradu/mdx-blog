import { Text } from '@chakra-ui/layout'
import * as React from 'react'

export const Copyright = (props) => (
  <Text color={"#e61e2b"} fontSize="sm" {...props}>
    &copy; {new Date().getFullYear()} Michael Radu. All rights reserved.
  </Text>
)