import Table from "@/components/fragment/table";
import { Button } from "@/components/ui/button";
import http from "@/services/axios";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";

import React, { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import Toast from "@/components/fragment/toast";
import Loading from "@/components/ui/loading";

export default function GetResident() {
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(false);

    let [isToast, setIsToast] = useState(false);
    const [toastTitle, setToastTitle] = useState("");
    const [residentId, setResidentId] = useState("");

    function openToast(residentId, title) {
        setIsToast(true);
        setToastTitle(title);
        setResidentId(residentId);
    }

    function onCancelToast() {
        setIsToast(false);
    }

    useEffect(() => {
        getResidents();
    }, []);

    const getResidents = async () => {
        try {
            setLoading(true);
            const { data } = await http.get("/admin/residents");
            setTimeout(() => {
                setLoading(false);
                setResidents(data.data.data);
            }, 300);
        } catch (error) {
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }
    };

    const verifyKTP = async (username) => {
        try {
            setLoading(true);
            await http.put(`/admin/residents/verificate/${username}`);
            setTimeout(() => {
                setLoading(false);
                setIsToast(false);
            }, 300);
        } catch (error) {
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }
    };

    return (
        <>
            <div>
                {loading && <Loading />}
                <div className="title">
                    <h3 className="text-3xl font-semibold">Masyarakat</h3>
                    <p className="text-slate-700">
                        Daftar semua masyarakat yang telah mendaftar ke sistem
                    </p>
                </div>
                <div className="filter"></div>
            </div>
            <div className="w-full">
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th>#</Table.Th>
                            <Table.Th>NIK</Table.Th>
                            <Table.Th>Nama</Table.Th>
                            <Table.Th className="text-center">
                                Verifikasi KTP
                            </Table.Th>
                            <Table.Th className="text-center">
                                Verifikasi Email
                            </Table.Th>
                            <Table.Th>Avatar</Table.Th>
                            <Table.Th className="w-12 px-2">Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {residents.length > 0 ? (
                            residents.map((resident, index) => (
                                <tr
                                    className="bg-white border-b text-third"
                                    key={index}
                                >
                                    <Table.Td className="w-5">
                                        {index + 1}
                                    </Table.Td>
                                    <Table.Td className="w-min">
                                        {resident.resident.nik}
                                    </Table.Td>
                                    <Table.Td className="w-min">
                                        {resident.name}
                                    </Table.Td>
                                    <Table.Td textAlign="center">
                                        {resident.resident.ktp_verified_at ? (
                                            <IconCircleCheckFilled className="text-green-500" />
                                        ) : (
                                            <IconCircleXFilled className="text-red-500" />
                                        )}
                                    </Table.Td>
                                    <Table.Td textAlign="center">
                                        {resident.email_verified_at ? (
                                            <IconCircleCheckFilled className="text-green-500" />
                                        ) : (
                                            <IconCircleXFilled className="text-red-500" />
                                        )}
                                    </Table.Td>
                                    <Table.Td className="w-min">
                                        {resident.email_verified_at ? (
                                            <img src="" alt="" />
                                        ) : (
                                            <img
                                                width="50"
                                                className="rounded"
                                                src="/images/notfound/notfound.jpg"
                                                alt=""
                                            />
                                        )}
                                    </Table.Td>
                                    <Table.Td>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem className="group:name">
                                                    <Link
                                                        className="group:name w-full h-full"
                                                        to={
                                                            "/admin/residents/" +
                                                            resident.username
                                                        }
                                                    >
                                                        Rincian
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        openToast(
                                                            resident.id,
                                                            resident.name
                                                        )
                                                    }
                                                >
                                                    Verifikasi KTP
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Arsipkan
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </Table.Td>
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white border-b text-third text-center">
                                <Table.Td colSpan="7">Item kosong</Table.Td>
                            </tr>
                        )}
                    </Table.Tbody>
                </Table>
                <div className="flex w-full justify-between items-center">
                    <p className="text-sm text-dark mt-10">
                        Total Stok: <span className="font-bold"></span>
                    </p>
                </div>
            </div>

            {/* Toast */}
            <Toast
                isToast={isToast}
                onClose={() => setIsToast(false)}
                title={toastTitle}
                name="Verifikasi"
            >
                <div className="flex justify-end gap-2">
                    <Button
                        variant="secondary"
                        className="w-32"
                        onClick={() => onCancelToast()}
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
        </>
    );
}
