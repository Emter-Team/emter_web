import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import NavLink from "@/components/fragment/navlink";
import http from "@/services/axios";
import { Input } from "@/components/ui/input";
import { Navigate, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
    const otpRef = useRef(null);
    const [error, setError] = useState({});

    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();

        const otp = otpRef.current.value;

        try {
            const response = await http.post("/auth/email/verify", { otp });
            toast.success("Verifikasi Berhasil");
            navigate("/institution/dashboard");
            otpRef.current.value = "";
        } catch (error) {
            console.log(error);
            const errorMessage =
                error.response &&
                error.response.data &&
                error.response.data.message
                    ? error.response.data.message
                    : "Verification failed. Please check the OTP.";

            setError({ otp: errorMessage });
            toast.error(errorMessage); // Menampilkan pesan error dari server
        }
    };

    return (
        <div className="flex">
            <div className="w-full sm:w-1/2 md:w-1/4 hidden sm:flex border-r border-secondary/50 p-8 py-16 sm:flex-col sm:justify-between">
                <div>
                    <img src={`/images/app/emter.webp`} alt="" width="180px" />
                </div>
                <div>
                    <img
                        src={`/images/app/login.webp`}
                        alt=""
                        width="120%"
                        className="mx-auto"
                    />
                </div>
                <div>
                    <h6 className="text-xl font-semibold text-primary">
                        Emter
                    </h6>
                    <p className="text-secondary">
                        Mengubah Layanan Darurat untuk Masyarakat agar lebih
                        cepat, baik dan tepat
                    </p>
                </div>
            </div>
            <form
                onSubmit={handleVerify}
                className="w-full px-4 sm:w-3/4 md:w-1/3 lg:w-1/4 mx-auto h-screen flex flex-col justify-center"
            >
                <div className="mb-8">
                    <h6 className="text-3xl text-primary">
                        Verifikasi Email Anda
                    </h6>
                    <p className="text-secondary">
                        Masukan Kode OTP yang sudah terkirim dari email Anda
                    </p>
                </div>
                <div>
                    <Label htmlFor="otp">OTP</Label>
                    <Input
                        ref={otpRef}
                        type="text"
                        id="otp"
                        maxLength={6}
                        required
                        className="input"
                    />
                    {error.otp && <p className="text-red-500">{error.otp}</p>}
                </div>
                <div className="flex mt-4 items-center gap-x-4 justify-end">
                    <NavLink
                        to="/auth/login"
                        type="reset"
                        className="border bg-primary w-1/4 border-secondary/50 border bg-white text-primary"
                    >
                        Kembali
                    </NavLink>
                    <Button type="submit" className="w-3/4">
                        Verifikasi
                    </Button>
                </div>
            </form>
        </div>
    );
}
