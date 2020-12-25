import { AxiosPromise } from 'axios'
import moment from 'moment'
import { PaymentResponse } from '@/interfaces/payment'
import axios from '@/lib/apis/axios'

export const getByDate = (date: string): AxiosPromise<PaymentResponse> => {
  const formatDate = moment(date, 'YYYY-MM-DD').format('YYYYMMDD')
  return axios.get(`/api/payments/${formatDate}`)
}
