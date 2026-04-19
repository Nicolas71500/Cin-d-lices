import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useMediaQuery } from 'react-responsive';

interface DeleteModalProps {
    handleDeleteRecipe: () => void;
    modalIsOpen: boolean;
    setModalIsOpen: (value: boolean) => void;
}
export default function DeleteModal({
    handleDeleteRecipe,
    setModalIsOpen,
    modalIsOpen,
}: DeleteModalProps) {
    const smallDevice = useMediaQuery({ query: '(max-width: 480px)' });

    return (
        <Dialog
            open={modalIsOpen}
            onClose={setModalIsOpen}
            className="relative z-10"
        >
            <DialogBackdrop
                transition
                className="fixed h-100vh inset-0 bg-black bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-skin text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-skin px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b-4 border-double border-skin">
                            <div className="sm:flex sm:flex-col sm:items-center">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center border border-solid border-dark rounded-full bg-skin sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon
                                        aria-hidden="true"
                                        className="h-6 w-6 text-red-600"
                                    />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle
                                        as="h3"
                                        className="text-base font-semibold leading-6 text-gray-900"
                                    >
                                        Supprimer ma recette
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Êtes vous sûr de vouloir supprimer
                                            cette recette? Cette action est
                                            irréversible!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-skin px-4 py-3 flex justify-evenly sm:px-6">
                            <button
                                type="button"
                                onClick={() => setModalIsOpen(false)}
                                // className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-dark shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => {
                                    setModalIsOpen(false);
                                    handleDeleteRecipe();
                                }}
                                // className="mt-3 inline-flex w-full justify-center rounded-md bg-skin px-3 py-2 text-sm font-semibold text-dark shadow-sm ring-1 ring-inset sm:mt-0 sm:w-auto"
                            >
                                {smallDevice
                                    ? ' Supprimer'
                                    : 'Supprimer ma recette'}{' '}
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}
