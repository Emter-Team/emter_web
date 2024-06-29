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
import SidebarUser from "@/components/fragment/sidebar/sidebarUser";
import { toast } from "react-toastify";

export default function GetOfficers() {
    const [officers, setOfficers] = useState([]);
    const [totalOfficers, setTotalOfficers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationLinks, setPaginationLinks] = useState([]);

    const [isDeleteToast, setIsDeleteToast] = useState(false);
    const [toastTitle, setToastTitle] = useState("");
    const [OfficersId, setOfficersId] = useState("");

    const [searchName, setSearchName] = useState("");
    const [emailFilter, setEmailFilter] = useState("");

    function openDeleteToast(OfficersId, title) {
        setIsDeleteToast(true);
        setToastTitle(title);
        setOfficersId(OfficersId);
    }

    function onCancelDeleteToast() {
        setIsDeleteToast(false);
    }

    useEffect(() => {
        getOfficers(currentPage);
    }, [searchName, emailFilter, currentPage]);

    const getOfficers = async (page) => {
        setLoading(true);
        const params = {
            name: searchName,
            email_verified_at: emailFilter,
            page: page,
        };

        // Add a delay of 0.3 seconds before showing loading indicator
        setTimeout(async () => {
            try {
                const response = await http.get("/admin/officers/", { params });
                setOfficers(response.data.data.data);
                setPaginationLinks(response.data.data.meta);
                setTotalOfficers(response.data.data.total_officers);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, 300); // 0.3 seconds delay
    };

    const handleTrash = (username) => {
        setLoading(true);
        setTimeout(async () => {
            try {
                await http.delete(`/admin/officers/${username}`);
                setIsDeleteToast(false);
                toast.success("Petugas Berhasil Dihapus");
                getOfficers(currentPage);
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
            <SidebarUser />
            <div className="w-full mt-10 md:mt-20 p-0 md:p-4 md:w-10/12 h-screen">
                <div>
                    <div className="w-full flex flex-col justify-center md:flex-row md:justify-end">
                        <div className="title w-full md:w-1/3">
                            <h3 className="text-3xl font-semibold text-primary">
                                Petugas
                            </h3>
                            <p className="text-secondary">
                                Daftar semua petugas yang telah mendaftar ke
                                sistem
                            </p>
                        </div>
                        <div className="w-full md:w-2/3 mt-8 md:mt-0 flex justify-end gap-x-4">
                            <Select
                                onValueChange={(value) => setEmailFilter(value)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Verifikasi Email" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">
                                        Sudah Verifikasi
                                    </SelectItem>
                                    <SelectItem value="false">
                                        Belum Verifikasi
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
                                <Table.Th>#</Table.Th>
                                <Table.Th>Instansi</Table.Th>
                                <Table.Th>Nama</Table.Th>
                                <Table.Th>Email</Table.Th>
                                <Table.Th className="text-center w-48">
                                    Verifikasi Email
                                </Table.Th>
                                <Table.Th className="w-12">Avatar</Table.Th>
                                <Table.Th className="w-12 px-2">Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {officers.length > 0 ? (
                                officers.map((officer, index) => (
                                    <Table.Tr key={index}>
                                        <Table.Td className="w-5">
                                            {paginationLinks.from + index}
                                        </Table.Td>
                                        <Table.Td className="w-min">
                                            {
                                                officer.officer.institution.user
                                                    .name
                                            }
                                        </Table.Td>
                                        <Table.Td className="w-min">
                                            {officer.username}
                                        </Table.Td>
                                        <Table.Td className="w-min">
                                            {officer.email}
                                        </Table.Td>
                                        <Table.Td
                                            textAlign="center"
                                            className="w-48"
                                        >
                                            {officer.email_verified_at ? (
                                                <IconCircleCheckFilled className="text-success" />
                                            ) : (
                                                <IconCircleXFilled className="text-danger" />
                                            )}
                                        </Table.Td>
                                        <Table.Td className="w-50">
                                            {officer.avatar ? (
                                                <img
                                                    width="50"
                                                    className="rounded"
                                                    src={officer.avatar}
                                                    alt={officer.name}
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
                                        <Table.Td>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <div className="group">
                                                        <Button
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0 group-hover:bg-primary"
                                                        >
                                                            <span className="sr-only">
                                                                Open menu
                                                            </span>
                                                            <MoreHorizontal className="h-4 w-4 group-hover:text-white" />
                                                        </Button>
                                                    </div>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <Link
                                                        className="group:name w-full h-full"
                                                        to={
                                                            "/officers/" +
                                                            officer.username
                                                        }
                                                    >
                                                        <DropdownMenuItem className="group:name">
                                                            <Eye
                                                                size={18}
                                                                className={`mr-2`}
                                                            />
                                                            Rincian
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            openDeleteToast(
                                                                officer.id,
                                                                officer.name
                                                            )
                                                        }
                                                    >
                                                        <Trash2
                                                            size={18}
                                                            className={`mr-2`}
                                                        />
                                                        Hapus
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
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

                    {officers.length > 0 && (
                        <div className="flex w-full justify-between items-center">
                            <p className="text-sm text-primary mt-10">
                                Total Petugas:{" "}
                                <span className="font-bold">
                                    {totalOfficers}
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
                title={toastTitle}
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
                        onClick={() => handleTrash(OfficersId)}
                    >
                        Yes
                    </Button>
                </div>
            </Toast>
        </>
    );
}
