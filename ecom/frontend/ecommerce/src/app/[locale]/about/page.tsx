import { FC } from "react";

const page: FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <section className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">About Us</h1>
          <p className="mx-auto max-w-3xl text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </section>

        <section className="flex justify-center">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-sm">
            <img
              src="/images/teammember.png"
              alt="Sujit Ram Dhakal"
              className="mx-auto mb-4 w-40 rounded-full"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              Sujit Ram Dhakal
            </h2>
            <p className="text-gray-500">Developer</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default page;
