import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    variant?: "default" | "text" | "textNoHover"
}

export default function Button(props: ButtonProps) {
    const commonStyles = `r-h-[31px] r-inline-flex r-items-center`;
    if (props.variant === "text") {
        return (
            <div className={`${commonStyles} r-mb-[13px]`}>
                <button {...props} className={`r-px-3 hover:r-text-blue-500`} />
            </div>
        )
    }
    if (props.variant === "textNoHover") {
        return (
            <div className={`${commonStyles} r-mb-[13px]`}>
                <button {...props} className={`r-px-3 r-text-blue-500`} />
            </div>
        );
    }
    return (
        <button {...props} className={`${commonStyles}
        r-align-top 
        r-px-12 r-rounded
        r-bg-neutral-100
        r-transition-[color] r-ease-in-out r-duration-300

                 hover:r-bg-blue-100
                hover:r-text-blue-500

                active:r-bg-blue-100
                active:r-text-blue-500
                
                 disabled:r-text-neutral-200
                  disabled:r-cursor-default`} />
    )
}

//fix 1
