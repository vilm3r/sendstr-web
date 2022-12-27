declare module "remark-html" {
  const html: any
  export default html
}

declare module "toastify-js" {
  const Toastify: ({
    text,
    duration,
    close,
    gravity,
    position,
    stopOnFocus,
    className,
  }: {
    text: string
    duration: number
    close: boolean
    gravity: string
    position: string
    stopOnFocus: boolean
    className: string
  }) => {
    showToast: () => void
  }
  export = Toastify
}