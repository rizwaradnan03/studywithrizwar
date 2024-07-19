import { ApiManager } from "../ApiManager"

export const FindAllClass = async () => {
    try {
      const data = await ApiManager(`/class/find/find-all/`)
      
      return data.data
    } catch (error) {
        console.log('(CLIENT API) Error Find All Class', error)
    }
}