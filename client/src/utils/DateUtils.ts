export const diffMonths = (todayDate: Date, lastMaintenanceDate: Date) => {
  console.log(todayDate)
  console.log(lastMaintenanceDate)
  const day1 = todayDate.getDate()
  const month1 = todayDate.getMonth()
  const year1 = todayDate.getFullYear()

  const day2 = lastMaintenanceDate.getDate()
  const month2 = lastMaintenanceDate.getMonth()
  const year2 = lastMaintenanceDate.getFullYear()

  const diffYear = year2 - year1
  const diffMonth = month2 - month1
  const diffDay = day2 - day1

  const totalDiffMonths = Math.abs(12 * diffYear + diffMonth + diffDay / 32)

  return totalDiffMonths
}
