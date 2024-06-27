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
import SidebarPost from "@/components/fragment/sidebar/sidebarPost";

export default function GetPost() {
    const [posts, setPosts] = useState([]);
    const [postCategories, setPostCategories] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [totalPosts, setTotalPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationLinks, setPaginationLinks] = useState([]);

    const [isDeleteToast, setIsDeleteToast] = useState(false);
    const [institutionId, setPostId] = useState("");

    const [searchTitle, setSearchTitle] = useState("");
    const [institutionFilter, setInstitutionFilter] = useState("");
    const [categoryFilter, setServiceFilter] = useState("");

    function openDeleteToast(institutionId) {
        setIsDeleteToast(true);
        setPostId(institutionId);
    }

    function onCancelDeleteToast() {
        setIsDeleteToast(false);
    }

    useEffect(() => {
        getPosts(currentPage);
        getService();
        getInstitution();
    }, [searchTitle, institutionFilter, categoryFilter, currentPage]);

    const getService = async () => {
        setLoading(true);
        try {
            const response = await http.get("/admin/post_categories");
            setPostCategories(response.data.data.data);
        } catch (error) {
        } finally {
            setLoading(false);
        }
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

    const getPosts = async (page) => {
        setLoading(true);
        const params = {
            title: searchTitle,
            category: categoryFilter,
            institution: institutionFilter,
            page: page,
        };

        // Add a delay of 0.3 seconds before showing loading indicator
        setTimeout(async () => {
            axios.get('/', {
                config: {
                    Au
                }
            })
            try {
                const response = await http.get("/admin/posts", {
                    params,
                });
                setPaginationLinks(response.data.data.meta);
                setPosts(response.data.data.data);
                setTotalPosts(response.data.data.total_posts);
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
                await http.delete(`/admin/posts/${username}`);
                setIsDeleteToast(false);
                getPosts(currentPage);
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
                            Berita
                        </h3>
                        <p className="text-secondary">
                            Daftar semua informasi darurat dari Instansi
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
                            onValueChange={(value) => setServiceFilter(value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Layanan" />
                            </SelectTrigger>
                            <SelectContent>
                                {postCategories.map((post_category, index) => (
                                    <SelectItem
                                        value={post_category.slug}
                                        key={index}
                                    >
                                        {post_category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Input
                            type="search"
                            className="w-48"
                            placeholder="Cari judul..."
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                        />
                    </div>
                </div>

                <div className="w-full">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Judul</Table.Th>
                                <Table.Th>Konten</Table.Th>
                                <Table.Th className="w-12">Gambar</Table.Th>
                                <Table.Th className="w-12 px-2">Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {posts.length > 0 ? (
                                posts.map((post, index) => (
                                    <Table.Tr key={index}>
                                        <Table.Td className="w-5">
                                            {paginationLinks.from + index}
                                        </Table.Td>
                                        <Table.Td className="whitespace-normal">
                                            {post.title}
                                        </Table.Td>
                                        <Table.Td className="whitespace-normal">
                                            {post.content}
                                        </Table.Td>
                                        <Table.Td className="w-50">
                                            {post.avatar ? (
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
                                                            "/posts/" +
                                                            post.slug
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
                                                                post.id,
                                                                post.title
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

                    {posts.length > 0 && (
                        <div className="flex w-full justify-between items-center pb-12">
                            <p className="text-sm text-primary mt-10">
                                Total Berita:{" "}
                                <span className="font-bold">{totalPosts}</span>
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
                title={`Tindakan ini akan memulai proses menghapus berita. Apakah Anda ingin menghapus?`}
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
