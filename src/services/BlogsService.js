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
  // Post the new blog and put into the current set of blogs with spread operator
  async createBlog(data) {
    const res = await api.post('api/blogs', data)
    logger.log('[createBlog]', res.data)
    AppState.blogs = [res.data, ...AppState.blogs]
  }
  //Edit blog
  async editBlog(id, data) {
    const res = await api.put('api/blogs/' + id, data)
    logger.log('[editBlog]', res.data)
    AppState.activeBlog = res.data
  }
  //Delete blog and update appState to remove it
  async deleteBlog(id) {
    const res = await api.delete('api/blogs/' + id)
    logger.log('[deleteBlog]', res.data)
    AppState.blogs = AppState.blogs.filter(b => b.id != id)
  }
}

export const blogsService = new BlogsService()