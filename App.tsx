import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import React, { FC, useRef, useCallback, useState } from 'react'
import { SafeAreaView, StatusBar, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

import Popup, { Handler as PopupHandler } from './Popup'
import { sequenceT } from 'fp-ts/lib/Apply'

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

const App: FC = () => {
  const btnRef = useRef<TouchableOpacity>(null)
  const popupRef = useRef<PopupHandler>(null)
  const onPress = useCallback(
    () =>
      pipe(
        sequenceT(O.option)(
          O.fromNullable(btnRef.current),
          O.fromNullable(popupRef.current),
        ),
        O.map(([btn, popup]) => {
          btn.measureInWindow((x, y, width, height) => {
            popup.show({ x, y, width, height })
          })
        }),
      ),
    [btnRef, popupRef],
  )

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Container>
        <Btn ref={btnRef} onPress={onPress}>
          <BtnText>限价委托</BtnText>
        </Btn>
        <Popup ref={popupRef} />
      </Container>
    </>
  )
}

export default App
