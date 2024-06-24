import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "lucide-react";
import { Fragment } from "react";

export default function Toast({ isToast, name, onClose, title, children }) {
    return (
        <>
            <Transition appear show={isToast} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                                    className={`w-full max-w-lg transform overflow-hidden rounded-lg bg-white px-6 py-4 text-left align-middle shadow-xl transition-all`}
                                >
                                    <Dialog.Title
                                        as="h3"
                                        className="text-start text-primary leading-6 mb-5 mt-2 text-primary"
                                    >
                                        <p className="font-medium text-lg mb-2">
                                            {name}
                                        </p>

                                        <p className="font-normal text-primary">
                                            {name
                                                ? `Tindakan ini akan memulai proses verifikasi akun. Apakah Anda ingin melanjutkan?`
                                                : `Tindakan ini akan memulai proses menghapus akun. Apakah Anda ingin menghapus? ${title}?`}{" "}
                                        </p>
                                    </Dialog.Title>
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
