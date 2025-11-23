import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="w-full border-b bg-background py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 md:grid-cols-2 md:px-6">

        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            National Journalist Association
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            National Journalist Association is a national association 
            dedicated to preserving and protecting the freedom of web journalists 
            and improving the quality of online news content through professional standards.
          </p>

          <p className="mt-4 text-sm font-semibold text-primary">
            Regd. No. 48/2020 
            <br />
            Registered under Trust Act 1882
          </p>

          <div className="mt-6 flex gap-4">
            <Button className="rounded-full" size="lg">
              Learn More
            </Button>

            <Button variant="outline" className="rounded-full" size="lg">
              Join Us
            </Button>
          </div>
        </div>

        {/* RIGHT SIDE - HERO IMAGE GALLERY */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl  shadow-md">
            <Image
              src="/admin2.jpg"
              alt="Gallery Image 1"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-md">
            <Image
              src="/admin1.jpg"
              alt="Gallery Image 2"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
