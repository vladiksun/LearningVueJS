import axios from 'axios'
import NProgress from 'nprogress'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000
})

/***    Example of using interceptors to hook the progress bar ***/
// apiClient.interceptors.request.use(config => {
//     NProgress.start()
//     return config
// })
//
// apiClient.interceptors.response.use(response => {
//     NProgress.done()
//     return response
// })

export default {
    getEvents(eventsPerPage, currentPage) {
        return apiClient.get(`/events?_limit=${eventsPerPage}&_page=${currentPage}`)
    },
    getEvent(id) {
        return apiClient.get(`/events/${id}`)
    },
    postEvent(event) {
        return apiClient.post('/events', event)
    }
}