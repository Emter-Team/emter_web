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
                "inline-flex items-center leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "border-primary text-primary font-semibold focus:border-primary"
                    : "border-transparent text-dark border-none hover:text-primary hover:border-primary focus:text-primary ") +
                className
            }
        >
            {children}
        </Link>
    );
}
