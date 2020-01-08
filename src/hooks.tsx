import { sequenceT } from 'fp-ts/lib/Apply'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import React, { useCallback, useMemo, useRef } from 'react'
import { TouchableOpacity } from 'react-native'

import DropdownMenu, {
  Handler as DropdownMenuHandler,
  StyleProps,
} from './DropdownMenu'
import { Option } from './types'

export interface UseDropdownMenuPayload {
  options: Option[]
  selectedId: string
  onSelectId: (a: string) => void
  direction?: 'above' | 'below'
  styles?: StyleProps
}
export const useDropdownMenu = ({
  options,
  selectedId,
  onSelectId,
  direction = 'below',
  styles,
}: UseDropdownMenuPayload) => {
  const btnRef = useRef<TouchableOpacity>(null)
  const menuRef = useRef<DropdownMenuHandler>(null)

  const toggle = useCallback(
    () =>
      pipe(
        sequenceT(O.option)(
          O.fromNullable(btnRef.current),
          O.fromNullable(menuRef.current),
        ),
        O.map(([btn, menu]) => {
          btn.measureInWindow((x, y, width, height) =>
            menu.showFrom({ x, y, width, height }),
          )
        }),
      ),
    [btnRef, menuRef],
  )

  const menu = useMemo(
    () => (
      <DropdownMenu
        ref={menuRef}
        options={options}
        selectedId={selectedId}
        onSelectId={onSelectId}
        direction={direction}
        {...styles}
      />
    ),
    [options, selectedId, onSelectId, direction, styles],
  )
  return {
    btnRef,
    menu,
    toggle,
  }
}
