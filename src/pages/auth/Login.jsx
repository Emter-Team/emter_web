import NavLink from "@/components/fragment/navlink";
import { Button } from "@/components/ui/button";
import Error from "@/components/ui/error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStateContext } from "@/contexts/ContextProvider";
import http from "@/services/axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState({});

    const { setUser, setToken } = useStateContext();

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            const response = await http.post("/auth/login", payload);
            setUser(response.data.data);
            setToken(response.data.data.token);
            setError({});
        } catch (err) {
            const response = err.response;
            if (response.status === 422) {
                setError(response.data.message);
            } else if (response.status === 400) {
                setError(response.data.message);
                toast.error("Gagal login");
            } else {
                toast.error("Terjadi kesalahan");
            }
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
                onSubmit={handleLogin}
                className="w-full px-4 sm:w-3/4 md:w-1/3 lg:w-1/4 mx-auto h-screen flex flex-col justify-center"
            >
                <div className="mb-8">
                    <h6 className="text-3xl text-primary">
                        Selamat Datang kembali
                    </h6>
                    <p className="text-secondary">
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

                <div className="flex justify-between mb-8">
                    <label className="flex items-center">
                        {/* <Checkbox
                            name="remember"
                            value={data.remember}
                            onChange={handleOnChange}
                        /> */}
                        <span className="ml-2 text-sm text-secondary">
                            Remember me
                        </span>
                    </label>
                    {/* {canResetPassword && ( */}
                    <NavLink
                        to="/auth/forgot_password"
                        className="text-sm text-secondary hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Lupa password?
                    </NavLink>
                    {/* )} */}
                </div>

                <div className="flex items-center gap-x-4 justify-end">
                    <Button
                        type="reset"
                        className="w-1/4 border-secondary/50 border bg-white text-primary"
                    >
                        Reset
                    </Button>
                    <Button type="submit" className="w-3/4">
                        Masuk
                    </Button>
                </div>
                <div className="pt-4">
                    <p className="text-secondary">
                        Belum punya akun?{" "}
                        <NavLink
                            to="/auth/register"
                            className="text-primary font-semibold"
                        >
                            Daftar
                        </NavLink>
                    </p>
                    {/* <div className="w-full border-b border-secondary/50" />
                    <p className="text-center text-secondary mx-4 -mt-3.5 bg-white px-4 whitespace-nowrap">
                        atau masuk dengan
                    </p> */}
                </div>
            </form>
        </div>
    );
}
