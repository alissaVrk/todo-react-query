import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react"

export type SwitchProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onChange"> & {
    onChange?: (isChecked: boolean) => void
}

export default function Switch(props: SwitchProps) {
    const [checked, setChecked] = useState(!!props.checked);

    return(
        <div className={`inline-block relative w-[23px] h-13 select-none`}>
            <span 
                className={`relative align-middle 
                    ${checked? "before:bg-blue-500": "before:bg-gray-600"} before:rounded-sm 
                        before:w-[23px] before:top-[6px] before:left-0 before:block before:absolute before:h-[3px] 
                    ${checked ? 
                        "after:bg-blue-500 after:border-none after:translate-x-9": 
                        "after:bg-white after:border-gray-600 after:border"
                    } after:w-15 after:h-15 after:block after:absolute after:top-1/2 after:left-0 after:rounded-full
                `}
            />
            <input {...props} type="checkbox" 
                className={`opacity-0 absolute top-0 h-15 w-[23px]`}
                checked={checked} 
                onChange={(e) => {
                    setChecked(e.target.checked);
                    props.onChange?.(e.target.checked)
                }}
                />
        </div>
    )
}