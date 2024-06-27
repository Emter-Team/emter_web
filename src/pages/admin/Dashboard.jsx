import { Car, Files, Siren, Users2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import http from "@/services/axios";
import { IconCategory, IconCategory2, IconReport } from "@tabler/icons-react";
import Loading from "@/components/ui/loading";

export default function Dashboard() {
    const [chartData, setChartData] = useState({
        usersChart: [],
        postsChart: [],
        incidentsChart: [],
        vehiclesChart: [],
    });

    const [data, setData] = useState({
        current: {
            users: 0,
            services: 0,
            posts: 0,
            incidents: 0,
            vehicles: 0,
            post_categories: 0,
            incident_types: 0,
        },
        lastMonth: {
            users: 0,
            services: 0,
            posts: 0,
            incidents: 0,
            vehicles: 0,
            post_categories: 0,
            incident_types: 0,
        },
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setTimeout(async () => {
                try {
                    const response = await http.get("/admin/dashboard");
                    const dashboardData = response.data.data;
                    setChartData({
                        usersChart: dashboardData.usersChart,
                        postsChart: dashboardData.postsChart,
                        incidentsChart: dashboardData.incidentsChart,
                        vehiclesChart: dashboardData.vehiclesChart,
                    });
                    setData({
                        current: dashboardData.current,
                        lastMonth: dashboardData.lastMonth,
                    });
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            }, 300);
        };

        fetchData();
    }, []);

    const createChartOptions = (title) => ({
        chart: {
            id: title.toLowerCase(),
            type: "line",
            height: 350,
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        colors: ["#FF5454"],
        title: {
            text: title,
            align: "left",
        },
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        },
        yaxis: {
            min: 0,
        },
    });

    const createChartSeries = (data) => [
        {
            name: "Count",
            data: Array(12)
                .fill(0)
                .map((_, i) => data[i + 1] || 0),
        },
    ];

    const calculateChange = (current, lastMonth) => current - lastMonth;

    if (loading) return <Loading />;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="w-full mt-10 md:mt-20 p-0 md:p-4 h-screen">
            <div className="title w-full">
                <h3 className="text-3xl font-semibold text-primary">Dasbor</h3>
                <p className="text-secondary">
                    Semua statistik yang berhubungan dengan akun anda
                </p>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                <Link className="border border-secondary/50 p-5 rounded-lg">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <p className="text-secondary">Pengguna</p>
                            <Users2 size="20" className="text-secondary" />
                        </div>
                        <h4 className="text-3xl font-semibold leading-none">
                            {data.current.users}
                            <p className="text-xs mt-1.5 text-secondary font-light">
                                {calculateChange(
                                    data.current.users,
                                    data.lastMonth.users
                                )}{" "}
                                dari bulan lalu
                            </p>
                        </h4>
                    </div>
                </Link>
                <div className="border border-secondary/50 p-5 rounded-lg">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <p>Layanan Darurat</p>
                            <Siren size="20" className="text-secondary" />
                        </div>
                        <h4 className="text-3xl font-semibold leading-none">
                            {data.current.services}
                            <p className="text-xs mt-1.5 text-secondary font-light">
                                {calculateChange(
                                    data.current.services,
                                    data.lastMonth.services
                                )}{" "}
                                dari bulan lalu
                            </p>
                        </h4>
                    </div>
                </div>
                <div className="border border-secondary/50 p-5 rounded-lg">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <p>Berita</p>
                            <Files size="20" className="text-secondary" />
                        </div>
                        <h4 className="text-3xl font-semibold leading-none">
                            {data.current.posts}
                            <p className="text-xs mt-1.5 text-secondary font-light">
                                {calculateChange(
                                    data.current.posts,
                                    data.lastMonth.posts
                                )}{" "}
                                dari bulan lalu
                            </p>
                        </h4>
                    </div>
                </div>
                <div className="border border-secondary/50 p-5 rounded-lg">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <p>Laporan Kejadian</p>
                            <IconReport size="20" className="text-secondary" />
                        </div>
                        <h4 className="text-3xl font-semibold leading-none">
                            {data.current.incidents}
                            <p className="text-xs mt-1.5 text-secondary font-light">
                                {calculateChange(
                                    data.current.incidents,
                                    data.lastMonth.incidents
                                )}{" "}
                                dari bulan lalu
                            </p>
                        </h4>
                    </div>
                </div>
                <div className="border border-secondary/50 p-5 rounded-lg">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <p>Kendaraan Darurat</p>
                            <Car size="20" className="text-secondary" />
                        </div>
                        <h4 className="text-3xl font-semibold leading-none">
                            {data.current.vehicles}
                            <p className="text-xs mt-1.5 text-secondary font-light">
                                {calculateChange(
                                    data.current.vehicles,
                                    data.lastMonth.vehicles
                                )}{" "}
                                dari bulan lalu
                            </p>
                        </h4>
                    </div>
                </div>
                <div className="border border-secondary/50 p-5 rounded-lg">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <p>Kategori Berita</p>
                            <IconCategory
                                size="20"
                                className="text-secondary"
                            />
                        </div>
                        <h4 className="text-3xl font-semibold leading-none">
                            {data.current.post_categories}
                            <p className="text-xs mt-1.5 text-secondary font-light">
                                {calculateChange(
                                    data.current.post_categories,
                                    data.lastMonth.post_categories
                                )}{" "}
                                dari bulan lalu
                            </p>
                        </h4>
                    </div>
                </div>
                <div className="border border-secondary/50 p-5 rounded-lg">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <p>Jenis Kejadian Darurat</p>
                            <IconCategory2
                                size="20"
                                className="text-secondary"
                            />
                        </div>
                        <h4 className="text-3xl font-semibold leading-none">
                            {data.current.incident_types}
                            <p className="text-xs mt-1.5 text-secondary font-light">
                                {calculateChange(
                                    data.current.incident_types,
                                    data.lastMonth.incident_types
                                )}{" "}
                                dari bulan lalu
                            </p>
                        </h4>
                    </div>
                </div>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
                <div className="border border-secondary/50 p-5 rounded-lg">
                    <ReactApexChart
                        options={createChartOptions("Pengguna")}
                        series={createChartSeries(chartData.usersChart)}
                        type="line"
                        height={350}
                    />
                </div>
                <div className="border border-secondary/50 p-5 rounded-lg">
                    <ReactApexChart
                        options={createChartOptions("Berita")}
                        series={createChartSeries(chartData.postsChart)}
                        type="line"
                        height={350}
                    />
                </div>
                <div className="border border-secondary/50 p-5 rounded-lg">
                    <ReactApexChart
                        options={createChartOptions("Kejadian Darurat")}
                        series={createChartSeries(chartData.incidentsChart)}
                        type="line"
                        height={350}
                    />
                </div>
                <div className="border border-secondary/50 p-5 rounded-lg">
                    <ReactApexChart
                        options={createChartOptions("Kendaraan Darurat")}
                        series={createChartSeries(chartData.vehiclesChart)}
                        type="line"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
}
