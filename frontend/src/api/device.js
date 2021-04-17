import request from '@/utils/request'

export function getList() {
  return request({
    url: '/item/list',
    method: 'GET'
  })
}

export function getListMock() {
  return [
    {
      qrcode: 1,
      appId: 'xxxx',
      park: '软件园区1',
      department: '费彝民楼',
      room: '820',
      number: '001'
    },
    {
      qrcode: 2,
      appId: 'xxxx',
      park: '软件园区1',
      department: '费彝民楼',
      room: '804',
      number: '002'
    },
    {
      qrcode: 3,
      appId: 'xxxx',
      park: '软件园区1',
      department: '北大楼',
      room: '201',
      number: '001'
    },
    {
      qrcode: 4,
      appId: 'xxxx',
      park: '软件园区1',
      department: '逸夫楼',
      room: '666',
      number: '001'
    }
  ]
}

export function getDetail(id) {
  return request({
    url: `/item/info/${id}`,
    method: 'GET'
  })
}

export function getDetailMock(id) {
  return {
    qrcode: 3,
    appId: 'xxxx',
    park: '软件园区1',
    department: '北大楼',
    room: '201',
    number: '001',
    pm2_5: 66,
    co2: 50,
    temperature: 34,
    humidity: 51,
    maxValue: 100,
    chart: [
      ['2019-10-10', 72.0],
      ['2019-10-11', 60.2],
      ['2019-10-12', 67],
      ['2019-10-13', 12],
      ['2019-10-14', 40],
      ['2019-10-15', 71],
      ['2019-10-16', 72],
      ['2019-10-17', 80],
      ['2019-10-18', 61],
      ['2019-10-19', 55]
    ]
  }
}
