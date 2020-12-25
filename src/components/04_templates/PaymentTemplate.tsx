import React from 'react'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import PaymentHeader from '@/components/03_organisms/PaymentHeader'
import PaymentListGroups from '@/components/03_organisms/PaymentListGroups'
import PaymentTotalAmount from '@/components/03_organisms/PaymentTotalAmount'
import { Total, Payment } from '@/interfaces/payment'
import { theme } from '@/theme'

const Wrapper = styled(Container)`
  min-height: 100vh;
  padding: 0;
  background-color: ${theme.palette.background.paper};
`
const ListWrapper = styled(Container)`
  background-color: inherit;
`

interface Props {
  loading: boolean
  error: string | null
  total: Total
  items: [string, Payment[]][]
  date: string
}

const PaymentTemplate: React.FC<Props> = (props) => {
  const { loading, error, total, items, date } = props
  return (
    <Wrapper maxWidth="sm">
      <PaymentHeader date={date} />
      <PaymentTotalAmount loading={loading} total={total} />
      <ListWrapper maxWidth="sm">
        <PaymentListGroups loading={loading} error={error} items={items} />
      </ListWrapper>
    </Wrapper>
  )
}

export default PaymentTemplate
