import Logo from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";
import { authClient, useSession } from "@/lib/auth-client";

import React from "react";
import {
  FaBuilding,
  FaCalendarAlt,
  FaHistory,
  FaHome,
  FaPlus,
  FaSignOutAlt,
  FaTicketAlt,
  FaUserCircle,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const DashboardSidebar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const organizerMenu = [
    {
      key: "overview",
      label: "Overview",
      icon: FaUsers,
      href: "/dashboard/organizer",
    },
    {
      key: "organization",
      label: "Organization",
      icon: FaBuilding,
      href: "/dashboard/organizer",
    },
    {
      key: "add-event",
      label: "Add Event",
      icon: FaPlus,
      href: "/dashboard/add-event",
    },
    {
      key: "manage-events",
      label: "Manage Events",
      icon: FaCalendarAlt,
      href: "/dashboard/manage-events",
    },
    {
      key: "attendees",
      label: "Attendees",
      icon: FaUsers,
      href: "/dashboard/attendees",
    },
  ];

  const attendeeMenu = [
    {
      key: "overview",
      label: "Overview",
      icon: FaUserCircle,
      href: "/dashboard/attendee",
    },
    {
      key: "tickets",
      label: "My Tickets",
      icon: FaTicketAlt,
      href: "/dashboard/tickets",
    },
    {
      key: "payments",
      label: "Payments",
      icon: FaHistory,
      href: "/dashboard/payments",
    },
  ];

  const adminMenu = [
    {
      key: "users",
      label: "Users",
      icon: FaUserShield,
      href: "/dashboard/users",
    },
    {
      key: "events",
      label: "Approve Events",
      icon: FaCalendarAlt,
      href: "/dashboard/events",
    },
    {
      key: "transactions",
      label: "Transaction Logs",
      icon: FaUserShield,
      href: "/dashboard/transactions",
    },
  ];

  const role = session?.user?.role;
  console.log(session?.user?.image);

  const menuItems =
    role === "organizer"
      ? organizerMenu
      : role === "attendee"
        ? attendeeMenu
        : role === "admin"
          ? adminMenu
          : null;
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
  };
  return (
    <div>
      <aside className="w-74 h-screen border-r border-white">
        <div className="h-full flex flex-col bg-slate-950/80 backdrop-blur-xl">
          {/* Brand / Logo */}
          <div className="px-6 py-5 border-b border-white/5">
            <Logo />
          </div>

          {/* User Profile */}
          <div className="px-6 py-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/60 shrink-0">
                <Image
                  width={40}
                  height={40}
                  src={
                    session?.user?.image ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNupSKjnCIs8Z8mbmI3Nm1Huhj_wEEm-BQo522KiZjAg&s=10"
                  }
                  alt="Avatar"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="overflow-hidden">
                <p className="text-white text-sm font-bold truncate leading-tight">
                  {session?.user?.name}
                </p>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${role === "admin" ? "text-yellow-400" : role === "organizer" ? "text-indigo-400" : "text-pink-400"}`}
                >
                  {role}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="grow overflow-y-auto px-3 py-4 space-y-1">
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest px-3 pb-2">
              Navigation
            </p>

            {menuItems?.map(({ key, label, icon: Icon, href }) => {
              return (
                <Link
                  key={key}
                  href={href}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left cursor-pointer
                     text-slate-400 hover:text-white hover:bg-white/5
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors bg-white/5 text-slate-400`}
                  >
                    <Icon size={20} />
                  </span>
                  <span>{label}</span>
                  {/* {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-pink-400" />
                  )} */}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Links */}
          <div className="px-3 py-4 border-t border-white/5 space-y-1">
            <Link
              href="/"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150"
            >
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <FaHome size={13} />
              </span>
              Back to Site
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-150 cursor-pointer"
            >
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <FaSignOutAlt size={13} />
              </span>
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DashboardSidebar;
