import { Button } from "@/components/ui/button";
import Error from "@/components/ui/error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStateContext } from "@/contexts/ContextProvider";
import http from "@/services/axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState({});

    const { setUser, setToken } = useStateContext();

    const handleLogin = async (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            const response = await http.post("/auth/login", payload);
            console.log(response.data); // Log response data
            setUser(response.data.data.user);
            setToken(response.data.data.token);
            toast.success("Berhasil login");
            setError({});
        } catch (err) {
            const response = err.response;
            if (response.status === 422) {
                setError(response.data.message);
            } else if (response && response.status === 400) {
                toast.error("Gagal login");
            } else {
                toast.error("Terjadi kesalahan");
            }
        }
    };

    return (
        <div className="flex">
            <form
                onSubmit={handleLogin}
                className="w-full px-4 sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto h-screen flex flex-col justify-center"
            >
                <div className="mb-8">
                    <h6 className="text-3xl text-slate-700">
                        Selamat Datang kembali
                    </h6>
                    <p className="text-slate-500">
                        Silakan masukkan kredensial login Anda
                    </p>
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        ref={emailRef}
                        autoComplete="email"
                    />
                    {error && <Error>{error.email}</Error>}
                </div>

                <div className="mt-4">
                    <Label htmlFor="password">Kata Sandi</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        ref={passwordRef}
                        autoComplete="current-password"
                    />
                    {error && <Error>{error.password}</Error>}
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button type="submit">Masuk</Button>
                </div>
            </form>
        </div>
    );
}
