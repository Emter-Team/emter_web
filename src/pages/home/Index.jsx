import NavbarHome from "@/components/fragment/home/navbar";
import React, { useEffect } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import ContainerHome from "@/components/ui/containerHome";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AOS from "aos";
import "aos/dist/aos.css";
import { Label } from "@/components/ui/label";

export default function Index() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div className="home overflow-hidden">
            <div className="relative overflow-hidden">
                <div className="fixed z-[999] top-0 w-full py-2 bg-danger text-center text-white text-xs md:text-base">
                    Inovasi Vokasi untuk Tren Informatika Masa Depan
                </div>
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white to-transparent opacity-100 animate-shine"></div>
                </div>
            </div>

            <NavbarHome />
            {/* Jumbotron */}
            <div
                id="tentangkami"
                className="h-1/3 pt-36 w-full flex items-start justify-between py-12 pb-24 bg-dots-pattern"
            >
                <ContainerHome className="flex-col md:flex-row">
                    <div className="space-y-3 w-full md:w-1/2 mt-14 order-2 md:order-1">
                        <h2
                            className="text-5xl text-center md:text-start md:text-8xl font-bold tracking-wider text-danger"
                            data-aos="fade-right"
                        >
                            Emergency Center
                        </h2>
                        <p
                            className="text-lg text-center md:text-start text-secondary/80 pt-4"
                            data-aos="fade-right"
                        >
                            Emter (Emergency Center) adalah aplikasi
                            terintegrasi yang memungkinkan pemanggilan akses
                            cepat ke layanan darurat seperti Pemadam Kebakaran,
                            Ambulans, Polisi dan Badan SAR melalui satu pintu
                            masuk
                        </p>
                        {/* <div className="flex gap-x-4 pt-4">
                            <a
                                href="#hubungi"
                                className="text-primary border rounded-md border-primary/50 p-2 px-3 flex items-center gap-x-2"
                            >
                                Kontak Kami
                            </a>
                            <a
                                href="#tujuan"
                                className="bg-danger rounded-md p-2 px-3 flex items-center text-white gap-x-2"
                            >
                                Tujuan Kami{" "}
                                <ArrowRightCircle
                                    alignmentBaseline="true"
                                    className="strok-1"
                                ></ArrowRightCircle>
                            </a>
                        </div> */}
                        <div className="flex justify-center md:justify-start pt-4 items-center gap-x-3">
                            <Button data-aos="flip-right" variant="secondary">
                                Cepat
                            </Button>
                            <Button data-aos="flip-right" variant="secondary">
                                Baik
                            </Button>
                            <Button data-aos="flip-right" variant="secondary">
                                Tepat
                            </Button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center md:justify-end">
                        <img
                            loading="lazy"
                            src="/images/app/emter_only.webp"
                            width="90%"
                            alt="Emter (Emergency Center)"
                            data-aos="zoom-in"
                            data-aos-duration="1000"
                        />
                    </div>
                </ContainerHome>
            </div>

            {/* Tagline */}
            <ContainerHome className="mb-24 pt-12">
                <div
                    className="flex justify-center w-full -mt-32 z-[98]"
                    data-aos="fade-up"
                    data-aos-anchor-placement="top-bottom"
                >
                    <div className="w-full p-10 shadow text-center rounded-md text-danger text-3xl md:text-5xl bg-white">
                        <h3>
                            Mengubah{" "}
                            <span className="font-bold">Layanan Darurat</span>{" "}
                            untuk <span className="font-bold">Masyarakat </span>{" "}
                            agar lebih <span className="font-bold">cepat</span>
                            <span className="font-bold">, baik </span> dan
                            <span className="font-bold"> tepat</span>
                        </h3>
                    </div>
                </div>
            </ContainerHome>

            {/* Tujuan */}
            <section id="tujuan" className="pt-28">
                <ContainerHome>
                    <div
                        className="flex flex-col md:flex-row items-center w-full mb-12 gap-x-24"
                        data-aos="fade-up-right"
                    >
                        <div className="w-full md:w-1/2 flex justify-start md:justify-center">
                            <img
                                src="/images/homepage/emter_web_phone.webp"
                                width="90%"
                                alt=""
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="mb-4 mt-12">
                                <h3
                                    className="text-center md:text-start text-3xl md:text-5xl font-semibold text-primary"
                                    data-aos="fade-up-left"
                                >
                                    Tujuan utama yang kami prioritaskan
                                </h3>
                                <p
                                    className="text-secondary text-center md:text-start mt-2 font-light"
                                    data-aos="fade-up-left"
                                >
                                    Berikut adalah tujuan dari Aplikasi Emter
                                </p>
                            </div>
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full text-primary"
                                data-aos="fade-up-left"
                            >
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-start text-lg md:text-xl text-secondary/80">
                                        Membantu masyarakat
                                    </AccordionTrigger>
                                    <AccordionContent className="text-base font-light text-secondary">
                                        Membantu masyarakat mempercepat dan
                                        mempermudah proses pemanggilan layanan
                                        darurat menggunakan Smart System.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="text-start text-lg md:text-xl text-secondary/80">
                                        Meningkatkan akses layanan darurat
                                    </AccordionTrigger>
                                    <AccordionContent className="text-base font-light text-secondary">
                                        Meningkatkan akses layanan darurat
                                        dengan satu platform yang memfasilitasi
                                        akses cepat dan terkoordinasi bagi
                                        masyarakat ke instansi.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="text-start text-lg md:text-xl text-secondary/80">
                                        Memberikan informasi
                                    </AccordionTrigger>
                                    <AccordionContent className="text-base font-light text-secondary">
                                        Memberikan informasi terkait instansi
                                        dan juga kejadian yang ada di dalam kota
                                        Lhokseumawe.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4">
                                    <AccordionTrigger className="text-start text-lg md:text-xl text-secondary/80">
                                        Meningkatkan koordinasi
                                    </AccordionTrigger>
                                    <AccordionContent className="text-base font-light text-secondary">
                                        Meningkatkan koordinasi yang lebih baik
                                        antara berbagai layanan darurat dengan
                                        masyarakat.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </ContainerHome>
            </section>

            {/* Fitur */}
            <section id="fitur" className="pt-28">
                <ContainerHome className="mb-12">
                    <div
                        className="mb-24 w-full flex-col md:flex-row flex items-center justify-center"
                        data-aos="zoom-out"
                    >
                        <div className="w-full md:w-2/3 order-2 md:order-1">
                            <div className="mb-4 mt-12">
                                <h3 className="text-3xl md:text-5xl text-center md:text-start font-semibold text-primary">
                                    Fitur yang kami berikan <br /> kepada Anda
                                </h3>
                                <p className="text-secondary text-center md:text-start mt-2 font-light">
                                    Berikut adalah fitur unggulan dari Aplikasi
                                    Emter
                                </p>
                            </div>
                            <div className="flex flex-col md:flex-row items-start justify-start gap-2 w-full mb-8 text-primary">
                                <div className="w-full md:w-1/2">
                                    <div className="flex items-center gap-x-4 py-4">
                                        <CheckCircle className="text-success" />{" "}
                                        Ease to call
                                    </div>
                                    <div className="flex items-center gap-x-4 py-4">
                                        <CheckCircle className="text-success" />{" "}
                                        Tracking Perjalanan
                                    </div>
                                    <div className="flex items-center gap-x-4 py-4">
                                        <CheckCircle className="text-success" />{" "}
                                        Pencarian Instansi Terdekat
                                    </div>
                                    <div className="flex items-center gap-x-4 py-4">
                                        <CheckCircle className="text-success" />{" "}
                                        Pembaruan Status
                                    </div>
                                    <div className="flex items-center gap-x-4 py-4">
                                        <CheckCircle className="text-success" />{" "}
                                        Informasi Lalu Lintas
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <div className="flex items-center gap-x-4 py-4">
                                        <CheckCircle className="text-success" />{" "}
                                        Persebaran Kejadian
                                    </div>
                                    <div className="flex items-center gap-x-4 py-4">
                                        <CheckCircle className="text-success" />{" "}
                                        Notifikasi Real-Time
                                    </div>
                                    <div className="flex items-center gap-x-4 py-4">
                                        <CheckCircle className="text-success" />{" "}
                                        Aksesibilitas Tinggi
                                    </div>
                                    <div className="flex items-center gap-x-4 py-4">
                                        <CheckCircle className="text-success" />{" "}
                                        Membagi Lokasi
                                    </div>
                                    <div className="flex items-center gap-x-4 py-4">
                                        <CheckCircle className="text-success" />{" "}
                                        Pembaruan Petunjuk
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 order-1 flex justify-center md:justify-end md:order-2">
                            <img
                                loading="lazi"
                                src="/images/homepage/mobile_ui.webp"
                                width="90%"
                                alt=""
                                data-aos="zoom-in"
                            />
                        </div>
                    </div>
                </ContainerHome>
            </section>

            {/* Teknologi */}
            <section id="teknologi" className="pt-28 pb-12">
                <div className="w-full flex flex-col items-center bg-danger/20 text-white py-12">
                    <div className="flex justify-center text-center flex-col">
                        <h5 className="text-2xl text-primary text-center font-semibold">
                            Teknologi yang digunakan untuk membangun Emter
                        </h5>
                        <p className="text-center mb-12 text-secondary/80 font-light">
                            Emter dibangun dengan skalabilitas dan juga penerapa
                            yang baik
                        </p>
                        <div className="absolute inset-0 w-full h-full overflow-hidden">
                            <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white to-transparent opacity-100 animate-shine"></div>
                        </div>
                    </div>
                    <div className="w-3/4 flex items-center justify-evenly px-24">
                        <img
                            className="w-24"
                            src="images/homepage/laravel.webp"
                            alt=""
                            data-aos="flip-left"
                        />
                        <img
                            className="w-20"
                            src="images/homepage/flutter.webp"
                            alt=""
                            data-aos="flip-left"
                        />
                        <img
                            className="w-24"
                            src="images/homepage/reactjs.webp"
                            alt=""
                            data-aos="flip-left"
                        />
                        <img
                            className="w-24"
                            src="images/homepage/azure.webp"
                            alt=""
                            data-aos="flip-left"
                        />
                    </div>
                </div>
            </section>

            {/* Hubungi Kami */}
            <section id="hubungi" className="pt-28">
                <ContainerHome>
                    <div className="w-full mb-24 flex flex-col gap-x-8 md:flex-row justify-between items-start">
                        <div className="w-full md:w-1/2 order-2 md:order-1 flex flex-col md:flex-col">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.894960356452!2d97.15579137484612!3d5.1206249948564615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304777a35c813bbf%3A0xfac9e2831347f07f!2sPoliteknik%20Negeri%20Lhokseumawe!5e0!3m2!1sid!2sid!4v1719515929195!5m2!1sid!2sid"
                                className="w-full rounded-lg"
                                height={450}
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <div className="w-full md:w-1/2 order-1 md:order-2">
                            <div className="mb-4">
                                <h3 className="text-3xl md:text-5xl text-center md:text-start font-semibold text-primary">
                                    Kontak Kami
                                </h3>
                                <p className="text-secondary text-center md:text-start mt-2 font-light">
                                    Jika kamu ragu, bingung atau ingin bertanya,
                                    silahkan kirimkan!
                                </p>
                            </div>
                            <form>
                                <div className="mt-4">
                                    <Label htmlFor="name">Nama</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        autoComplete="name"
                                    />
                                    {/* {error.name && (
                                            <Error>{error.name[0]}</Error>
                                        )} */}
                                </div>
                                <div className="mt-4">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="text"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </div>

                                <div className="mt-4">
                                    <Label htmlFor="description">
                                        Deskripsi
                                    </Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="flex items-center mb-20 md:mb-0 justify-end mt-4">
                                    <Button type="submit">Simpan</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </ContainerHome>
            </section>

            {/* Footer */}
            <footer className="flex justify-between w-full bg-dots-pattern">
                <ContainerHome className="mb-12 md:mb-24 px-0 w-full">
                    <div className="flex flex flex-col md:flex-row items-start justify-end w-full">
                        <div className="w-full md:w-1/3 flex flex-col items-start space-y-4 order-2 md:order-1">
                            <img
                                src="/images/app/emter.webp"
                                alt=""
                                className="w-48"
                            />
                            <p className="text font-light text-start text-secondary">
                                Mengubah Layanan Darurat untuk Masyarakat agar
                                lebih cepat, baik dan tepat
                            </p>
                            <p className="font-light text-secondary mt-4">
                                &copy; {new Date().getFullYear()} Emergency
                                Center - All Right Reserved{" "}
                            </p>
                        </div>
                        <div className="w-full md:w-2/3 md:pt-0 flex items-end justify-end order-1 md:order-2 mb-8">
                            <div className="w-full flex flex-col justify-end">
                                <p className="text-start text-secondary mb-3 font-light md:text-end">
                                    Dibuat oleh pengembang yang ahli dalam
                                    bidangnya
                                </p>
                                <p className="text-start text-lg font-semibold text-primary md:text-end">
                                    Muhammad Reza Zulman, SST., M.Sc (Mentor)
                                </p>
                                <p className="text-lg text-primary flex flex-col gap-x-4 justify-start md:justify-end font-medium text-start md:text-end">
                                    <p>Rachel Ardana Putra Ginting</p>
                                    <p>Muhammad Kholis</p>
                                    <p>Dinda Fitria Indriana</p>
                                </p>
                            </div>
                        </div>
                    </div>
                </ContainerHome>
            </footer>
        </div>
    );
}
