// app/members/page.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type MemberStatus = "Active" | "Inactive";

type Member = {
  id: number;
  name: string;
  portal: string;          // Portal name
  designation: string;     // Designation / role
  status: MemberStatus;
  photo: string;           // /public path e.g. "/members/anand-kaushal.jpg"
};

// TODO: Replace / extend this list using data from your PDFs.
const MEMBERS: Member[] = [
  {
    id: 3,
    name: "Rakesh Kumar Gupta",
    portal: "National Journalists Association (NJA Trust)",
    designation: "Founder President / Managing Trustee",
    status: "Active",
    photo: "/members/rakesh-kumar-gupta.jpg",
  },
  {
    id: 4,
    name: "Neeraj Kumar Singh",
    portal: "NJA Trust",
    designation: "Trustee Secretary",
    status: "Active",
    photo: "/members/neeraj-kumar-singh.jpg",
  },
  {
    id: 5,
    name: "Arvind Sharma",
    portal: "NJA Trust",
    designation: "Trustee Treasurer",
    status: "Active",
    photo: "/members/arvind-sharma.jpg",
  },
  {
    id: 6,
    name: "Abhishek Kumar Srivastava",
    portal: "NJA Trust",
    designation: "Trustee Member & Legal Advisor",
    status: "Active",
    photo: "/members/abhishek-kumar-srivastava.jpg",
  },
  {
    id: 7,
    name: "Dr. Ashok Kumar Mishra",
    portal: "NJA Trust",
    designation: "Trustee Member",
    status: "Active",
    photo: "/members/ashok-kumar-mishra.jpg",
  },
  {
    id: 8,
    name: "Rana Pratap Singh",
    portal: "NJA Trust",
    designation: "Trustee Member",
    status: "Active",
    photo: "/members/rana-pratap-singh.jpg",
  },
  {
    id: 9,
    name: "Din Bandhu Singh",
    portal: "NJA Trust",
    designation: "Trustee Member",
    status: "Active",
    photo: "/members/din-bandhu-singh.jpg",
  },
  // Add more members here...
];

const PAGE_SIZE_OPTIONS = [10, 20, 50];

export default function AllMembersPage() {
  const [pageSize, setPageSize] = useState<number>(20);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredMembers = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return MEMBERS;
    return MEMBERS.filter((m) => {
      const haystack = `${m.name} ${m.portal} ${m.designation} ${m.status}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const visibleMembers = filteredMembers.slice(startIndex, startIndex + pageSize);

  const handlePageSizeChange = (value: string) => {
    const size = Number(value);
    setPageSize(size);
    setPage(1); // reset to first page
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-6 text-2xl font-bold tracking-wide uppercase">
          All Member Details
        </h2>

        {/* Controls row: page size + search */}
        <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2 text-sm">
            <span>Show</span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(e.target.value)}
              className="rounded border border-gray-300 px-2 py-1 text-sm focus:border-sky-500 focus:outline-none"
            >
              {PAGE_SIZE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span>Search:</span>
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-56 rounded border border-gray-300 px-3 py-1 text-sm focus:border-sky-500 focus:outline-none"
              placeholder="Search members..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-sky-100 text-left text-xs font-semibold uppercase tracking-wide">
                <th className="px-4 py-3">Sl. No</th>
                <th className="px-4 py-3">Photo</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Portal &amp; Designation</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {visibleMembers.map((member, index) => (
                <tr
                  key={member.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {/* SL NO */}
                  <td className="px-4 py-4 align-top">
                    {String(startIndex + index + 1).padStart(2, "0")}.
                  </td>

                  {/* PHOTO */}
                  <td className="px-4 py-4 align-top">
                    <div className="relative h-32 w-24 overflow-hidden border border-gray-200">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                  </td>

                  {/* NAME */}
                  <td className="px-4 py-4 align-top text-sm font-semibold">
                    {member.name}
                  </td>

                  {/* PORTAL & DESIGNATION */}
                  <td className="px-4 py-4 align-top text-sm">
                    <div className="font-semibold">{member.portal}</div>
                    <div className="text-gray-600">{member.designation}</div>
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-4 align-top text-sm">
                    <span
                      className={
                        member.status === "Active"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}

              {visibleMembers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-sm text-gray-500"
                  >
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-col items-start justify-between gap-3 text-sm md:flex-row md:items-center">
          <div>
            Showing{" "}
            <span className="font-semibold">
              {filteredMembers.length === 0
                ? 0
                : startIndex + 1}{" "}
              –
              {" "}
              {Math.min(startIndex + pageSize, filteredMembers.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold">{filteredMembers.length}</span>{" "}
            entries
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={safePage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded border border-gray-300 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page <span className="font-semibold">{safePage}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </span>
            <button
              disabled={safePage === totalPages}
              onClick={() =>
                setPage((p) => Math.min(totalPages, p + 1))
              }
              className="rounded border border-gray-300 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
