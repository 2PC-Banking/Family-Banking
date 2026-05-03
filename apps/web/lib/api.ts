const BASE_URL = "http://localhost:5288/api"

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  })

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.message || "Có lỗi xảy ra")
  }

  return data as T
}

export type LoginResponse = {
  customerId: string
  name: string
  accountnumber: string
  message: string
}

export type BalanceResponse = {
  accountnumber: string
  balance: number
  dateopened: string
}

export type AccountInfoResponse = {
  accountnumber: string
  customerName: string
}

export type TransactionItem = {
  transactionid: string
  accountnumber: string
  amount: number
  timestamp: string
  type: string
  relatedaccount: string
  postbalance: number
}

export type RequestOtpResponse = {
  message: string
}

export type TransferResponse = {
  message: string
  amount: number
  transactionId: string
  timestamp: string
}

export const api = {
  login: (phone: string, pass: string) =>
    apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ phone, pass }),
    }),

  getBalance: (accountnumber: string) =>
    apiFetch<BalanceResponse>(`/account/balance/${accountnumber}`),

  getAccountInfo: (accountnumber: string) =>
    apiFetch<AccountInfoResponse>(`/account/info/${accountnumber}`),

  getHistory: (accountnumber: string) =>
    apiFetch<TransactionItem[]>(`/history/${accountnumber}`),

  requestOtp: (accountNumber: string) =>
    apiFetch<RequestOtpResponse>("/otp/request", {
      method: "POST",
      body: JSON.stringify({ accountNumber }),
    }),

  transfer: (payload: {
    fromAccount: string
    toAccount: string
    amount: number
    note: string
    otpCode: string
  }) =>
    apiFetch<TransferResponse>("/transfer", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
}