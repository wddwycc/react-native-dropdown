import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import React, { FC, useRef, useCallback, useState } from 'react'
import { SafeAreaView, StatusBar, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

import Popup, { Handler as PopupHandler, Option } from './Popup'
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

const OPTIONS: Option[] = [
  '限价委托',
  '高级限价委托',
  '止盈止损',
  '跟踪委托',
  '冰山委托',
  '时间加权委托',
].map(a => ({ id: a, title: a }))

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
          btn.measureInWindow((x, y, width, height) =>
            popup.showFrom({ x, y, width, height }),
          )
        }),
      ),
    [btnRef, popupRef],
  )
  const [selectedId, setSelectedId] = useState('限价委托')

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Container>
        <Btn ref={btnRef} onPress={onPress}>
          <BtnText>{OPTIONS.filter(a => a.id === selectedId)[0].title}</BtnText>
        </Btn>
        <Popup
          ref={popupRef}
          options={OPTIONS}
          selectedId={selectedId}
          onSelectId={setSelectedId}
        />
      </Container>
    </>
  )
}

export default App
