import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    variant?: "default" | "text" | "textNoHover"
}

export default function Button(props: ButtonProps) {
    const commonStyles = `h-[31px] inline-flex items-center`;
    if (props.variant === "text") {
        return (
            <div className={`${commonStyles} mb-[13px]`}>
                <button {...props} className={`px-3 hover:text-blue-500`} />
            </div>
        )
    } 
    if (props.variant === "textNoHover") {
        return (
            <div className={`${commonStyles} mb-[13px]`}>
                <button {...props} className={`px-3 text-blue-500`} />
            </div>
        );
    }
    return (
        <button {...props} className={`${commonStyles}
                align-top 
                px-12 rounded
                bg-neutral-100
                transition-[color] ease-in-out duration-300

                 hover:bg-blue-100
                hover:text-blue-500

                active:bg-blue-100
                active:text-blue-500
                
                 disabled:text-neutral-200
                  disabled:cursor-default`} />
    )
}