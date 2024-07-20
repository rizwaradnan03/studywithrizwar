import { ApiManager } from "../ApiManager"

export const FindAllUserClass = async () => {
    try {
      const data = await ApiManager(`/user-class/find/find-all/`)
      
      return data.data
    } catch (error) {
        console.log('(CLIENT API) Error Find All User Class', error)
    }
}