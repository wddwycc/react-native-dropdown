import React, { FC, useState, useMemo } from 'react'
import { SafeAreaView, StatusBar, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

import { Option, useDropdownMenu } from './src'

const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: #1b1e29;
`
const Btn = styled(TouchableOpacity)`
  width: 160px;
  margin: 8px;

  background-color: #242d36;
  border-radius: 2px;
`
const BtnText = styled(Text)`
  padding: 8px;

  color: #d5dcf6;
  font-size: 12px;
  font-weight: bold;
`

const INIT_SELECTED_ID = '限价委托'

const App: FC = () => {
  const [selectedId, setSelectedId] = useState(INIT_SELECTED_ID)
  const OPTIONS: Option[] = useMemo(
    () =>
      [
        '限价委托',
        '高级限价委托',
        '止盈止损',
        '跟踪委托',
        '冰山委托',
        '时间加权委托',
      ].map(a => ({ id: a, title: a, onSelect: () => setSelectedId(a) })),
    [setSelectedId],
  )
  const { btnRef, menu, toggle } = useDropdownMenu({
    options: OPTIONS,
    selectedId,
  })

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Container>
        <Btn ref={btnRef} onPress={toggle}>
          <BtnText>{selectedId}</BtnText>
        </Btn>
        {menu}
      </Container>
    </>
  )
}

export default App
