// 리다이렉션 시 쿠키 내용을 읽는 함수
export function getCookie(message: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${message}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
  return null
}
