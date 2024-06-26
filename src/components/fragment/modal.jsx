import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { Fragment } from "react";

export default function Modal({
    isOpen,
    onClose,
    size,
    title,
    children,
    type,
}) {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-primary bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className={`w-full sm:w-${size} bg-white absolute z-10 transform rounded p-6 text-left align-middle shadow-xl transition-all`}
                                >
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg text-primary font-medium leading-6 mt-4 text-primary"
                                    >
                                        {`${type === "rincian" ? "" : "Form"}`}{" "}
                                        {type === "create"
                                            ? "Tambah"
                                            : type === "delete"
                                            ? "Hapus"
                                            : type === "edit"
                                            ? "Ubah"
                                            : type === "add"
                                            ? "Tambah"
                                            : "Rincian"}{" "}
                                        {title}
                                    </Dialog.Title>
                                    <button
                                        className="absolute right-2 top-2 py-2 px-2 bg-transparent text-fifth"
                                        onClick={onClose}
                                    >
                                        <X />
                                    </button>
                                    <div className="mt-2">{children}</div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
