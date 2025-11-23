// app/contact/page.tsx
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Your message has been submitted!");
  };

  return (
    <div className="min-h-screen bg-white">

      {/* MAIN CONTENT */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-12 md:grid-cols-2">

          {/* LEFT COLUMN – CONTACT DETAILS */}
          <div className="space-y-10">
            <h2 className="text-2xl font-bold uppercase tracking-wide">
              Our Contact Details:
            </h2>

            {/* National Office */}
            <div className="flex gap-4">
              <div className="h-14 w-14 flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl">
                🇮🇳
              </div>
              <div>
                <p className="text-lg font-semibold">National Office</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Sanjay Kumar<br />
                  A281C, Gali No.-3<br />
                  AA Block, Shalimar Bagh<br />
                  Delhi – 110094
                </p>
              </div>
            </div>

            {/* Official Email */}
            <div className="flex gap-4">
              <div className="h-14 w-14 flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl">
                ✉️
              </div>
              <div>
                <p className="text-lg font-semibold">Email</p>
                <p className="text-sm text-gray-700">nationaljournalistsassociation@gmail.com</p>
                <p className="text-sm text-gray-700">rkgupatbnl3@gmail.com</p>
                <p className="text-sm text-gray-700">Website: nja.org.in</p>
              </div>
            </div>

            {/* All Member Contact Numbers */}
            <div className="flex gap-4">
              <div className="h-14 w-14 flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl">
                📞
              </div>
              <div>
                <p className="text-lg font-semibold">Phone Numbers</p>
                <p className="text-sm text-gray-700">Rakesh Kumar Gupta – 9431210737</p>
                <p className="text-sm text-gray-700">Neeraj Kumar Singh – 9479830286</p>
                <p className="text-sm text-gray-700">Arvind Sharma – 9631788428</p>
                <p className="text-sm text-gray-700">Abhishek Kumar Srivastava – 8757138617</p>
                <p className="text-sm text-gray-700">Dr. Ashok Kumar Mishra – 9798466784</p>
                <p className="text-sm text-gray-700">Rana Pratap Singh – 8008428936</p>
                <p className="text-sm text-gray-700">Din Bandhu Singh – 9641023865</p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex gap-4">
              <div className="h-14 w-14 flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl">
                🕒
              </div>
              <div>
                <p className="text-lg font-semibold">Working Hours</p>
                <p className="text-sm text-gray-700">
                  Sun – Fri<br />
                  9:00 AM – 5:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN – CONTACT FORM */}
          <div>
            <h2 className="mb-5 text-2xl font-bold uppercase tracking-wide">
              Feel Free To Drop Us A Line
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-1 block text-sm font-medium">Your name</label>
                <input
                  name="name"
                  type="text"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Your email</label>
                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Mobile</label>
                <input
                  name="mobile"
                  type="text"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Your message</label>
                <textarea
                  name="message"
                  rows={4}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                ></textarea>
              </div>

              <button
                type="submit"
                className="rounded bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* GOOGLE MAP */}
        <div className="mt-16 h-[450px] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13996.52726320529!2d77.13801383470415!3d28.715606423105882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d019b1d5d2c0b%3A0xc1e6a3811f55c247!2sShalimar%20Bagh%2C%20Delhi!5e0!3m2!1sen!2sin!4v1763924309412!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
}
