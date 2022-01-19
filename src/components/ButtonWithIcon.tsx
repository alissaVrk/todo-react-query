import Button, { ButtonProps } from "./Button";

type ButtonWithIconProps = ButtonProps & {
    SvgComp: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
};

export default function ButtonWithIcon({children, SvgComp, ...props}: ButtonWithIconProps){
    return (
        <Button {...props}>
            <SvgComp className="mr-6"/>
            <span className={props.variant === "default" ? " leading-[25px] mr-5" : ""}>
                {children}
            </span>
        </Button>
    )
}