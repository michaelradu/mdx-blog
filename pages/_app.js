import React from 'react'
import { ChakraProvider, ColorModeProvider, useColorMode } from '@chakra-ui/react'
import customTheme from '../styles/theme'
import { Global, css } from '@emotion/react'
import { prismLightTheme, prismDarkTheme } from '../styles/prism'

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode()

  return (
    <>
      <Global
        styles={css`
          ${colorMode === 'light' ? prismLightTheme : prismDarkTheme};
          ::selection {
            background-color: transparent;
            color: #e61e2b;
          }
          ::-moz-selection {
            background: transparent;
            color: #e61e2b;
          }
          ::-webkit-scrollbar {
            width: 7px
          }
          
          ::-webkit-scrollbar-track {
            background-color: ${colorMode === 'light' ? 'white' : '#171717'};
          }
          
          ::-webkit-scrollbar-thumb {
            -webkit-border-radius: 10px;
            border-radius: 50px;
            background: #5757577a
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #1818187a
          }
          
          html {
            min-width: 356px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: ${colorMode === 'light' ? 'white' : '#171717'};
          }
        `}
      />
      {children}
    </>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <ColorModeProvider
        options={{
          initialColorMode: "light",
          useSystemColorMode: true,
        }}
      >
        <GlobalStyle>
          <Component {...pageProps} />
        </GlobalStyle>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
