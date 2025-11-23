import Image from "next/image";
import { Mail, Phone, Globe, MapPin, User } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-100">
      {/* main content */}
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-12 md:flex-row md:justify-between">
        {/* CONTACT US */}
        <div className="space-y-4 md:w-1/3">
          <h3 className="text-lg font-semibold uppercase tracking-[0.18em]">
            Contact Us
          </h3>

          <ul className="space-y-3 text-sm leading-relaxed">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-sky-400" />
              <span>9431210737</span>
            </li>

            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-sky-400" />
              <span className="space-y-1">
                <div>nationaljournalistsassociation@gmail.com</div>
                <div>rkgupatbnl3@gmail.com</div>
              </span>
            </li>

            <li className="flex gap-3">
              <Globe className="mt-0.5 h-4 w-4 text-sky-400" />
              <a
                href="https://nja.org.in"
                className="hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                www.nja.org.in
              </a>
            </li>

            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-sky-400" />
              <span>
                National Office (Rashtriya Karyalaya):
                <br />
                Sanjay Kumar, A28C Gali No-3,
                <br />
                AA Block Abhiyakti Bihar, Shiv Bihar,
                <br />
                Delhi – 110094
              </span>
            </li>
          </ul>
        </div>

        {/* KEY PERSONS / LATEST INFO */}
        <div className="space-y-4 md:w-1/3">
          <h3 className="text-lg font-semibold uppercase tracking-[0.18em]">
            National Journalist Association
          </h3>

          <div className="flex gap-3 text-sm leading-relaxed">
            <User className="mt-0.5 h-4 w-4 text-sky-400" />
            <div>
              <div className="font-semibold text-zinc-50">
                राकेश कुमार गुप्ता
              </div>
              <div>संस्थापक राष्ट्रीय अध्यक्ष</div>
              <div className="mt-2 text-xs text-zinc-400">
                (ट्रस्ट एक्ट 1882 के अन्तर्गत पंजीकृत – Regd. No. 48/2020)
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-zinc-400">
            राष्ट्रीय पत्रकारों के अधिकार, सम्मान और सामाजिक उत्तरदायित्व को
            मज़बूत बनाने के उद्देश्य से गठित संगठन।
          </p>
        </div>

        {/* GALLERY */}
        <div className="space-y-4 md:w-1/3">
          <h3 className="text-lg font-semibold uppercase tracking-[0.18em]">
            Gallery
          </h3>

          {/* 3 photos per row × 4 rows = 12 photos */}
          <div className="grid grid-cols-3 gap-2">
            {[
              "/ad1.jpg",
              "/ad2.jpg",
              "/ad3.jpg",
              "/ad4.jpg",
              "/ad5.jpg",
              "/ad6.jpg",
              "/ad7.jpg",
              "/img1.jpeg",
              "/img3.jpg",
              "/img5.jpg",
              "/img6.jpg",
              "/ad5.jpg",
            ].map((src, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-md border border-zinc-700 bg-zinc-800"
              >
                <Image
                  src={src}
                  alt={`Gallery image ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-zinc-400 md:flex-row">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} NATIONAL JOURNALIST ASSOCIATION
            &nbsp;|&nbsp; Regd. No. 48/2020 (ट्रस्ट एक्ट 1882 के अन्तर्गत).
          </p>
          <p className="text-center md:text-right">
            Website managed by{" "}
            <span className="font-medium text-zinc-300">Rakesh Kumar Gupta</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
