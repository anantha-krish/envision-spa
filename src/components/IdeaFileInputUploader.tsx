export const IdeaFileInputUploader = ({
  setSelectedFiles,
}: {
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
  return (
    <div>
      <label
        htmlFor={"file"}
        className="mb-2 px-3 text-sm font-medium text-gray-900 dark:text-white flex justify-between align-bottom"
      >
        <span>Upload Attachments</span>
      </label>

      <input
        name="file"
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
          }
        }}
        multiple
        className={"file-input file-input-primary w-full"}
        required
      />

      <div className="mt-1 min-h-6"></div>
    </div>
  );
};
