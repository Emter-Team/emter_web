import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "@/services/axios";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import SidebarProfile from "@/components/fragment/sidebar/sidebarProfile";
import Loading from "@/components/ui/loading";
import { useStateContext } from "@/contexts/ContextProvider";
import { AlertTriangle } from "lucide-react";
import Toast from "@/components/fragment/toast";

export default function DeleteAccount() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { user, setUser, setToken } = useStateContext();

    const [isDeleteToast, setIsDeleteToast] = useState(false);
    const [error, setError] = useState({});

    const openDeleteToast = () => {
        setIsDeleteToast(true);
    };

    const onCancelDeleteToast = () => {
        setIsDeleteToast(false);
    };

    const handleDeleteAccount = async () => {
        setLoading(true);

        try {
            await http.delete(`/admin/profiles/${user.id}`);
            toast.success("Akun berhasil dihapus"); // Menampilkan toast sukses
            setUser(null);
            setToken(null);
            navigate("/"); // Redirect ke halaman lain setelah berhasil menghapus
        } catch (err) {
            const response = err.response;
            if (response && response.status === 400) {
                setError(response.data.message);
            } else {
                toast.error("Server error");
            }

            console.log(err);
        } finally {
            setLoading(false);
            setIsDeleteToast(false); // Tutup Toast setelah selesai
        }
    };

    return (
        <>
            {loading && <Loading />}
            <SidebarProfile />
            <div className="w-full mt-10 md:mt-20 p-0 md:p-4 md:w-10/12 h-screen">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="title w-full">
                        <h3 className="text-3xl font-semibold text-primary">
                            Hapus Akun
                        </h3>
                        <p className="text-secondary">
                            Apakah Anda yakin ingin menghapus akun Anda?
                        </p>
                    </div>
                </div>
                <div className="mt-6">
                    <Button
                        onClick={openDeleteToast} // Panggil fungsi untuk menampilkan Toast delete
                        className="border-danger bg-danger"
                    >
                        <AlertTriangle className="mr-2" /> Hapus Akun
                    </Button>
                </div>
            </div>

            {/* Toast untuk konfirmasi hapus akun */}
            <Toast
                isToast={isDeleteToast}
                onClose={onCancelDeleteToast}
                title={"Anda yakin ingin menghapus akun Anda?"}
            >
                <div className="flex justify-end gap-2">
                    <Button
                        variant="secondary"
                        className="w-32"
                        onClick={onCancelDeleteToast} // Batalkan hapus
                    >
                        Batal
                    </Button>
                    <Button
                        className="border-danger bg-danger w-32"
                        onClick={handleDeleteAccount} // Konfirmasi hapus
                    >
                        Hapus
                    </Button>
                </div>
            </Toast>
        </>
    );
}
