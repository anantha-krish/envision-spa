import { useNavigate } from "@tanstack/react-router";
import { FormButton } from "../components/FormButton";

export const PageNotFound = () => {
  const navigate = useNavigate();
  const envisionLogo = new URL("/assets/images/logo.png", import.meta.url).href;
  return (
    <section className="h-full w-full flex flex-col px-20 py-15 justify-center items-center">
      <div className="container text-center gap-8 flex flex-col items-center  text-2xl ">
        <h2 className="flex justify-center items-center gap-2 mb-2 text-6xl font-semibold italic">
          <img
            src={envisionLogo}
            className="h-30 w-auto  text-center inline aspect-square"
          />
          <span className="">4</span>
          <i className="text-red-600 dark:text-red-800 font-bold">0</i>
          <span className=" ">4</span>
          <span className="text-4xl pl-4"> Not Found</span>
        </h2>

        <p>Oops! You seems lost.</p>
        <p>
          <strong className="uppercase">Envision</strong> did not find your
          requested page.
        </p>
        <div />

        <FormButton
          label="Back to Home"
          color="accent"
          onClick={() => navigate({ to: "/" })}
        />
      </div>
    </section>
  );
};
