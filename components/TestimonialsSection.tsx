export default function TestimonialsSection() {
  return (
    <section className="w-full bg-bb-mid py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Heading */}
        <h2 className="mb-12 text-center text-2xl font-bold text-white md:text-3xl lg:text-4xl">
          Thousands of people talk about us
        </h2>

        {/* Testimonial cards grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {/* Card 1 — featured */}
          <div className="flex min-h-[200px] items-center justify-center rounded-xl bg-white p-5 ring-2 ring-bb-lime md:min-h-[250px] md:p-6">
            <div className="h-full w-full rounded-lg bg-gray-100" />
          </div>

          {/* Card 2 */}
          <div className="flex min-h-[200px] items-center justify-center rounded-xl bg-white p-5 md:min-h-[250px] md:p-6">
            <div className="h-full w-full rounded-lg bg-gray-100" />
          </div>

          {/* Card 3 */}
          <div className="flex min-h-[200px] items-center justify-center rounded-xl bg-white p-5 md:min-h-[250px] md:p-6">
            <div className="h-full w-full rounded-lg bg-gray-100" />
          </div>

          {/* Card 4 */}
          <div className="flex min-h-[200px] items-center justify-center rounded-xl bg-white p-5 md:min-h-[250px] md:p-6">
            <div className="h-full w-full rounded-lg bg-gray-100" />
          </div>

          {/* Card 5 */}
          <div className="flex min-h-[200px] items-center justify-center rounded-xl bg-white p-5 md:col-span-2 md:min-h-[250px] md:p-6 lg:col-span-1">
            <div className="h-full w-full rounded-lg bg-gray-100" />
          </div>

          {/* Card 6 */}
          <div className="flex min-h-[200px] items-center justify-center rounded-xl bg-white p-5 md:col-span-2 md:min-h-[250px] md:p-6 lg:col-span-1">
            <div className="h-full w-full rounded-lg bg-gray-100" />
          </div>
        </div>
      </div>
    </section>
  );
}
