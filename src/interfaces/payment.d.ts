export interface Payment {
  id: string
  name: string
  date: string
  price: number
  category: string
  memo: string
}

export interface Total {
  women: number
  men: number
}

export interface PaymentResponse {
  items: Payment[]
  total: Total
}
