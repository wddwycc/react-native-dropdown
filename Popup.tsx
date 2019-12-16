import React, {
  FC,
  useImperativeHandle,
  RefForwardingComponent,
  forwardRef,
  useState,
  useMemo,
} from 'react'
import styled from 'styled-components'
import { View, Modal, TouchableOpacity, ViewStyle } from 'react-native'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

const Container = styled(Modal)``
const Bg = styled(TouchableOpacity).attrs({ activeOpacity: 1 })`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
`
const Content = styled(View)`
  position: absolute;
  background-color: #1b1e29;
  border-radius: 2px;
`

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

interface Props {}

export interface Handler {
  show: (srcRect: Rect) => void
}

const SPACING = 4

const Popup: RefForwardingComponent<Handler, Props> = ({}, ref) => {
  const [srcRect, setSrcRect] = useState<O.Option<Rect>>(O.none)
  const [visible, setVisible] = useState(false)
  const contentStyle: O.Option<ViewStyle> = useMemo(
    () =>
      pipe(
        srcRect,
        O.map(rect => ({
          top: rect.y + rect.height + SPACING,
          left: rect.x,
          width: rect.width,
          height: 300,
        })),
      ),
    [srcRect],
  )

  useImperativeHandle(ref, () => ({
    show: rect => {
      setSrcRect(O.some(rect))
      setVisible(true)
    },
  }))
  return pipe(
    contentStyle,
    O.map(s => (
      <Container animationType="fade" transparent={true} visible={visible}>
        <Bg onPress={() => setVisible(false)} />
        <Content style={s} />
      </Container>
    )),
    O.toNullable,
  )
}

export default forwardRef(Popup)
