import Button, { ButtonProps } from "./Button";

type ButtonWithIconProps = ButtonProps & {
    SvgComp: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
};

export default function ButtonWithIcon({children, SvgComp, ...props}: ButtonWithIconProps){
    return (
        <Button {...props}>
            <SvgComp className="mr-6"/>
            <span className={props.variant === "default" ? " r-leading-[25px] r-mr-5" : ""}>
                {children}
            </span>
        </Button>
    )
}