import { ApiManager } from "../ApiManager"

export const FindAllClassByType = async ({class_type}) => {
    try {
      const data = await ApiManager(`/class/find/find-all-by-type/${class_type}`)
      
      return data.data
    } catch (error) {
        console.log('(CLIENT API) Error Find All Class By Type', error)
    }
}