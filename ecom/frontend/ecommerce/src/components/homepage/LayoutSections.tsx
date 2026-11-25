export const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="flex flex-col gap-10 md:gap-[60px] w-full px-3.5 md:px-0">
    {children}
  </section>
);

export const HorizontalLine = () => (
  <div className="w-full px-3.5 md:px-0">
    <hr className="border-0.5 border-black border-opacity-30" />
  </div>
);
