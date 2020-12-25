import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

const TitleText = styled(Typography)`
  flex-grow: 1;
`

interface Props {
  date: string
}

const PaymentHeader: React.FC<Props> = ({ date }) => {
  const startOfMonth = moment(date, 'YYYY-MM-DD')
    .startOf('month')
    .format('YYYY/MM/DD')
  const endOfMonth = moment(date, 'YYYY-MM-DD')
    .endOf('month')
    .format('YYYY/MM/DD')

  const lastMonth = moment(date, 'YYYY-MM-DD')
    .subtract(1, 'month')
    .format('YYYYMM')
  const nextMonth = moment(date, 'YYYY-MM-DD').add(1, 'month').format('YYYYMM')

  return (
    <AppBar position="static">
      <Toolbar>
        <Link href={`/payments/${lastMonth}`}>
          <IconButton aria-label="last" color="inherit">
            <NavigateBeforeIcon />
          </IconButton>
        </Link>
        <TitleText
          noWrap
          align="center"
        >{`${startOfMonth} - ${endOfMonth}`}</TitleText>
        <Link href={`/payments/${nextMonth}`}>
          <IconButton aria-label="next" color="inherit">
            <NavigateNextIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default PaymentHeader
