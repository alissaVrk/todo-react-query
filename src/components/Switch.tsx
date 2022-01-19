import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react"
import classNames from "classnames"

export type SwitchProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onChange"> & {
    onChange?: (isChecked: boolean) => void
}

const height = 15;
const width_px = "w-[23px]";

export default function Switch(props: SwitchProps) {
    const [checked, setChecked] = useState(!!props.checked);

    const lineCss = classNames(
        "before:absolute", "before:block", 
        `before:${width_px}`, "before:h-3",
        "before:top-6", "before:left-0", 
        "before:rounded-sm",
        {
            "before:bg-blue-500": checked,
            "before:bg-gray-600": !checked
        }
    )

    const circleCss = classNames(
        "after:absolute", "after:block",
        `after:w-${height}`, `after:h-${height}`,
        "after:top-1/2", "after:left-0",
        "after:rounded-full",
        {
            "after:translate-x-9": checked,
            "after:bg-blue-500": checked,
            "after:bg-white": !checked,
            "after:border-none": checked,
            "after:border": !checked,
            "after:border-gray-600": !checked,
        }
    );
    

    return(
        <div className={classNames(
            `${width_px}`, `h-${(height - 2).toString()}`,
            "inline-block", "relative", "select-none")} >
            
            <span 
                className={`relative align-middle ${lineCss} ${circleCss}`}
            />
            <input {...props} type="checkbox" 
                className={classNames("opacity-0", "absolute", "top-0", `${width_px}`, `h-${height}`)}
                checked={checked} 
                onChange={(e) => {
                    setChecked(e.target.checked);
                    props.onChange?.(e.target.checked)
                }}
                />
        </div>
    )
}