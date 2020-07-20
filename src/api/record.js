import request from '@/utils/request'

export function getCollection() {
    return request({
        url: '/db/collection',
        method: 'get'
    })
}

export function getHost(parent) {
    return request({
        url: '/record/host',
        method: 'get',
        params:{ parent_id:parent }
    })
}