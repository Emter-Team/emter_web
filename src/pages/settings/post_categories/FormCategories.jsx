import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { Input } from "@/components/ui/input";
import SidebarSetting from "@/components/fragment/sidebar/sidebarSetting";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import Error from "@/components/ui/error";
import { useNavigate, useParams } from "react-router-dom";
import http from "@/services/axios";

export default function FormCategories() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState("");

    const navigate = useNavigate();
    const { id: paramId } = useParams(); // Get the id from the URL

    useEffect(() => {
        if (paramId) {
            setIsEditMode(true);
            http.get(`/admin/post_categories/${paramId}`)
                .then((response) => {
                    const { name, description, id } = response.data.data;
                    setId(id);
                    setName(name);
                    setDescription(description);
                })
                .catch((err) => {
                    toast.error("Failed to load category data");
                });
        }
    }, [paramId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = { name, description };

        try {
            if (isEditMode) {
                await http.put(`/admin/post_categories/${id}`, payload);
                toast.success("Kategori berhasil diperbarui");
            } else {
                await http.post("/admin/post_categories", payload);
                toast.success("Kategori berhasil ditambahkan");
            }
            setError({});
            setName("");
            setDescription("");
            navigate("/post_categories");
        } catch (err) {
            const response = err.response;
            if (response && response.status === 400) {
                setError(response.data.message);
            } else {
                toast.error("Terjadi kesalahan pada server");
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
                            {isEditMode ? "Form Edit Data" : "Form Tambah Data"}
                        </h3>
                        <p className="text-secondary">
                            Form untuk {isEditMode ? "mengubah" : "menambahkan"}{" "}
                            data Jenis Berita yang ada di sistem
                        </p>
                    </div>
                    <div className="w-full mt-8 border rounded-md border-primary/50 p-4">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor="name">Nama Kategori</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete="name"
                                />
                                {error.name && <Error>{error.name[0]}</Error>}
                            </div>

                            <div className="mt-4">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
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
