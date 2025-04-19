import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ConfirmationPopup = ({
  dialogRef,
  onConfirm,
  onCancel,
  Message,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  onConfirm: VoidFunction;
  onCancel: VoidFunction;
  Message: React.ComponentType;
}) => (
  <dialog ref={dialogRef} className="modal">
    <div className="modal-box  bg-gray-100 dark:bg-gray-900 max-w-xl p-6">
      <strong className="font-semibold">
        <p className=" text-center text-lg">
          <ExclamationTriangleIcon className="h-20 mb-2 inline-block text-yellow-500" />
          <br />
          <Message />
        </p>
      </strong>
      <div className="flex w-full justify-center pt-6 px-10 gap-8">
        <button className="btn btn-error flex-1" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-primary flex-1" onClick={onConfirm}>
          Yes
        </button>
      </div>
    </div>
  </dialog>
);
