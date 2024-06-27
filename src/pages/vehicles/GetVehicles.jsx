import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import Table from "@/components/fragment/table";
import { Button } from "@/components/ui/button";
import Toast from "@/components/fragment/toast";
import Loading from "@/components/ui/loading";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import http from "@/services/axios";
import Pagination from "@/components/fragment/paginate";

export default function GetVehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [totalVehicles, setTotalVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationLinks, setPaginationLinks] = useState([]);

    const [isDeleteToast, setIsDeleteToast] = useState(false);
    const [vehicle, setVehicle] = useState("");

    const [searchName, setSearchName] = useState("");
    const [isReadyFilter, setIsReadyFilter] = useState("");
    const [institutionFilter, setInstitutionFilter] = useState("");

    function openDeleteToast(vehicle, title) {
        setIsDeleteToast(true);
        setVehicle(vehicle);
    }

    function onCancelDeleteToast() {
        setIsDeleteToast(false);
    }

    useEffect(() => {
        getVehicles(currentPage);
        getInstitution();
    }, [searchName, isReadyFilter, institutionFilter, currentPage]);

    const getVehicles = async (page) => {
        setLoading(true);
        const params = {
            name: searchName,
            page: page,
            institution: institutionFilter,
            ready: isReadyFilter,
        };

        // Add a delay of 0.3 seconds before showing loading indicator
        setTimeout(async () => {
            try {
                const response = await http.get("/admin/vehicles/", {
                    params,
                });
                setVehicles(response.data.data.data);
                setPaginationLinks(response.data.data.meta);
                setTotalVehicles(response.data.data.total_vehicles);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, 300); // 0.3 seconds delay
    };

    const getInstitution = async () => {
        setLoading(true);
        try {
            const response = await http.get("/admin/institutions");
            setInstitutions(response.data.data.data);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const handleTrash = (username) => {
        setLoading(true);
        setTimeout(async () => {
            try {
                await http.delete(`/admin/vehicles/${username}`);
                setIsDeleteToast(false);
                getVehicles(currentPage);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, 300); // 0.3 seconds delay
    };

    return (
        <>
            {loading && <Loading />} {/* Show loading indicator */}
            <div className="w-full mt-10 md:mt-20 p-0 md:p-4 h-screen">
                <div>
                    <div className="w-full flex flex-col justify-center md:flex-row md:justify-end">
                        <div className="title w-full md:w-1/3">
                            <h3 className="text-3xl font-semibold text-primary">
                                Kendaraan Darurat
                            </h3>
                            <p className="text-secondary">
                                Daftar semua kendaraan darurat yang ada dalam
                                Sistem
                            </p>
                        </div>
                        <div className="w-full md:w-2/3 mt-8 md:mt-0 flex justify-end gap-x-4">
                            <Select
                                onValueChange={(value) =>
                                    setInstitutionFilter(value)
                                }
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Instansi" />
                                </SelectTrigger>
                                <SelectContent>
                                    {institutions.map((institution, index) => (
                                        <SelectItem
                                            value={institution.username}
                                            key={index}
                                        >
                                            {institution.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                onValueChange={(value) =>
                                    setIsReadyFilter(value)
                                }
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Aktif</SelectItem>
                                    <SelectItem value="0">
                                        Tidak Aktif
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                type="search"
                                className="w-48"
                                placeholder="Cari nama..."
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th className="w-[2%]">#</Table.Th>
                                <Table.Th className="w-[10%]">
                                    Instansi
                                </Table.Th>
                                <Table.Th className="w-[10%]">Petugas</Table.Th>
                                <Table.Th className="w-[10%]">Nama</Table.Th>
                                <Table.Th className="flex w-[60%] whitespace-normal">
                                    Deskripsi
                                </Table.Th>
                                <Table.Th
                                    textAlign="center"
                                    className="w-[10%] text-center"
                                >
                                    Status
                                </Table.Th>
                                <Table.Th className="w-[10%]">Gambar</Table.Th>
                                <Table.Th className="w-[5%]">Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody className="whitespace-normal">
                            {vehicles.length > 0 ? (
                                vehicles.map((vehicle, index) => (
                                    <Table.Tr key={index}>
                                        <Table.Td className="w-[2%]">
                                            {paginationLinks.from + index}
                                        </Table.Td>
                                        <Table.Td className="w-[10%]">
                                            {vehicle.institution.user.name}
                                        </Table.Td>
                                        <Table.Td className="w-[10%]">
                                            {vehicle.officer.user.name}
                                        </Table.Td>
                                        <Table.Td className="w-[10%]">
                                            {vehicle.name}
                                        </Table.Td>
                                        <Table.Td className="flex w-[60%] whitespace-normal">
                                            {vehicle.description}
                                        </Table.Td>
                                        <Table.Td
                                            textAlign="center"
                                            className="w-[10%]"
                                        >
                                            {vehicle.is_ready ? (
                                                <IconCircleCheckFilled className="text-success" />
                                            ) : (
                                                <IconCircleXFilled className="text-danger" />
                                            )}
                                        </Table.Td>
                                        <Table.Td className="w-[10%]">
                                            {vehicle.picture ? (
                                                <img
                                                    width="50"
                                                    className="rounded"
                                                    src="/images/notfound/notfound.jpg"
                                                    alt=""
                                                />
                                            ) : (
                                                <img
                                                    width="50"
                                                    className="rounded"
                                                    src="/images/notfound/notfound.jpg"
                                                    alt=""
                                                />
                                            )}
                                        </Table.Td>
                                        <Table.Td className="w-[5%]">
                                            <Button
                                                variant="secondary border-none"
                                                onClick={() =>
                                                    openDeleteToast(
                                                        vehicle.id,
                                                        vehicle.name
                                                    )
                                                }
                                            >
                                                <Trash2 size={18} />
                                            </Button>
                                        </Table.Td>
                                    </Table.Tr>
                                ))
                            ) : (
                                <Table.Tr className="text-center">
                                    <Table.Td colSpan="7">Item kosong</Table.Td>
                                </Table.Tr>
                            )}
                        </Table.Tbody>
                    </Table>

                    {vehicles.length > 0 && (
                        <div className="flex w-full justify-between items-center pb-12">
                            <p className="text-sm text-primary mt-10">
                                Total Kendaraan:{" "}
                                <span className="font-bold">
                                    {totalVehicles}
                                </span>
                            </p>
                            <Pagination
                                links={paginationLinks.links}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    )}
                </div>
            </div>
            {/* Toast */}
            <Toast
                isToast={isDeleteToast}
                onClose={() => setIsDeleteToast(false)}
                title={
                    "Tindakan ini akan memulai proses menghapus berita. Apakah Anda ingin menghapus?"
                }
            >
                <div className="flex justify-end gap-2">
                    <Button
                        variant="secondary"
                        className="w-32"
                        onClick={() => onCancelDeleteToast()}
                    >
                        No
                    </Button>
                    <Button
                        className="w-32"
                        onClick={() => handleTrash(vehicle)}
                    >
                        Yes
                    </Button>
                </div>
            </Toast>
        </>
    );
}
