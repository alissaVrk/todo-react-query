import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react"
import classNames from "classnames"

export type SwitchProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onChange"> & {
    onChange?: (isChecked: boolean) => void
}

export default function Switch(props: SwitchProps) {
    const [checked, setChecked] = useState(!!props.checked);

    const lineCss = classNames(
        "before:r-absolute", "before:r-block", 
        `before:r-w-[23px]`, "before:r-h-3",
        "before:r-top-6", "before:r-left-0", 
        "before:r-rounded-sm",
        {
            "before:r-bg-blue-500": checked,
            "before:r-bg-gray-600": !checked
        }
    )

    const circleCss = classNames(
        "after:r-absolute", "after:r-block",
        `after:r-w-15`, `after:r-h-15`,
        "after:r-top-1/2", "after:r-left-0",
        "after:r-rounded-full",
        {
            "after:r-translate-x-9": checked,
            "after:r-bg-blue-500": checked,
            "after:r-bg-white": !checked,
            "after:r-border-none": checked,
            "after:r-border": !checked,
            "after:r-border-gray-600": !checked,
        },
        "after:r-transition-transform", "after:r-duration-200"
    );
    

    return(
        <div className="r-w-[23px] r-h-13 r-inline-block r-relative r-select-none">
            
            <span 
                className={`r-relative r-align-middle ${lineCss} ${circleCss}`}
            />
            <input {...props} type="checkbox" 
                className="r-opacity-0 r-absolute r-top-0 r-w-[23px] r-h-15"
                checked={checked} 
                onChange={(e) => {
                    setChecked(e.target.checked);
                    props.onChange?.(e.target.checked)
                }}
                />
        </div>
    )
}