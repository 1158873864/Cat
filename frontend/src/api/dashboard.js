import request from '@/utils/request'

export function getHomeInfo() {
  return request({
    url: '/home',
    method: 'GET'
  })
}

export function getHomeInfoMock() {
  return [
    {
      chartname: 'PM2.5',
      data: [
        { value: 9, name: 'A' },
        { value: 10, name: 'B' },
        { value: 22, name: 'C' },
        { value: 41, name: 'D' }
      ]
    },
    {
      chartname: 'CO2',
      data: [
        { value: 9, name: 'A' },
        { value: 10, name: 'B' },
        { value: 22, name: 'C' },
        { value: 41, name: 'D' }
      ]
    },
    {
      chartname: '湿度',
      data: [
        { value: 9, name: 'A' },
        { value: 10, name: 'B' },
        { value: 22, name: 'C' },
        { value: 41, name: 'D' }
      ]
    },
    {
      chartname: '温度',
      data: [
        { value: 9, name: 'A' },
        { value: 10, name: 'B' },
        { value: 22, name: 'C' },
        { value: 41, name: 'D' }
      ]
    }
  ]
}
