import { sequenceT } from 'fp-ts/lib/Apply'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'

import DropdownMenu, { Handler as DropdownMenuHandler } from './DropdownMenu'
import { Option } from './types'

export const useDropdownMenu = (options: Option[], initSelectedId: string) => {
  const [selectedId, setSelectedId] = useState(initSelectedId)
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
        onSelectId={setSelectedId}
      />
    ),
    [selectedId, options],
  )
  return {
    btnRef,
    menu,
    selectedId,
    toggle,
  }
}
