import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProfilesService {
  //Getting active profile from API and setting to profile in AppState
  async getProfile(id) {
    const res = await api.get('api/profiles/' + id)
    logger.log('[getProfile]', res.data)
    AppState.profile = res.data
  }
  async editProfile(id, data) {
    const res = await api.put('api/profiles/' + id, data)
  }
}
export const profilesService = new ProfilesService()