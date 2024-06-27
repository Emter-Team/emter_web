// src/dateUtils/index.js
import { format } from "date-fns";

const idLocale = {
    localize: {
        day: (n) => {
            const days = [
                "Minggu",
                "Senin",
                "Selasa",
                "Rabu",
                "Kamis",
                "Jumat",
                "Sabtu",
            ];
            return days[n];
        },
        month: (n) => {
            const months = [
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
            ];
            return months[n];
        },
    },
};

export const formatDate = (dateStr) => {
    return format(new Date(dateStr), "EEEE, dd MMMM yyyy", {
        locale: idLocale,
    });
};
