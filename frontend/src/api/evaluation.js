import request from '@/utils/request'

export function getEvaluation() {
  return request({
    url: '/efficiencyAss',
    method: 'GET'
  })
}
