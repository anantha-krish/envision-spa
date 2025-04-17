import { CheckIcon, XCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { Toaster, resolveValue } from "react-hot-toast";

const CustomToast = () => {
  return (
    <Toaster position="top-right">
      {(t) => (
        <div
          className={clsx(
            "shadow-sm p-3 absolute top-15 rounded-2xl flex items-center space-x-3",

            {
              "ring-1 ring-green-500 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200":
                t.type === "success",
            },
            {
              "ring-1 ring-red-500 bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200":
                t.type === "error",
            }
          )}
        >
          {/* Icon */}
          <span className="flex-shrink-0">
            {t.type === "success" ? (
              <CheckIcon className="w-5 h-5 text-green-500 dark:text-green-200" />
            ) : (
              <XCircleIcon className="w-5 h-5 text-red-500 dark:text-red-200" />
            )}
          </span>
          {/* Message */}
          <div>{resolveValue(t.message, t)}</div>
        </div>
      )}
    </Toaster>
  );
};

export default CustomToast;
