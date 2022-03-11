import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class BlogsService {

  async getAll(query = {}) {
    const res = await api.get('api/blogs', { params: query })
    logger.log('[getAll]', res.data)
    AppState.blogs = res.data
  }
  async getById(id) {
    const res = await api.get('api/blogs/' + id)
    logger.log('[getById]', res.data)
    AppState.activeBlog = res.data
  }
}

export const blogsService = new BlogsService()