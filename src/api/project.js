import request from '@/utils/request'

export function projectAdd(data) {
    return request({
        url: '/project/add',
        method: 'post',
        data
    })
}

export function getProjectList() {
    return request({
        url: '/project/list',
        method: 'get'
    })
}