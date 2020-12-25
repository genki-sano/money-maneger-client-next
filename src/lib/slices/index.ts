import { combineReducers } from '@reduxjs/toolkit'
import { paymentReducer } from '@/lib/slices/payment'

export const rootReducer = combineReducers({
  payments: paymentReducer,
})
