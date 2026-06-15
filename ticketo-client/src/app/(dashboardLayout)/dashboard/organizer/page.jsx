import DashboardHeading from "@/components/DashboardHeading";
import UpgradePremiumButton from "@/components/UpgradePremiumButton";
import { getSession } from "@/lib/api/session";
import { Button, Card, Chip } from "@heroui/react";

import {
  FaCalendarAlt,
  FaCheckCircle,
  FaCrown,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";

const OrganizerOverviewPage = async () => {
  const stats = {
    totalEvents: 15,
    totalAttendees: 450,
    totalRevenue: 25000,
    totalSoldTickets: 780,
  };

  const userData = await getSession();
  console.log(userData?.isPremium);
  // console.log(user?.isPremium);

  const isPremium = userData?.isPremium;



  return (
    <div className="space-y-6 mt-6">
      <DashboardHeading title={"Overview"} description={"Dashboard Overview"} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Total Hosted Events
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                {stats.totalEvents}
              </h2>
            </div>
            <div className="p-3.5 bg-pink-500/10 text-pink-400 rounded-2xl border border-pink-500/20">
              <FaCalendarAlt size={24} />
            </div>
          </div>
        </Card>
        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Total Ticket Sales
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                {stats.totalAttendees}
              </h2>
            </div>
            <div className="p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20">
              <FaUsers size={24} />
            </div>
          </div>
        </Card>
        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Accumulated Revenue
              </span>
              <h2 className="text-3xl font-extrabold text-white">{`$${stats.totalRevenue.toFixed(2)}`}</h2>
            </div>
            <div className="p-3.5 bg-green-500/10 text-green-400 rounded-2xl border border-green-500/20">
              <FaDollarSign size={24} />
            </div>
          </div>
        </Card>
      </div>

      {!isPremium ? (
        <>
          <Card
            className="border border-yellow-500/20 bg-linear-to-r from-yellow-500/5 via-amber-600/5 to-transparent relative overflow-hidden"
            radius="lg"
          >
            <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaCrown className="text-yellow-400" /> Unlock Unlimited Event
                  Creation
                </h3>
                <p className="text-slate-400 text-xs max-w-xl leading-relaxed">
                  Standard organizer accounts are limited to{" "}
                  <strong>3 events</strong>. Upgrade to our Premium Package for{" "}
                  <strong>$49.00</strong> to host unlimited events.
                </p>
              </div>

              <UpgradePremiumButton />
            </div>
          </Card>
        </>
      ) : (
        <>
          <Card
            className="relative overflow-hidden border border-emerald-500/20 bg-linear-to-br from-emerald-500/10 via-green-500/5 to-transparent backdrop-blur-xl shadow-2xl"
            radius="lg"
          >
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-green-400/10 blur-2xl" />

            <div className="absolute top-4 right-4">
              <Chip
                className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/20 px-3"
                variant="flat"
              >
                Premium Active
              </Chip>
            </div>

            <div className="relative z-10 p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-2xl bg-emerald-500/15 border border-emerald-400/20 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                    <FaCheckCircle className="text-3xl text-emerald-400" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Premium Membership Activated
                    </h2>
                    <p className="text-emerald-300 text-sm">
                      Unlimited event creation unlocked
                    </p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  Your organizer account has been successfully upgraded to{" "}
                  <span className="font-semibold text-white">Premium</span>. You
                  can now create unlimited events, access premium tools, and
                  grow your audience without restrictions.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    "Unlimited Events",
                    "Premium Access",
                    "Priority Features",
                    "Advanced Dashboard",
                  ].map((item) => (
                    <div
                      key={item}
                      className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/10 text-emerald-200 text-xs font-medium"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="text-center">
                  <h3 className="text-4xl font-black text-emerald-400">$49</h3>
                  <p className="text-slate-400 text-xs">
                    Premium Plan Activated
                  </p>
                </div>

                <Button
                  className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold h-11 px-6 shadow-lg shadow-emerald-500/20"
                  radius="lg"
                >
                  Manage Subscription
                </Button>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};
export default OrganizerOverviewPage;
