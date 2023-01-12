type ToggleProps = {
  checked: boolean
  onChange: () => void
}

export const Toggle = ({ checked, onChange }: ToggleProps) => {
  return (
    <label className="inline-flex relative items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
        readOnly
      />
      <div className="w-11 h-6 bg-gray-300 focus:outline-none peer-focus-visible:ring-2 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
    </label>
  )
}
