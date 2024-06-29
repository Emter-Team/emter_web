import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "@/services/axios";
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import Error from "@/components/ui/error";
import SidebarProfile from "@/components/fragment/sidebar/sidebarProfile";

export default function FormUpdateProfile() {
    const { id } = useParams(); // mengambil id dari URL
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const avatarRef = useRef();

    useEffect(() => {
        getDetailProfile();
    }, []);

    const getDetailProfile = async () => {
        try {
            setLoading(true);
            const { data } = await http.get(`/admin/profiles/${id}`);
            setTimeout(() => {
                setLoading(false);
                setProfile(data.data);
                setName(data.data.name);
                setEmail(data.data.email);
                setUsername(data.data.username);
                setAddress(data.data.address);
                setIdUser(data.data.id);
                setAvatarPreview(data.data.avatar); // URL gambar dari database
            }, 300);
        } catch (error) {
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
                setAvatar(file);
            };
            reader.readAsDataURL(file);
        } else {
            setAvatarPreview(null);
            setAvatar(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("username", username);
        formData.append("address", address);
        if (avatar) {
            formData.append("avatar", avatar);
        }

        try {
            await http.post(`/admin/profiles/${idUser}?_method=PUT`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Profil Berhasil Diperbarui");
            navigate(`/profiles/${id}`);
        } catch (err) {
            const response = err.response;
            if (response && response.status === 400) {
                setError(response.data.message);
            } else {
                toast.error("Server error");
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!profile) {
        return <div>Profile data not found.</div>;
    }

    return (
        <>
            <SidebarProfile user={profile} />
            <div className="w-full mt-10 md:mt-20 p-0 md:p-4 md:w-10/12 h-screen">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="title w-full">
                        <h3 className="text-3xl font-semibold text-primary">
                            Informasi Profil
                        </h3>
                        <p className="text-secondary">
                            Perbarui informasi profil Anda dan pengaturan
                            lainnya.
                        </p>
                    </div>
                </div>
                <div className="mt-6 border rounded-md border-primary/50 p-4">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Name</label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                            />
                            {error.name && <Error>{error.name[0]}</Error>}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email">Email</label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                            {error.email && <Error>{error.email[0]}</Error>}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="username">Username</label>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                            />
                            {error.username && (
                                <Error>{error.username[0]}</Error>
                            )}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="address">Address</label>
                            <Textarea
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            {error.address && <Error>{error.address[0]}</Error>}
                        </div>
                        {avatarPreview && (
                            <div className="mt-4">
                                <img
                                    src={avatarPreview}
                                    alt="Preview Avatar"
                                    className="w-32 h-32 object-cover rounded-full"
                                />
                            </div>
                        )}
                        <div className="mt-4">
                            <label htmlFor="avatar">Avatar</label>
                            <Input
                                id="avatar"
                                type="file"
                                ref={avatarRef}
                                onChange={handleAvatarChange}
                            />
                            {error.avatar && <Error>{error.avatar[0]}</Error>}
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <Button type="submit">Update Profile</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
