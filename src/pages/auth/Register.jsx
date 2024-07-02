import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import http from "@/services/axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStateContext } from "@/contexts/ContextProvider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Error from "@/components/ui/error";
import { Button } from "@/components/ui/button";
import NavLink from "@/components/fragment/navlink";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/ui/loading";

export default function Register() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        username: "",
        address: "",
        role: "institution",
        description: "",
        latitude: "",
        longitude: "",
        service_id: "",
    });

    const [error, setError] = useState({});
    const { setUser, setToken } = useStateContext();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await http.post("/auth/register", form);
            setUser(response.data.data);
            setToken(response.data.data.token);
            setError({});
            console.log(response.data.data);
            toast.success("Registrasi berhasil");
            setLoading(false);
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                setError(response.data.message);
            } else if (response && response.status === 400) {
                setError(response.data.message);
                toast.error("Registrasi gagal");
            } else {
                toast.error("Terjadi kesalahan");
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        getService();
    }, []);

    const getService = async () => {
        setLoading(true);
        try {
            const response = await http.get("/services/all");
            setServices(response.data.data);
        } catch (error) {
            // Handle error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex">
            {loading && <Loading />}
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
                onSubmit={handleRegister}
                className="w-full px-4 sm:w-3/4 md:w-1/3 lg:w-1/3 mx-auto h-screen flex flex-col justify-center"
            >
                <div className="mb-8">
                    <h6 className="text-3xl text-primary">Daftar Akun Baru</h6>
                    <p className="text-secondary">
                        Silakan isi form berikut untuk mendaftar
                    </p>
                </div>
                <div>
                    <Label htmlFor="service_id">Jenis Layanan</Label>
                    <Select
                        onValueChange={(value) =>
                            handleSelectChange("service_id", value)
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Layanan" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            {services.map((service) => (
                                <SelectItem
                                    key={service.id}
                                    value={service.slug}
                                >
                                    {service.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {error.service_id && <Error>{error.service_id}</Error>}
                </div>
                <div className="mt-4">
                    <Label htmlFor="name">Nama</Label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                    />
                    {error.name && <Error>{error.name}</Error>}
                </div>
                <div className="flex gap-x-4 w-full mt-4">
                    <div className="w-full">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full"
                            autoComplete="username"
                        />
                        {error.username && <Error>{error.username}</Error>}
                    </div>
                    <div className="w-full">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            autoComplete="email"
                        />
                        {error.email && <Error>{error.email}</Error>}
                    </div>
                </div>
                <div className="mt-4">
                    <Label htmlFor="address">Alamat</Label>
                    <Input
                        id="address"
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        autoComplete="address"
                    />
                    {error.address && <Error>{error.address}</Error>}
                </div>
                <div className="mt-4">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Input
                        id="description"
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        autoComplete="description"
                    />
                    {error.description && <Error>{error.description}</Error>}
                </div>
                <div className="flex gap-x-4 w-full mt-4">
                    <div className="w-full">
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input
                            id="latitude"
                            type="text"
                            name="latitude"
                            value={form.latitude}
                            onChange={handleChange}
                            autoComplete="latitude"
                        />
                        {error.latitude && <Error>{error.latitude}</Error>}
                    </div>
                    <div className="w-full">
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input
                            id="longitude"
                            type="text"
                            name="longitude"
                            value={form.longitude}
                            onChange={handleChange}
                            autoComplete="longitude"
                        />
                        {error.longitude && <Error>{error.longitude}</Error>}
                    </div>
                </div>
                <hr className="border-secondary/50 mt-4" />
                <div className="flex gap-x-4 mt-3">
                    <div className="w-full">
                        <Label htmlFor="password">Kata Sandi</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />
                        {error.password && <Error>{error.password}</Error>}
                    </div>
                    <div className="w-full">
                        <Label htmlFor="password_confirmation">
                            Ulang Kata Sandi
                        </Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />
                        {error.password_confirmation && (
                            <Error>{error.password_confirmation}</Error>
                        )}
                    </div>
                </div>
                <div className="pt-8 flex items-center gap-x-4 justify-end">
                    <Button
                        type="reset"
                        className="w-1/4 border-secondary/50 border bg-white text-primary"
                    >
                        Reset
                    </Button>
                    <Button type="submit" className="w-3/4">
                        Daftar
                    </Button>
                </div>
                <div className="pt-4">
                    <p className="text-secondary">
                        Sudah punya akun?{" "}
                        <NavLink
                            to="/auth/login"
                            className="text-primary font-semibold"
                        >
                            Masuk
                        </NavLink>
                    </p>
                </div>
            </form>
        </div>
    );
}
