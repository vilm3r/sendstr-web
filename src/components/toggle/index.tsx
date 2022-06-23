type ToggleProps = {
  checked: boolean
  onChange: () => void
}

export const Toggle = ({ checked, onChange }: ToggleProps) => {
  return (
    <label>
      <input
        type="checkbox"
        className="absolute overflow-hidden whitespace-nowrap h-[1px] w-[1px]"
        checked={checked}
        onChange={onChange}
      />
      <span className="bg-white border-2 border-custom-black rounded-3xl flex h-8 mr-[10px] relative w-16 cursor-pointer">
        <span
          className={`flex absolute left-[2px] bottom-[2px] justify-center h-6 w-6 rounded-full items-center transition ${
            checked ? "bg-custom-black" : "translate-x-8 bg-custom-black/50"
          }`}
        ></span>
      </span>
    </label>
  )
}
