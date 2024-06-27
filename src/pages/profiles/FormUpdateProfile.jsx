import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "@/services/axios";
import Loading from "@/components/ui/loading";
import { formatDate } from "@/lib/dateUtils";
import { IconMapPin2 } from "@tabler/icons-react";
import SidebarProfile from "@/components/fragment/sidebar/sidebarProfile";

export default function FormUpdateProfile() {
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
                    <div>
                        <img
                            src="/images/notfound/notfound.jpg"
                            className="rounded-lg w-full"
                            alt=""
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="space-y-3">
                            <p>{formatDate(profile.created_at)}</p>
                            <h3 className="text-xl md:text-3xl font-semibold">
                                {profile.name}
                            </h3>
                            <span className="text-primary">
                                {profile.username}
                            </span>
                            <div className="py-2">
                                {profile.address == null ? (
                                    <div className="flex items-center gap-x-2 text-danger">
                                        <IconMapPin2 className="text-primary" />{" "}
                                        Belum memberikan alamat
                                    </div>
                                ) : (
                                    <div className="py-2">
                                        {profile.address}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
