import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "@/services/axios";
import Loading from "@/components/ui/loading";
import { formatDate } from "@/lib/dateUtils";
import Table from "@/components/fragment/table";
import { Building2, Calendar, Mail, Phone } from "lucide-react";
import SidebarUser from "@/components/fragment/sidebar/sidebarUser";

export default function DetailOfficersInstitution() {
    const { id } = useParams(); // mengambil id dari URL
    const [officer, setOfficer] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDetailOfficer();
    }, []);

    const getDetailOfficer = async () => {
        try {
            setLoading(true);
            const { data } = await http.get(`/admin/officers/${id}`);
            setTimeout(() => {
                setLoading(false);
                setOfficer(data.data);
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

    if (!officer) {
        return <div>Officer data not found.</div>;
    }

    return (
        <>
            <SidebarUser />
            <div className="w-full mt-10 md:mt-20 p-0 md:p-4 md:w-10/12 h-screen">
                <div className="flex flex-col md:flex-row gap-6">
                    <div>
                        <img
                            src={officer.picture}
                            alt={officer.name}
                            className="rounded-lg w-full"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="space-y-3">
                            <p>{formatDate(officer.created_at)}</p>
                            <h3 className="text-xl md:text-3xl font-semibold">
                                {officer.name}
                            </h3>
                            <span className="text-primary">
                                {officer.username}
                            </span>
                        </div>
                        <Table className="border-none w-1/2 text-[16px]">
                            <tr className="border-none">
                                <th className="px-0 py-2 flex gap-x-2 items-center">
                                    <Building2 />
                                    Instansi
                                </th>
                                <td className="py-2">
                                    : {officer.officer.institution.user.name}
                                </td>
                            </tr>
                            <tr className="border-none">
                                <th className="px-0 py-2 flex gap-x-2 items-center">
                                    <Mail />
                                    Email
                                </th>
                                <td className="py-2">: {officer.email}</td>
                            </tr>
                            <tr className="border-none">
                                <th className="px-0 py-2 flex gap-x-2 items-center">
                                    <Calendar />
                                    Jabatan
                                </th>
                                <td className="py-2">
                                    : {officer.officer.position}
                                </td>
                            </tr>
                            <tr className="border-none">
                                <th className="px-0 py-2 flex gap-x-2 items-center">
                                    <Phone />
                                    Alamat
                                </th>
                                <td className="py-2">: {officer.address}</td>
                            </tr>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}
