import React, { useEffect, useState } from "react";
import { Trash2, MoreHorizontal, Pencil } from "lucide-react";
import Table from "@/components/fragment/table";
import { Button } from "@/components/ui/button";
import Toast from "@/components/fragment/toast";
import Loading from "@/components/ui/loading";
import { Input } from "@/components/ui/input";
import http from "@/services/axios";
import Pagination from "@/components/fragment/paginate";
import SidebarSetting from "@/components/fragment/sidebar/sidebarSetting";
import { useNavigate, Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function GetPostCategories() {
    const [post_categories, setPosts] = useState([]);
    const [totalPostCategories, setTotalPostCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationLinks, setPaginationLinks] = useState([]);

    const [isDeleteToast, setIsDeleteToast] = useState(false);
    const [PostCategoriesId, setPostCategoriesId] = useState("");

    const [searchName, setSearchName] = useState("");

    function openDeleteToast(PostCategoriesId, title) {
        setIsDeleteToast(true);
        setPostCategoriesId(PostCategoriesId);
    }

    function onCancelDeleteToast() {
        setIsDeleteToast(false);
    }

    useEffect(() => {
        getPostCategories(currentPage);
    }, [searchName, currentPage]);

    const getPostCategories = async (page) => {
        setLoading(true);
        const params = {
            name: searchName,
            page: page,
        };

        // Add a delay of 0.3 seconds before showing loading indicator
        setTimeout(async () => {
            try {
                const response = await http.get("/admin/post_categories/", {
                    params,
                });
                setPosts(response.data.data.data);
                setPaginationLinks(response.data.data.meta.links);
                setTotalPostCategories(
                    response.data.data.total_post_categories
                );
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
                await http.delete(`/admin/post_categories/${username}`);
                setIsDeleteToast(false);
                getPostCategories(currentPage);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, 300); // 0.3 seconds delay
    };

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("create");
    };

    return (
        <>
            {loading && <Loading />} {/* Show loading indicator */}
            <SidebarSetting />
            <div className="w-full mt-10 md:mt-20 p-0 md:p-4 md:w-10/12 h-screen">
                <div>
                    <div className="w-full flex flex-col justify-center md:flex-row md:justify-end">
                        <div className="title w-full md:w-1/3">
                            <h3 className="text-3xl font-semibold text-primary">
                                Jenis Berita
                            </h3>
                            <p className="text-secondary">
                                Daftar semua jenis informasi darurat yang
                                terdaftar di sistem
                            </p>
                        </div>
                        <div className="w-full md:w-2/3 mt-8 md:mt-0 flex justify-end gap-x-4">
                            <Input
                                type="search"
                                className="w-48"
                                placeholder="Cari nama..."
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                            <Button
                                onClick={handleClick}
                                className="bg-primary"
                            >
                                Tambah Data
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Nama</Table.Th>
                                <Table.Th>Deskripsi</Table.Th>
                                <Table.Th className="w-12 px-2">Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {post_categories.length > 0 ? (
                                post_categories.map((post_category, index) => (
                                    <Table.Tr key={index}>
                                        <Table.Td className="w-5">
                                            {index + 1}
                                        </Table.Td>
                                        <Table.Td className="w-min">
                                            {post_category.name}
                                        </Table.Td>
                                        <Table.Td className="w-min">
                                            {post_category.description}
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
                                                            "/post_categories/" +
                                                            post_category.username
                                                        }
                                                    >
                                                        <DropdownMenuItem className="group:name">
                                                            <Pencil
                                                                size={18}
                                                                className={`mr-2`}
                                                            />
                                                            Ubah
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            openDeleteToast(
                                                                post_category.id,
                                                                post_category.name
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

                    {post_categories.length > 0 && (
                        <div className="flex w-full justify-between items-center">
                            <p className="text-sm text-primary mt-10">
                                Total Jenis Berita:{" "}
                                <span className="font-bold">
                                    {totalPostCategories}
                                </span>
                            </p>
                            <Pagination
                                links={paginationLinks}
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
                        onClick={() => handleTrash(PostCategoriesId)}
                    >
                        Yes
                    </Button>
                </div>
            </Toast>
        </>
    );
}
