import React from "react";
import clsx from "clsx";

function Pagination({ links, onPageChange }) {
    return (
        <div className="pagination">
            {links.map((link, index) => (
                <button
                    key={index}
                    disabled={!link.url}
                    className={clsx(
                        "pagination-button mx-0.5",
                        "text-sm",
                        "rounded",
                        "border border-secondary/50",
                        "p-2",
                        {
                            "bg-primary border border-primary min-w-10 text-white":
                                link.active,
                            "bg-white text-primary": !link.active,
                            "cursor-pointer": link.url,
                            "cursor-not-allowed": !link.url,
                        }
                    )}
                    onClick={() =>
                        onPageChange(new URL(link.url).searchParams.get("page"))
                    }
                >
                    <div className="w-7">
                        {link.label
                            .replace("&laquo;", "«")
                            .replace("&raquo;", "»")}
                    </div>
                </button>
            ))}
        </div>
    );
}

export default Pagination;
