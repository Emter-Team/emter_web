import { Link } from "react-router-dom";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center leading-5 transition focus:outline-none " +
                (active
                    ? "border-primary text-primary font-semibold focus:border-primary"
                    : "border-transparent text-secondary border-none hover:text-primary focus:font-bold focus:text-primary focus:font-bold ") +
                className
            }
        >
            {children}
        </Link>
    );
}
