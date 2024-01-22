export interface ServiceReponse<T>{
  code: number
  message: string
  data: T
  timestamp: number
}
