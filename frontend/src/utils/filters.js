export function statusTypeFilter(status = 'ON') {
  const statusMap = {
    ON: 'success',
    OFF: 'info'
  }
  return statusMap[status]
}

export function statusTextFilter(status = 'ON') {
  const statusMap = {
    ON: '在线',
    OFF: '离线'
  }
  return statusMap[status]
}
