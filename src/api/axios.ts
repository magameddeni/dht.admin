import axios from "axios"

export const serverBaseUrl =
  import.meta.env.SERVER_BASE_URL || "http://localhost:5000"

export const $api = axios.create({
  baseURL: serverBaseUrl,
  withCredentials: true,
})

$api.interceptors.request.use((config: any) => {
  return config
})

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._isRetry) {
      try {
        originalRequest._isRetry = true

        // const response = await $api.get("/api/auth/token/refresh", {
        //   withCredentials: true,
        // })

        return await $api.request(originalRequest)
      } catch (err) {
        console.error(err)
      }
    }

    if (error.response.status === 403) {
      return
    }

    throw error
  },
)

export default $api
