// app/members/page.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type MemberStatus = "Active" | "Inactive";

type Member = {
  id: number;
  name: string;
  portal: string;
  designation: string;
  status: MemberStatus;
  photo: string;
};

// Replace/extend using PDF data later
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
    setPageSize(Number(value));
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      {/* Main content */}
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-6 text-2xl font-bold tracking-wide uppercase">
          Our Trustees
        </h2>

        {/* Controls row */}
        <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          {/* Page size */}
          <div className="flex items-center gap-2 text-sm">
            <span>Show</span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(e.target.value)}
              className="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-1 text-sm"
            >
              {PAGE_SIZE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <span>entries</span>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 text-sm">
            <span>Search:</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-56 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1 text-sm focus:border-sky-500"
              placeholder="Search members..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-sky-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-semibold uppercase tracking-wide">
                <th className="px-4 py-3">Sl. No</th>
                <th className="px-4 py-3">Photo</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Portal & Designation</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {visibleMembers.map((member, index) => (
                <tr
                  key={member.id}
                  className={
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800"
                  }
                >
                  <td className="px-4 py-4 align-top">
                    {String(startIndex + index + 1).padStart(2, "0")}.
                  </td>

                  <td className="px-4 py-4 align-top">
                    <div className="relative h-32 w-24 border border-gray-300 dark:border-gray-700 overflow-hidden">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                  </td>

                  <td className="px-4 py-4 align-top font-semibold">
                    {member.name}
                  </td>

                  <td className="px-4 py-4 align-top">
                    <div className="font-semibold">{member.portal}</div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {member.designation}
                    </div>
                  </td>

                  <td className="px-4 py-4 align-top">
                    <span
                      className={
                        member.status === "Active"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
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
                    className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-sm">
          <div>
            Showing{" "}
            <span className="font-semibold">
              {filteredMembers.length === 0 ? 0 : startIndex + 1} –{" "}
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
              className="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1 disabled:opacity-50"
            >
              Previous
            </button>

            <span>
              Page <span className="font-semibold">{safePage}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </span>

            <button
              disabled={safePage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
