import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import { toast } from "react-toastify";

export default function GetIncidentsInstitution() {
    const [incidents, setIncidents] = useState([]);
    const [incidentType, setIncidentTypes] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [totalIncidents, setTotalIncidents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationLinks, setPaginationLinks] = useState([]);

    const [isDeleteToast, setIsDeleteToast] = useState(false);

    const [searchName, setSearchName] = useState("");
    const [incidentTypeFilter, setIncidentTypeFilter] = useState("");

    function openDeleteToast(institutionId) {
        setIsDeleteToast(true);
        setPostId(institutionId);
    }

    function onCancelDeleteToast() {
        setIsDeleteToast(false);
    }

    useEffect(() => {
        getIncident(currentPage);
        getIncidentType();
    }, [searchName, incidentTypeFilter, currentPage]);

    const getIncidentType = async () => {
        setLoading(true);
        try {
            const response = await http.get("/admin/incident_types");
            setIncidentTypes(response.data.data.data);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const getIncident = async (page) => {
        setLoading(true);
        const params = {
            name: searchName,
            incident_type: incidentTypeFilter,
            page: page,
        };

        // Add a delay of 0.3 seconds before showing loading indicator
        setTimeout(async () => {
            try {
                const response = await http.get("/institution/incidents", {
                    params,
                });
                setPaginationLinks(response.data.data.meta);
                setIncidents(response.data.data.data);
                setTotalIncidents(response.data.data.total_incidents);
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
                await http.delete(`/institution/incidents/${username}`);
                setIsDeleteToast(false);
                getIncident(currentPage);
                toast.success("Masyarakat Berhasil Dihapus");
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
                <div className="w-full flex flex-col justify-center md:flex-row md:justify-end">
                    <div className="title w-full md:w-1/3">
                        <h3 className="text-3xl font-semibold text-primary">
                            Laporan Kejadian Darurat
                        </h3>
                        <p className="text-secondary">
                            Daftar semua laporan kejadian darurat yang ada dalam
                            Sistem
                        </p>
                    </div>
                    <div className="w-full md:w-2/3 mt-8 md:mt-0 flex justify-end gap-x-4">
                        <Select
                            onValueChange={(value) =>
                                setIncidentTypeFilter(value)
                            }
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Jenis Kejadian" />
                            </SelectTrigger>
                            <SelectContent>
                                {incidentType.map((incident_type, index) => (
                                    <SelectItem
                                        value={incident_type.slug}
                                        key={index}
                                    >
                                        {incident_type.name}
                                    </SelectItem>
                                ))}
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

                <div className="w-full">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Masyarakat</Table.Th>
                                <Table.Th>Instansi</Table.Th>
                                <Table.Th>Jenis Kejadian</Table.Th>
                                <Table.Th
                                    textAlign="center"
                                    className="w-[10%] text-center"
                                >
                                    Status
                                </Table.Th>
                                <Table.Th className="w-12">Gambar</Table.Th>
                                <Table.Th className="w-12 px-2">Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {incidents.length > 0 ? (
                                incidents.map((incident, index) => (
                                    <Table.Tr key={index}>
                                        <Table.Td className="w-5">
                                            {paginationLinks.from + index}
                                        </Table.Td>
                                        <Table.Td className="whitespace-normal">
                                            {incident.residents.user.name}
                                        </Table.Td>
                                        <Table.Td className="whitespace-normal">
                                            {incident.institution.user.name}
                                        </Table.Td>
                                        <Table.Td className="whitespace-normal">
                                            {incident.incident_type.name}
                                        </Table.Td>
                                        <Table.Td
                                            textAlign="center"
                                            className="w-[10%]"
                                        >
                                            {incident.status ? (
                                                <IconCircleCheckFilled className="text-success" />
                                            ) : (
                                                <IconCircleXFilled className="text-danger" />
                                            )}
                                        </Table.Td>
                                        <Table.Td className="w-50">
                                            {incident.picture ? (
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
                                                            "/incidents/" +
                                                            incident.slug
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
                                                                incident.id,
                                                                incident.title
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

                    {incidents.length > 0 && (
                        <div className="flex w-full justify-between items-center pb-12">
                            <p className="text-sm text-primary mt-10">
                                Total Laporan Kejadian Darurat:{" "}
                                <span className="font-bold">
                                    {totalIncidents}
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
                title={`Tindakan ini akan memulai proses menghapus kejadian darurat. Apakah Anda ingin menghapus?`}
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
