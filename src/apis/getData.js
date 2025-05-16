import request from '@/utils/request'
import config from '@/utils/config.js';

const apiHead = config[process.env.NODE_ENV].baseUrl;

// 设备在线情况
export function getDeviceOnline(params) {
    return request({
        url: '/pai/deviceonline',
        method: 'get',
        params
    })
}

// 告警记录
/*
* projectName=CR109
* pageSize=30
* pageIndex=1
*/
export function getAlarmRecord(params) {
    return request({
        url: '/pai/alarmrecord',
        method: 'get',
        params
    })
}

// 考勤统计
export function getPersionStat(params) {
    return request({
        url: '/pai/persionstat',
        method: 'get',
        params
    })
}

// 考勤记录
/*
projectName=CR109
pageSize=30
pageIndex=1
*/
export function getAttendanceList(params) {
    return request({
        url: '/pai/attendancelist',
        method: 'get',
        params
    })
}

// 气体检测
export function getGasreCord(params) {
    return request({
        url: '/pai/gasrecord',
        method: 'get',
        params
    })
}

// 单点登录
/*
targetResource=xxxx
baseUrl=xxxxx
*/
export function getSsourl(params) {
    return request({
        url: '/pai/ssourl',
        method: 'get',
        params
    })
}

// 气体检测折线图
export function getGasrecordline(params) {
    return request({
        url: '/pai/gasrecordline',
        method: 'get',
        params
    })
}

// 监控地址
export function getCameraAll(params) {
    return request({
        url: '/camera/all/v2',
        method: 'get',
        params
    })
}

// Status PWT
/*
day month
*/
export function getPWTStatus(params) {
    return request({
        url: '/bes/ptw/count/status',
        method: 'get',
        params
    })
}

// Type PWT
/*
day month
*/
export function getPWTType(params) {
    return request({
        url: '/bes/ptw/count/type',
        method: 'get',
        params
    })
}

// 会议报告
/*
pageIndex=1&pageSize=20
*/
export function getTBMlist(params) {
    return request({
        url: '/bes/tbm/list',
        method: 'get',
        params
    })
}

// 会议报告预览
export function getTBMPReview(params) {
    return request({
        url: '/bes/tbm/review',
        method: 'get',
        params
    })
}

// 会议报告进程
export function getTBMWorkflow(params) {
    return request({
        url: '/bes/tbm/workflow',
        method: 'get',
        params
    })
}

// ptw
export function getPTWlist(params) {
    return request({
        url: '/bes/ptw/list',
        method: 'get',
        params
    })
}

export function getPTWWorkflow(params) {
    return request({
        url: '/bes/ptw/workflow',
        method: 'get',
        params
    })
}

export function getPTWReview(params) {
    return request({
        url: '/bes/ptw/review',
        method: 'get',
        params
    })
}

export function getDisposalRate(params) {
    return request({
        url: '/bes/ptw/disposerate',
        method: 'get',
        params
    })
}