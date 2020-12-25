import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError, AxiosResponse } from 'axios'
import moment from 'moment'
import { Payment, Total, PaymentResponse } from '@/interfaces/payment'
import { getByDate } from '@/lib/apis/payment'
import { groupBy } from '@/lib/utils'
import { RootState, AppDispatch } from '@/store'

interface State {
  loading: boolean
  error: string | null
  items: [string, Payment[]][]
  total: Total
}

type ThunkArg = string
type ThunkApiConfig = {
  rejectValue: AxiosResponse<ErrorResponse>
}

interface ErrorResponse {
  message: string
}

const initialState: State = {
  loading: false,
  error: null,
  items: [],
  total: {
    women: 0,
    men: 0,
  },
}

const fetchPayments = createAsyncThunk<
  PaymentResponse,
  ThunkArg,
  ThunkApiConfig
>('payment/fetchPayments', async (date: ThunkArg, { rejectWithValue }) => {
  try {
    const res = await getByDate(date)
    return res.data
  } catch (err) {
    const e: AxiosError<ErrorResponse> = err
    if (!e.response) {
      throw err
    }
    return rejectWithValue(e.response)
  }
})

const paymentSlice = createSlice({
  name: 'payment',
  initialState: initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPayments.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.items = groupBy(action.payload.items, (cur: Payment) =>
        moment(cur.date).format('YYYY/MM/DD'),
      )
      state.total = {
        women: action.payload.total.women || 0,
        men: action.payload.total.men || 0,
      }
    })
    builder.addCase(fetchPayments.rejected, (state, action) => {
      state.loading = false

      if (action.payload) {
        const { data, status, statusText } = action.payload
        state.error = `Error: ${data.message} (${status} ${statusText})`
      } else {
        const name = action.error.name || 'Error'
        const msg = action.error.message || 'Internal Server Error'
        state.error = `${name}: ${msg}`
      }
    })
  },
})

const { fetchStart } = paymentSlice.actions

export const fetchItems = (date: string) => async (dispatch: AppDispatch) => {
  dispatch(fetchStart())
  dispatch(fetchPayments(date))
}

export const selectPayments = (state: RootState) => state.payments

export const paymentReducer = paymentSlice.reducer
