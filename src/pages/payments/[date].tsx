import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import PaymentTemplate from '@/components/04_templates/PaymentTemplate'
import { selectPayments, fetchItems } from '@/lib/slices/payment'
import { useSelector } from '@/store'

const Payments: NextPage = () => {
  const router = useRouter()
  const date = moment(router.query.date).format('YYYY-MM-DD')

  const { loading, error, items, total } = useSelector(selectPayments)

  const dispatch = useDispatch()
  useEffect(() => {
    if (router.query.date) {
      dispatch(fetchItems(date))
    }
  }, [router.query.date])

  return (
    <PaymentTemplate
      loading={loading}
      error={error}
      total={total}
      items={items}
      date={date}
    />
  )
}

export default Payments
