import React, { useState, useEffect, useRef } from "react";
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

export default function FormService() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState("");
    const [serverPicture, setServerPicture] = useState(null);
    const [picturePreview, setPicturePreview] = useState(null);
    const [isPreviewActive, setIsPreviewActive] = useState(false);
    const pictureRef = useRef();

    const navigate = useNavigate();
    const { id: paramId } = useParams(); // Get the id from the URL

    useEffect(() => {
        if (paramId) {
            setIsEditMode(true);
            http.get(`/admin/services/${paramId}`)
                .then((response) => {
                    const { name, description, id, picture } =
                        response.data.data;
                    setId(id);
                    setName(name);
                    setDescription(description);
                    setServerPicture(picture); // Assuming the picture URL is in response.data.data.picture
                })
                .catch((err) => {
                    toast.error("Failed to load service data");
                });
        }
    }, [paramId]);

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPicturePreview(reader.result);
                setIsPreviewActive(true);
            };
            reader.readAsDataURL(file);
        } else {
            setPicturePreview(null);
            setIsPreviewActive(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        if (pictureRef.current.files[0]) {
            formData.append("picture", pictureRef.current.files[0]);
        }

        try {
            if (isEditMode) {
                await http.post(`/admin/services/${id}?_method=PUT`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                toast.success("Layanan berhasil diperbarui");
            } else {
                await http.post("/admin/services", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                toast.success("Layanan berhasil ditambahkan");
            }
            setError({});
            setName("");
            setDescription("");
            pictureRef.current.value = "";
            setPicturePreview(null);
            setIsPreviewActive(false);
            setServerPicture(null);
            navigate("/services");
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
                            data Jenis Layanan yang ada di sistem
                        </p>
                    </div>
                    <div className="w-full mt-8 border rounded-md border-primary/50 p-4">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor="name">Nama Layanan</Label>
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

                            {isPreviewActive && picturePreview ? (
                                <div className="mt-4">
                                    <img
                                        src={picturePreview}
                                        alt="Preview Gambar"
                                        className="w-72 h-auto"
                                    />
                                </div>
                            ) : serverPicture ? (
                                <div className="mt-4">
                                    <img
                                        src={serverPicture}
                                        alt="Gambar dari Server"
                                        className="w-72 h-auto"
                                    />
                                </div>
                            ) : null}
                            <div className="mt-4">
                                <Label htmlFor="picture">Gambar</Label>
                                <Input
                                    id="picture"
                                    type="file"
                                    name="picture"
                                    ref={pictureRef}
                                    onChange={handlePictureChange}
                                />
                                {error.picture && (
                                    <Error>{error.picture[0]}</Error>
                                )}
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Button type="submit">
                                    {isEditMode ? "Simpan Perubahan" : "Simpan"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
