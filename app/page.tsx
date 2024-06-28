import LinkGenerateForm from "@/components/form/LinkGenerateForm";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="h-screen max-h-screen bg-blue-min-h-screen flex justify-center items-center">
      <div className="w-[90%] sm:w-auto ">
        <header>
          <Image
            src={"/images/icon.png"}
            className="mx-auto"
            width={64}
            height={64}
            alt="icon"
          />
          <h3 className="text-[18px] text-center sm:text-[24px] font-semibold">
            Welcome to <span className="text-blue-500">URL Sashimi</span>
          </h3>
          <h6 className="text-center text-neutral-500">
            A website for URL shortener
          </h6>
        </header>
        <LinkGenerateForm />
      </div>
    </main>
  );
}
