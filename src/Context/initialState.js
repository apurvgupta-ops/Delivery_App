import { FetchData } from '../utils/FetchLocalStorageData'


const userInfo = FetchData()
export const initialState = {
    user: userInfo
}