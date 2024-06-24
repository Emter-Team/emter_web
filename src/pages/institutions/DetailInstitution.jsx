import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "@/services/axios"; // pastikan Anda mengimpor axios service dengan benar
import Loading from "@/components/ui/loading"; // pastikan Anda memiliki komponen Loading
import { formatDate } from "@/lib/dateUtils";
import Table from "@/components/fragment/table";
import { Calendar, Files, Mail, Phone } from "lucide-react";

export default function DetailInstitution() {
    const { id } = useParams(); // mengambil id dari URL
    const [institution, setInstitution] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDetailResident();
    }, []);

    const getDetailResident = async () => {
        try {
            setLoading(true);
            const { data } = await http.get(`/admin/institutions/${id}`);
            setTimeout(() => {
                setLoading(false);
                setInstitution(data.data);
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

    if (!institution) {
        return <div>Institution data not found.</div>;
    }

    return (
        <div className="flex flex-col md:flex-row gap-6">
            <div>
                <img
                    src="/images/notfound/notfound.jpg"
                    className="rounded-lg w-full"
                    alt=""
                />
            </div>
            <div className="w-full md:w-1/2">
                <div className="space-y-3 mb-4">
                    <p>{formatDate(institution.created_at)}</p>
                    <h3 className="text-xl md:text-3xl font-semibold">
                        {institution.name}
                    </h3>
                    <span className="text-primary">{institution.username}</span>
                </div>
                <span className="px-3 py-1.5 bg-success rounded-md text-white">
                    {institution.institution.service.name}
                </span>
                <Table className="border-none w-1/2 text-[16px] overflow-x-hidden">
                    <tr className="border-none">
                        <th className="px-0 py-2 flex gap-x-2 items-center">
                            <Mail />
                            Email
                        </th>
                        <td className="py-2">: {institution.email}</td>
                    </tr>
                    <tr className="border-none">
                        <th className="px-0 py-2 flex gap-x-2 items-center">
                            <Calendar />
                            Garis Bujur
                        </th>
                        <td className="py-2">
                            : {institution.institution.longitude}
                        </td>
                    </tr>
                    <tr className="border-none">
                        <th className="px-0 py-2 flex gap-x-2 items-center">
                            <Calendar />
                            Garis Lintang
                        </th>
                        <td className="py-2">
                            : {institution.institution.latitude}
                        </td>
                    </tr>
                    <tr className="border-none">
                        <th className="px-0 py-2 flex gap-x-2 items-center">
                            <Phone />
                            Alamat
                        </th>
                        <td className="py-2">: {institution.address}</td>
                    </tr>
                    <tr className="border-none"></tr>
                </Table>
                <td className="py-2 text-secondary">
                    {institution.institution.description} Lorem ipsum dolor sit,
                    amet consectetur adipisicing elit. Necessitatibus eum
                    laborum laboriosam deleniti repudiandae suscipit, fugit
                    culpa nihil quaerat natus perferendis, ullam optio?
                    Accusamus quae, reprehenderit laborum ut distinctio
                    explicabo.
                </td>
            </div>
        </div>
    );
}
