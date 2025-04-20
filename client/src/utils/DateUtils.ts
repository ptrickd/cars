const MONTHS = ['Jan', '', '', '', '', '', '']

export const diffMonths = (todayDate: Date, lastMaintenanceDate: Date) => {
  // const day1 = todayDate.getDate()
  const month1 = todayDate.getMonth()
  const year1 = todayDate.getFullYear()

  // const day2 = lastMaintenanceDate.getDate()
  const month2 = lastMaintenanceDate.getMonth()
  const year2 = lastMaintenanceDate.getFullYear()

  const diffYear = (year1 - year2 - 1) * 12
  const diffMonth = 12 - month2 + month1
  // const diffDay = day2 - day1

  const totalDiffMonths = Math.floor(Math.abs(diffYear + diffMonth))

  return totalDiffMonths
}

export const displayDate = (date: Date) => {
  return `${date.toDateString()}`
}
