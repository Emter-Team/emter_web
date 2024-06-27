import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { Input } from "@/components/ui/input";
import SidebarSetting from "@/components/fragment/sidebar/sidebarSetting";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import axios from "axios";
import Error from "@/components/ui/error";
import { useNavigate } from "react-router-dom";

export default function FormCategories() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const nameRef = useRef();
    const descriptionRef = useRef();

    const navigate = useNavigate();

    const handleAddCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
        };

        try {
            await axios.post(
                "http://localhost:8000/api/admin/post_categories",
                payload
            );
            toast.success("Kategori berhasil ditambahkan");
            setError({});
            nameRef.current.value = "";
            descriptionRef.current.value = "";
            navigate("/post_categories");
        } catch (err) {
            const response = err.response;
            if (response && response.status === 400) {
                setError(response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loading />}
            <SidebarSetting />
            <div className="w-full mt-10 md:mt-20 p-0 md:p-4 md:w-10/12 h-screen">
                <div>
                    <div className="title w-full">
                        <h3 className="text-3xl font-semibold text-primary">
                            Form Tambah Data
                        </h3>
                        <p className="text-secondary">
                            Form untuk menambahkan data Jenis Berita yang ada di
                            sistem
                        </p>
                    </div>
                    <div className="w-full mt-8 border rounded-md border-primary/50 p-4">
                        <form onSubmit={handleAddCategory}>
                            <div>
                                <Label htmlFor="name">Nama Kategori</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    ref={nameRef}
                                    autoComplete="name"
                                />
                                {error.name && <Error>{error.name[0]}</Error>}
                            </div>

                            <div className="mt-4">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    ref={descriptionRef}
                                />
                                {error.description && (
                                    <Error>{error.description[0]}</Error>
                                )}
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Button type="submit">Simpan</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
