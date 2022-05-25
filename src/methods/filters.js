// 小數點後兩位
export function decimal(num) {
  const decimal = Math.round((num + Number.EPSILON) * 100) / 100
  return decimal
}
