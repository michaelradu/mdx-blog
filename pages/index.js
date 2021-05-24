import React, { useState } from 'react'
import Head from 'next/head'
import {
    useColorMode,
    Heading,
    Text,
    Flex,
    Stack,
    Input,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react'

import Container from '../components/Container'
import { getAllFilesFrontMatter } from '../lib/mdx'
import BlogPost from '../components/BlogPost'

import { SearchIcon } from '@chakra-ui/icons'

import { Copyright } from '../components/Copyright'

export default function Blog({ posts }) {
    const [searchValue, setSearchValue] = useState('')

    const filteredBlogPosts = posts
        .sort(
            (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
        )
        .filter((frontMatter) =>
            frontMatter.title.toLowerCase().includes(searchValue.toLowerCase()))
    const { colorMode } = useColorMode()
    const colorSecondary = {
        light: 'gray.700',
        dark: 'gray.400'
    }

    return (
        <>
            <Head>
                <title>Blog - Michael Radu</title>
            </Head>
            <Container>
                <Stack
                    as="main"
                    spacing={8}
                    justifyContent="center"
                    alignItems="flex-start"
                    m="0 auto 4rem auto"
                    maxWidth="700px"
                    px={2}
                >
                    <Flex
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    maxWidth="700px"
                    >
                    <Heading mb={2}>Hi, I'm <Text mb={2} color={"#e61e2b"} style={{display: 'inline-block'}}>Michael Radu</Text></Heading>
                    <br></br>
                    <Text color={colorSecondary[colorMode]}>I create software that helps me in my daily life and I like computers (especially Thinkpads), Unix-like operating systems, robotics and other stuff.</Text>
                    <br></br>
                    <Text color={colorSecondary[colorMode]}>I like TV series/Movies like Mr. Robot and The Social Network but I guess that's to be expected.</Text>
                    <br></br>
                    <Text color={colorSecondary[colorMode]}>On this website I usually post guides, tutorials and whatever comes to my mind that I'd find interesting but who knows, maybe it'll turn into a lifestyle guru blog where I tell you all to clean your room, buckos.</Text>
                    </Flex>
                </Stack>
                <Stack
                    as="main"
                    spacing={8}
                    justifyContent="center"
                    alignItems="flex-start"
                    m="0 auto 4rem auto"
                    maxWidth="700px"
                >
                    <Flex
                        flexDirection="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        maxWidth="700px"
                        px={4}
                    >
                        <Heading letterSpacing="tight" mb={4} as="h1" size="lg">
                            Articles ({posts.length} posts)
                        </Heading>
                        <InputGroup mb={4} mr={4} w="100%">
                            <Input
                                aria-label="Search by title"
                                placeholder="Search by title"
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <InputRightElement>
                                <SearchIcon color="gray.300" />
                            </InputRightElement>
                        </InputGroup>
                        {!filteredBlogPosts.length && 'No posts found :('}
                        {filteredBlogPosts.map((frontMatter) => <BlogPost key={frontMatter.title} {...frontMatter} />)}
                    </Flex>
                </Stack>
                
            </Container>
            <Stack
                    as="main"
                    spacing={8}
                    justifyContent="center"
                    alignItems="flex-start"
                    m="0 auto 0 auto"
                    maxWidth="700px"
                    px={2}
                >
                    <Flex
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    maxWidth="700px"
                    >
                    {/* <Text color={colorSecondary[colorMode]}>© 2021 Michael Radu</Text> */}
                    </Flex>
                    <Copyright
        alignSelf={{
          base: 'center',
          sm: 'start',
        }}
      />
                </Stack>
        </>
    )
}

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter('blog')

    return { props: { posts } }
}