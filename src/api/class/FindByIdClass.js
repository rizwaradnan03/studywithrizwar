import { ApiManager } from "../ApiManager"

export const FindClassById = async ({id}) => {
    try {
      const data = await ApiManager(`/class/find/find-by-id/${id}`)
      return data.data
    } catch (error) {
        console.log('(CLIENT API) Error Find Class By Id', error)
        throw new error('(SERVER API) Error')
    }
}