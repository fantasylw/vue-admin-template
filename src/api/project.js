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

export function getProjectDetails(params) {
    return request({
        url: '/project/details',
        method: 'get',
        params: params
    })
}

export function pushBaseMetaData(project_name,data) {
    return request({
        url: '/project/baseMetaData/' + project_name,
        method: 'post',
        data
    })
}

export function deleteBaseMetaData(project_name, k) {
    return request({
        url: '/project/baseMetaData/' + project_name,
        method: 'delete',
        params: { key: k }
    })
}



export function pushMetaData(project_name, data) {
    return request({
        url: '/project/metaData/' + project_name,
        method: 'post',
        data
    })
}