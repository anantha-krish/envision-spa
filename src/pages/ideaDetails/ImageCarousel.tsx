import { useCallback, useEffect, useRef, useState } from "react";
import { IdeaDetailEditableComponentProps } from ".";
import { ConfirmationPopup } from "../../components/ConfirmPopup";
import { FormButton } from "../../components/FormButton";
import { IdeaFileInputUploader } from "../../components/IdeaFileInputUploader";

import toast from "react-hot-toast";
import {
  deleteAttachementsApi,
  getAllAttachementsApi,
  uploadNewAttachementsApi,
} from "../../features/idea/ideaApi";
import { S3File } from "../../types/models";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const ImageCarousel: React.FC<IdeaDetailEditableComponentProps> = ({
  isEditMode,
  ideaId,
}) => {
  const confirmRef = useRef<null | HTMLDialogElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [deletedFiles, setDeletedFiles] = useState<S3File[]>([]);
  const [images, setImages] = useState<S3File[]>([]);
  const recipients = useSelector((state: RootState) => state.idea.recipients);

  const handleNewFileUpload = async () => {
    const formData = new FormData();
    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file: File) => formData.append("files", file));
    }
    await uploadNewAttachementsApi(+ideaId, formData, recipients, isEditMode);
    toast.success(`New files uploaded successfully `);
  };

  const handleFileModifications = async () => {
    try {
      if (isDirty) {
        if (deletedFiles.length > 0) {
          await deleteAttachementsApi(deletedFiles.map((file) => file.key));
        }
        if (selectedFiles.length > 0) {
          await handleNewFileUpload();
        }
        onRefresh();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const isDirty = selectedFiles.length > 0 || deletedFiles.length > 0;

  const handleAttemptFileModifications = () => {
    if (isDirty) {
      confirmRef.current?.showModal();
    }
  };

  const handleUIDelete = (index: number) => {
    const updatedImages = [...images];
    setDeletedFiles([...deletedFiles, updatedImages[index]]);
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const onRefresh = useCallback(async () => {
    const s3Files = await getAllAttachementsApi(+ideaId);
    setImages(s3Files);
    setSelectedFiles([]);
    setDeletedFiles([]);
  }, [ideaId]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="flex space-x-4 p-4">
          {images.map((image, index) => (
            <div key={image.key} className="relative flex-shrink-0 group">
              <img
                src={image.url}
                className="w-50 h-50 object-cover rounded-lg shadow "
              />
              {isEditMode && (
                <FormButton
                  className={
                    "absolute hidden cursor-pointer top-1 right-1 btn-xs px-1 py-0.5 text-xs group-hover:inline-block rounded"
                  }
                  color="error"
                  onClick={() => handleUIDelete(index)}
                  label="X"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {isEditMode && (
        <div className="w-full">
          <div className="flex space-x-4 p-4 pb-0 items-center">
            <IdeaFileInputUploader setSelectedFiles={setSelectedFiles} />
            {isDirty && (
              <>
                <FormButton
                  label="Save"
                  color="primary"
                  type="button"
                  onClick={handleAttemptFileModifications}
                />
                <FormButton
                  label="Cancel"
                  type="button"
                  color="error"
                  onClick={onRefresh}
                />
              </>
            )}
          </div>
        </div>
      )}
      <ConfirmationPopup
        dialogRef={confirmRef}
        Message={() => "Are you sure about the attachement modifications? "}
        onConfirm={() => {
          confirmRef.current?.close();
          handleFileModifications();
          onRefresh();
        }}
        onCancel={() => {
          confirmRef.current?.close();
          onRefresh();
        }}
      />
    </>
  );
};
