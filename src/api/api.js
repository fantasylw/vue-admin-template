import request from '@/utils/request'

export function getApiDoc(map_id) {
    return request({
        url: '/api/document',
        method: 'get',
        params: { map_id: map_id }
    })
}

export function getApiDocTimeLines(document_id) {
    return request({
        url: '/api/timeline',
        method: 'get',
        params: { document_id: document_id }
    })
}