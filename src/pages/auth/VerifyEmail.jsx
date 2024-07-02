import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import NavLink from "@/components/fragment/navlink";
import http from "@/services/axios";
import { Input } from "@/components/ui/input";

export default function VerifyEmail() {
    const otpRef = useRef(null);
    const [error, setError] = useState({});

    const handleVerify = async (e) => {
        e.preventDefault();

        const otp = otpRef.current.value;

        try {
            const response = await http.post("/auth/email/verify", { otp });
            toast.success(response.data.message); // Menampilkan pesan sukses dari server
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
            <form
                onSubmit={handleVerify}
                className="w-full px-4 sm:w-3/4 md:w-1/3 lg:w-1/4 mx-auto h-screen flex flex-col justify-center"
            >
                <div className="mb-8">
                    <h6 className="text-3xl text-primary">Verify Your Email</h6>
                    <p className="text-secondary">
                        Enter the OTP sent to your email
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
                <div className="flex items-center gap-x-4 justify-end">
                    <NavLink
                        to="/auth/login"
                        type="reset"
                        className="w-1/4 border-secondary/50 border bg-white text-primary"
                    >
                        Back
                    </NavLink>
                    <Button type="submit" className="w-3/4">
                        Verify
                    </Button>
                </div>
            </form>
        </div>
    );
}
