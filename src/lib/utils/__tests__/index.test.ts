import { numberWithDelimiter, groupBy } from '../index'

test('numberWithDelimiter', () => {
  expect(numberWithDelimiter(1000)).toEqual('1,000')
  expect(numberWithDelimiter(100)).toEqual('100')
})

interface User {
  id: number
  name: string
  email: string
}

test('groupBy', () => {
  const users: User[] = [
    {
      id: 1,
      name: 'hoge',
      email: 'a@mail.com',
    },
    {
      id: 2,
      name: 'hoge',
      email: 'b@mail.com',
    },
  ]
  const actual = groupBy(users, (cur: User) => cur.name)

  actual.map(([name, items]: [string, User[]]) => {
    expect(name).toEqual('hoge')
    items.map((item: User, index: number) => {
      expect(item.id).toEqual(users[index].id)
      expect(item.name).toEqual(users[index].name)
      expect(item.email).toEqual(users[index].email)
    })
  })
})
