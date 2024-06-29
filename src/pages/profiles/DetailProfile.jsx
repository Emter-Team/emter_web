import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "@/services/axios";
import Loading from "@/components/ui/loading";
import { formatDate } from "@/lib/dateUtils";
import SidebarProfile from "@/components/fragment/sidebar/sidebarProfile";
import { Mail, MapPin } from "lucide-react";
import Table from "@/components/fragment/table";

export default function DetailProfile() {
    const { id } = useParams(); // mengambil id dari URL
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDetailProfile();
    }, []);

    const getDetailProfile = async () => {
        try {
            setLoading(true);
            const { data } = await http.get(`/admin/profiles/${id}`);
            setTimeout(() => {
                setLoading(false);
                setProfile(data.data);
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

    if (!profile) {
        return <div>Profile data not found.</div>;
    }

    return (
        <>
            <SidebarProfile user={profile} />
            <div className="w-full mt-10 md:mt-20 p-0 md:p-4 md:w-10/12 h-screen">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/4">
                        <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="rounded-lg w-full"
                        />
                    </div>
                    <div className="w-full md:w-3/4">
                        <div className="space-y-3">
                            <p>{formatDate(profile.created_at)}</p>
                            <h3 className="text-xl md:text-3xl font-semibold">
                                {profile.name}
                            </h3>
                            <span className="text-primary">
                                {profile.username}
                            </span>
                            <div className="py-2">
                                <Table className="border-none w-1/2 text-[16px]">
                                    <tr className="border-none">
                                        <th className="px-0 py-2 flex gap-x-2 items-center">
                                            <Mail />
                                            Email
                                        </th>
                                        <td className="py-2">
                                            : {profile.email}
                                        </td>
                                    </tr>
                                    <tr className="border-none">
                                        <th className="px-0 py-2 flex gap-x-2 items-center">
                                            <MapPin />
                                            Alamat
                                        </th>
                                        <td className="py-2">
                                            :{" "}
                                            {profile.address !== null ? (
                                                profile.address
                                            ) : (
                                                <div>
                                                    Belum memberikan alamat
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
