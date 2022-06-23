export const debounce = (callback: (...args: any[]) => void, wait: number) => {
  let timeoutId: NodeJS.Timeout
  return (...args: any) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      callback(...args)
    }, wait)
  }
}
