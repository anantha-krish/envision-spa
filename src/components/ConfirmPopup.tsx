import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ConfirmationPopup = ({
  dialogRef,
  onConfirm,
  onCancel,
  message,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  onConfirm: VoidFunction;
  onCancel: VoidFunction;
  message: string;
}) => (
  <dialog ref={dialogRef} className="modal">
    <div className="modal-box max-w-xl p-6">
      <strong className="font-semibold">
        <p className=" text-center text-lg">
          <ExclamationTriangleIcon className="h-20 mb-2 inline-block text-yellow-500" />
          <br />
          {message}
          <br /> Are you sure you want to close?
        </p>
      </strong>
      <div className="flex w-full justify-center pt-6 px-10 gap-8">
        <button className="btn btn-primary flex-1" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-error flex-1" onClick={onConfirm}>
          Yes, Close
        </button>
      </div>
    </div>
  </dialog>
);
