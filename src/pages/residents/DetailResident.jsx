import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "@/services/axios"; // Pastikan Anda mengimpor axios service dengan benar
import Loading from "@/components/ui/loading"; // Pastikan Anda memiliki komponen Loading
import { formatDate } from "@/lib/dateUtils";
import Table from "@/components/fragment/table";
import { Calendar, Mail, Phone } from "lucide-react";
import { IconGenderFemale, IconGenderMale } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import SidebarUser from "@/components/fragment/sidebar/sidebarUser";
import Toast from "@/components/fragment/toast";

export default function DetailResident() {
    const { id } = useParams(); // Mengambil id dari URL
    const [resident, setResident] = useState(null);
    const [loading, setLoading] = useState(false);

    const [isVerificationToast, setIsVerificationToast] = useState(false);
    const [isUnverificationToast, setIsUnverificationToast] = useState(false);
    const [toastTitle, setToastTitle] = useState("");
    const [residentId, setResidentId] = useState(null);

    function openVerificationToast(residentId, title) {
        setIsVerificationToast(true);
        setToastTitle(title);
        setResidentId(residentId);
    }

    function openUnverificationToast(residentId, title) {
        setIsUnverificationToast(true);
        setToastTitle(title);
        setResidentId(residentId);
    }

    function onCancelVerificationToast() {
        setIsVerificationToast(false);
    }

    function onCancelUnverificationToast() {
        setIsUnverificationToast(false);
    }

    useEffect(() => {
        getDetailResident();
    }, []);

    const getDetailResident = async () => {
        try {
            setLoading(true);
            const { data } = await http.get(`/admin/residents/${id}`);
            setTimeout(() => {
                setLoading(false);
                setResident(data.data);
            }, 300);
        } catch (error) {
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!resident) {
        return <div>Resident data not found.</div>;
    }

    const verifyKTP = async (id) => {
        try {
            setLoading(true);
            await http.put(`/admin/residents/verificate/${id}`);
            setTimeout(() => {
                setLoading(false);
                getDetailResident();
            }, 300);
        } catch (error) {
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }
    };

    const unverifyKTP = async (id) => {
        try {
            setLoading(true);
            await http.put(`/admin/residents/unverificate/${id}`);
            setTimeout(() => {
                setLoading(false);
                getDetailResident();
            }, 300);
        } catch (error) {
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }
    };

    return (
        <>
            <SidebarUser />
            <div className="w-full mt-10 md:mt-20 p-0 md:p-4 md:w-10/12 h-screen">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/4">
                        <img
                            src={resident.avatar}
                            alt={resident.name}
                            className="rounded-lg w-full"
                        />
                    </div>
                    <div className="w-full md:w-3/4">
                        <div className="space-y-3">
                            <p>{formatDate(resident.created_at)}</p>
                            <h3 className="text-xl md:text-3xl font-semibold">
                                {resident.name}
                            </h3>
                            <span className="text-primary">
                                {resident.username}
                            </span>
                        </div>
                        <Table className="border-none w-1/2 text-[16px]">
                            <tr className="border-none">
                                <th className="px-0 py-2 flex gap-x-2 items-center">
                                    <Mail />
                                    Email
                                </th>
                                <td className="py-2">: {resident.email}</td>
                            </tr>
                            <tr className="border-none">
                                <th className="px-0 py-2 flex gap-x-2 items-center">
                                    <Calendar />
                                    Tempat, Tanggal lahir
                                </th>
                                <td className="py-2">
                                    : {resident.resident.date_place_of_birth}
                                </td>
                            </tr>
                            <tr className="border-none">
                                <th className="px-0 py-2 flex gap-x-2 items-center">
                                    {resident.resident.gender === "man" ? (
                                        <IconGenderMale />
                                    ) : (
                                        <IconGenderFemale />
                                    )}
                                    Jenis Kelamin
                                </th>
                                <td className="py-2">
                                    :{" "}
                                    {resident.resident.gender === "man"
                                        ? "Laki-laki"
                                        : "Perempuan"}
                                </td>
                            </tr>
                            <tr className="border-none">
                                <th className="px-0 py-2 flex gap-x-2 items-center">
                                    <Phone />
                                    Nomor Telepon
                                </th>
                                <td className="py-2">
                                    : {resident.resident.phone_number}
                                </td>
                            </tr>
                            <tr className="border-none">
                                <th className="px-0 py-2 flex gap-x-2 items-center">
                                    <Phone />
                                    Alamat
                                </th>
                                <td className="py-2">: {resident.address}</td>
                            </tr>
                        </Table>
                        {resident.name == "Rachel Ardana Putra Ginting" ? (
                            <img
                                src="https://i.ibb.co.com/QfZyVFk/KTP.jpg"
                                alt="KTP Rachel Ardana Putra Ginting"
                            />
                        ) : null}
                        <div className="mt-10 flex gap-x-4 justify-end md:justify-start">
                            <Button
                                variant="secondary"
                                onClick={() =>
                                    openUnverificationToast(
                                        resident.id,
                                        resident.name
                                    )
                                }
                            >
                                {resident.resident.ktp_verified_at !== null
                                    ? "Batalkan Verifikasi"
                                    : "Tolak Verifikasi"}
                            </Button>
                            <Button
                                onClick={() => verifyKTP(resident.id)}
                                disabled={
                                    resident.resident.ktp_verified_at !== null
                                }
                            >
                                {resident.resident.ktp_verified_at === null
                                    ? "Setujui Verifikasi"
                                    : "Sudah Verifikasi"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Toast */}
            <Toast
                isToast={isVerificationToast}
                onClose={() => setIsVerificationToast(false)}
                title={`Tindakan ini akan mulai menverifikasi Masyarakat. Apakah kamu yakin sudah memeriksa dan melihat dengan benar datanya ${toastTitle} ?`}
            >
                <div className="flex justify-end gap-2">
                    <Button
                        variant="secondary"
                        className="w-32"
                        onClick={() => onCancelVerificationToast()}
                    >
                        No
                    </Button>
                    <Button
                        className="w-32"
                        onClick={() => verifyKTP(residentId)}
                    >
                        Yes
                    </Button>
                </div>
            </Toast>
            <Toast
                isToast={isUnverificationToast}
                onClose={() => setIsUnverificationToast(false)}
                title={`Tindakan ini akan mulai membatalkan verifikasi Masyarakat. Apakah kamu yakin ingin mengbatalkan verifikasi ${toastTitle} ?`}
            >
                <div className="flex justify-end gap-2">
                    <Button
                        variant="secondary"
                        className="w-32"
                        onClick={() => onCancelUnverificationToast()}
                    >
                        No
                    </Button>
                    <Button
                        className="w-32"
                        onClick={() => unverifyKTP(residentId)}
                    >
                        Yes
                    </Button>
                </div>
            </Toast>
        </>
    );
}
