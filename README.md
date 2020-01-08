# How

```shell
npm i react-native-dropdown-list
```

```typescript
import { Option, useDropdownMenu } from 'react-native-dropdown-list'

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
```