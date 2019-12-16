import React, { FC } from 'react'
import { SafeAreaView, StatusBar, Text } from 'react-native'
import styled from 'styled-components'

const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const Title = styled(Text)`
  font-size: 32px;
`

const App: FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Container>
        <Title>Hello World</Title>
      </Container>
    </>
  )
}

export default App
