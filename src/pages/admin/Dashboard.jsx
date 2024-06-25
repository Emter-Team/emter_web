import React from "react";

export default function Dashboard() {
    return (
        <>
            <div className="w-full mt-10 md:mt-20 p-0 md:p-4 md:w-10/12 h-screen">
                <div className="w-full flex flex-col justify-center md:flex-row md:justify-end"></div>
                <div className="title w-full md:w-1/3">
                    <h3 className="text-3xl font-semibold text-primary">
                        Berita
                    </h3>
                    <p className="text-secondary">
                        Semua statistik yang berhubungan dengan akun anda
                    </p>
                </div>
            </div>
        </>
    );
}
