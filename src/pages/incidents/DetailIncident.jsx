import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "@/services/axios";
import Loading from "@/components/ui/loading";
import { formatDate } from "@/lib/dateUtils";
import { ChevronRight, MapPin, Timer } from "lucide-react";
import NavLink from "@/components/fragment/navlink";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { IconWorldLatitude, IconWorldLongitude } from "@tabler/icons-react";

export default function DetailIncidents() {
    const { id } = useParams();
    const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi
    const [incident, setIncident] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDetailIncident(id);
    }, [id]);

    const getDetailIncident = async (incidentId) => {
        try {
            setLoading(true);
            const { data } = await http.get(`/admin/incidents/${incidentId}`);
            setTimeout(() => {
                setLoading(false);
                setIncident(data.data);
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

    if (!incident) {
        return <div>Incident data not found.</div>;
    }

    return (
        <>
            <div className="w-full mt-10 md:mt-20 p-0 md:p-4 h-screen">
                <div className="w-full">
                    <div className="space-y-3">
                        <p className="text-secondary">
                            {formatDate(incident.reported_at)}
                        </p>
                        <h3 className="text-xl md:text-3xl font-semibold text-primary">
                            {incident.incident_type.name}
                        </h3>
                        <span className="text-primary flex gap-x-2">
                            <IconWorldLatitude
                                absoluteStrokeWidth="true"
                                className="text-primary"
                            />
                            {incident.latitude}
                        </span>
                        <span className="text-primary flex gap-x-2">
                            <IconWorldLongitude
                                absoluteStrokeWidth="true"
                                className="text-primary"
                            />
                            {incident.longitude}
                        </span>
                        <div className="pt-4 space-y-2">
                            <span className="text-primary flex gap-x-2">
                                <Timer
                                    absoluteStrokeWidth="true"
                                    className="text-primary"
                                />
                                {incident.reported_at}
                            </span>
                            <span className="text-primary flex gap-x-2">
                                <Timer
                                    absoluteStrokeWidth="true"
                                    className="text-primary"
                                />
                                {incident.handle_at}
                            </span>
                            <span className="text-primary flex gap-x-2">
                                <Timer
                                    absoluteStrokeWidth="true"
                                    className="text-primary"
                                />
                                {incident.completed_at !== null
                                    ? incident.completed_at
                                    : "Tidak selesai"}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-x-3 items-center mt-8 mb-4">
                        <div>
                            {incident.institution.user.avatar ? (
                                <img
                                    src={incident.institution.user.avatar}
                                    alt="Avatar"
                                />
                            ) : (
                                <img
                                    width="50"
                                    className="rounded"
                                    src="/images/notfound/notfound.jpg"
                                    alt="Not Found"
                                />
                            )}
                        </div>
                        <div>
                            <h6 className="font-semibold text-primary">
                                {incident.residents.user.name}
                            </h6>
                            <p className="text-secondary text-sm">
                                {incident.residents.user.address}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-x-8 flex-col md:flex-row">
                    <div className="w-full md:w-7/12 mb-12">
                        <div>
                            {incident.picture !== null ? (
                                <img
                                    width="50"
                                    className="rounded"
                                    src={incident.picture}
                                    alt={incident.name}
                                />
                            ) : (
                                <img
                                    width="50"
                                    className="rounded"
                                    src="/images/notfound/notfound.jpg"
                                    alt="Gambar tidak ditemukan"
                                />
                            )}
                        </div>
                        <div className="font-light my-6 text-secondary">
                            {incident.content}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
