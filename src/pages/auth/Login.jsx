import loginImg from "../../../public/images/app/login.svg";
import emterImg from "../../../public/images/app/emter.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useFormAction } from "react-router-dom";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useFormAction({
        email: "",
        password: "",
        remember: "",
    });

    const submit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <div className="flex">
                <div className="w-full sm:w-1/2 md:w-1/4 hidden sm:flex border-r border-gray-300 p-8 py-8  sm:flex-col sm:justify-between">
                    <div>
                        <img src={emterImg} alt="" width="180px" />
                    </div>
                    <div>
                        <img
                            src={loginImg}
                            alt=""
                            width="120%"
                            className="mx-auto"
                        />
                    </div>
                    <div>
                        <h6 className="text-xl font-semibold text-slate-700">
                            Emter
                        </h6>
                        <p className="text-slate-500">
                            Mengubah Layanan Darurat untuk Masyarakat yang lebih
                            cepat, baik dan tepat
                        </p>
                    </div>
                </div>
                <form
                    onSubmit={submit}
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
                            // value={data.email}
                            autoComplete="email"
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="email">Kata Sandi</Label>

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            // value={data.password}
                            autoComplete="current-password"
                            onChange={handleOnChange}
                        />
                    </div>

                    {/* <div className="flex justify-between mt-4 mb-8">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div> */}

                    <div className="flex items-center justify-end mt-4">
                        <Button>Masuk</Button>
                    </div>
                </form>
            </div>
        </>
    );
}
