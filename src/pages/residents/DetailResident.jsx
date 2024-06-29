import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "@/services/axios"; // pastikan Anda mengimpor axios service dengan benar
import Loading from "@/components/ui/loading"; // pastikan Anda memiliki komponen Loading
import { formatDate } from "@/lib/dateUtils";
import Table from "@/components/fragment/table";
import { Calendar, Mail, Phone } from "lucide-react";
import { IconGenderFemale, IconGenderMale } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import SidebarUser from "@/components/fragment/sidebar/sidebarUser";

export default function DetailResident() {
    const { id } = useParams(); // mengambil id dari URL
    const [resident, setResident] = useState(null);
    const [loading, setLoading] = useState(false);

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
                                        <IconGenderMale></IconGenderMale>
                                    ) : (
                                        <IconGenderFemale></IconGenderFemale>
                                    )}
                                    Jenis Kelamin
                                </th>
                                <td className="py-2">
                                    :{" "}
                                    {resident.resident.gender == "man"
                                        ? "Laki-laki"
                                        : "Perempuan"}
                                </td>
                            </tr>
                            <tr className="border-none">
                                <th className="px-0 py-2 flex gap-x-2 items-center">
                                    <Calendar />
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
                        <div className="mt-10 flex gap-x-4 justify-end md:justify-start">
                            <Button variant="secondary">
                                {" "}
                                {resident.ktp_verified_at !== null
                                    ? "Batalkan Verifikasi"
                                    : "Tolak Verifikasi"}
                            </Button>
                            <Button
                                onClick={() => verifyKTP(resident.id)}
                                disabled={resident.ktp_verified_at !== null}
                            >
                                {resident.ktp_verified_at !== null
                                    ? "Sudah Terverifikasi"
                                    : "Setujui Verifikasi"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
