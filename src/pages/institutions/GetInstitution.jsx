import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    IconCircleCheckFilled,
    IconCircleXFilled,
    IconDetails,
} from "@tabler/icons-react";
import {
    Check,
    CheckCheck,
    Eye,
    MoreHorizontal,
    Trash,
    Trash2,
} from "lucide-react";
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

export default function GetInstitution() {
    const [institutions, setInstitutions] = useState([]);
    const [services, setServices] = useState([]);
    const [totalInstitution, setTotalInstitutions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationLinks, setPaginationLinks] = useState([]);

    const [isDeleteToast, setIsDeleteToast] = useState(false);
    const [toastTitle, setToastTitle] = useState("");
    const [institutionId, setInstitutionId] = useState("");

    const [searchName, setSearchName] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    const [serviceFilter, setServiceFilter] = useState("");

    function openToast(institutionId, title) {
        setIsToast(true);
        setToastTitle(title);
        setInstitutionId(institutionId);
    }

    function openDeleteToast(institutionId, title) {
        setIsDeleteToast(true);
        setToastTitle(title);
        setInstitutionId(institutionId);
    }

    function onCancelDeleteToast() {
        setIsDeleteToast(false);
    }

    useEffect(() => {
        getInstitutions(currentPage);
        getService();
    }, [searchName, emailFilter, serviceFilter, currentPage]);

    const getService = async () => {
        setLoading(true);
        try {
            const response = await http.get("/admin/services");
            setServices(response.data.data.data);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const getInstitutions = async (page) => {
        setLoading(true);
        const params = {
            name: searchName,
            service: serviceFilter,
            email_verified_at: emailFilter,
            page: page,
        };

        // Add a delay of 0.3 seconds before showing loading indicator
        setTimeout(async () => {
            try {
                const response = await http.get("/admin/institutions", {
                    params,
                });
                setInstitutions(response.data.data.data);
                setPaginationLinks(response.data.data.meta.links);
                setTotalInstitutions(response.data.data.total_institutions);
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
                await http.delete(`/admin/institutions/${username}`);
                setIsDeleteToast(false);
                getInstitutions(currentPage);
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
            <div>
                <div className="w-full flex flex-col justify-center md:flex-row md:justify-end">
                    <div className="title w-full md:w-1/3">
                        <h3 className="text-3xl font-semibold text-primary">
                            Instansi
                        </h3>
                        <p className="text-secondary">
                            Daftar semua instansi yang telah mendaftar ke sistem
                        </p>
                    </div>
                    <div className="w-full md:w-2/3 mt-8 md:mt-0 flex justify-end gap-x-4">
                        <Select
                            onValueChange={(value) => setServiceFilter(value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Layanan" />
                            </SelectTrigger>
                            <SelectContent>
                                {services.map((service, index) => (
                                    <SelectItem
                                        value={service.slug}
                                        key={index}
                                    >
                                        {service.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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
                            <Table.Th>Nama</Table.Th>
                            <Table.Th>Layanan</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th className="text-center w-48">
                                Verifikasi Email
                            </Table.Th>
                            <Table.Th className="w-12">Avatar</Table.Th>
                            <Table.Th className="w-12 px-2">Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {institutions.length > 0 ? (
                            institutions.map((institution, index) => (
                                <Table.Tr key={index}>
                                    <Table.Td className="w-5">
                                        {index + 1}
                                    </Table.Td>
                                    <Table.Td className="w-min">
                                        {institution.name}
                                    </Table.Td>
                                    <Table.Td className="w-min">
                                        {institution.institution.service.name}
                                    </Table.Td>
                                    <Table.Td className="w-min">
                                        {institution.email}
                                    </Table.Td>
                                    <Table.Td
                                        textAlign="center"
                                        className="w-48"
                                    >
                                        {institution.email_verified_at ? (
                                            <IconCircleCheckFilled className="text-success" />
                                        ) : (
                                            <IconCircleXFilled className="text-danger" />
                                        )}
                                    </Table.Td>
                                    <Table.Td className="w-50">
                                        {institution.avatar ? (
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
                                                        "/institutions/" +
                                                        institution.username
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
                                                        openToast(
                                                            institution.id,
                                                            institution.name
                                                        )
                                                    }
                                                >
                                                    <CheckCheck
                                                        size={18}
                                                        className={`mr-2`}
                                                    />
                                                    Verifikasi KTP
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        openDeleteToast(
                                                            institution.id,
                                                            institution.name
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

                {institutions.length > 0 && (
                    <div className="flex w-full justify-between items-center">
                        <p className="text-sm text-primary mt-10">
                            Total Instansi:{" "}
                            <span className="font-bold">
                                {totalInstitution}
                            </span>
                        </p>
                        <Pagination
                            links={paginationLinks}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                )}
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
                        onClick={() => handleTrash(institutionId)}
                    >
                        Yes
                    </Button>
                </div>
            </Toast>
        </>
    );
}
