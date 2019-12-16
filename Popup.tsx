import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import React, {
  forwardRef,
  RefForwardingComponent,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import styled from 'styled-components'

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
  padding: 4px 0;

  background-color: #1b1e29;
  border-radius: 4px;
`
const ContentScrollView = styled(ScrollView)`
  flex-grow: 0;
`
const Option = styled(TouchableOpacity)`
  padding: 8px;
`
const OptionBg = styled(View)<{ selected: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: ${props => (props.selected ? '#00ccb8' : 'transparent')};
  opacity: 0.08;
`
const OptionText = styled(Text)<{ selected: boolean }>`
  color: ${props => (props.selected ? '#00ccb8' : '#d5dcf6')};
  font-size: 12px;
  font-weight: bold;
`

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export interface Option {
  id: string
  title: string
}

interface Props {
  options: Option[]
  selectedId: string
  onSelectId: (a: string) => void
  maxContentHeight?: number
}

export interface Handler {
  showFrom: (srcRect: Rect) => void
}

const SPACING = 4
const DEFAULT_MAX_CONTENT_HEIGHT = 200

const Popup: RefForwardingComponent<Handler, Props> = (
  {
    options,
    selectedId,
    onSelectId,
    maxContentHeight = DEFAULT_MAX_CONTENT_HEIGHT,
  },
  ref,
) => {
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
          maxHeight: maxContentHeight,
        })),
      ),
    [srcRect, maxContentHeight],
  )
  const onSelect = useCallback(
    (id: string) => {
      onSelectId(id)
      setVisible(false)
    },
    [onSelectId, setVisible],
  )

  useImperativeHandle(ref, () => ({
    showFrom: rect => {
      setSrcRect(O.some(rect))
      setVisible(true)
    },
  }))
  return pipe(
    contentStyle,
    O.map(contentStyle_ => (
      <Container animationType="fade" transparent={true} visible={visible}>
        <Bg onPress={() => setVisible(false)} />
        <Content style={contentStyle_}>
          <ContentScrollView>
            {options.map(option => (
              <Option key={option.id} onPress={() => onSelect(option.id)}>
                <OptionBg selected={selectedId === option.id} />
                <OptionText selected={selectedId === option.id}>
                  {option.title}
                </OptionText>
              </Option>
            ))}
          </ContentScrollView>
        </Content>
      </Container>
    )),
    O.toNullable,
  )
}

export default forwardRef(Popup)
