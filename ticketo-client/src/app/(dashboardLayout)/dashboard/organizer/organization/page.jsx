"use client";
import DashboardHeading from "@/components/DashboardHeading";
import {
  addOrganization,
  updateOrganization,
} from "@/lib/api/organizations/action";
import { myOrganization } from "@/lib/api/organizations/data";
import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/utils/uploadImage";
import { Button, Card, CardHeader, Form, Input, TextArea } from "@heroui/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrganizationPage = () => {
  const { data: session } = authClient.useSession();
  const [myOrg, setMyOrg] = useState(null);
  useEffect(() => {
    const setOrgData = async () => {
      if (!session?.user?.email) return;
      const org = await myOrganization(session.user.email);
      setMyOrg(org);
    };

    setOrgData();
  }, [session]);
  // console.log(myOrg);
  // console.log(session?.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const imageFile = formData.get("logo");
    const imageUrl = await uploadImage(imageFile);

    const orgData = {
      organizationName: data.organizationName,
      logo: imageUrl,
      website: data.website,
      description: data.description,
      organizerEmail: session?.user?.email,
    };

    if (!myOrg) {
      const resData = await addOrganization(orgData);
      if (resData.insertedId) {
        toast.success("Org Profile added");
      }
    } else {
      const updatedRes = await updateOrganization(orgData, myOrg._id);
      if (updatedRes?.modifiedCount > 0) {
        toast.success("Org Profile Updated");
        console.log(updatedRes);
        console.log(myOrg._id);
      }
    }
    // console.log(resData);
  };
  return (
    <div>
      <DashboardHeading
        title={"My Organization Profile"}
        description={"Update organization Logo,profile,website and description"}
      />

      <div className="mt-6 space-y-6 max-w-3xl">
        <Card
          className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl"
          radius="lg"
        >
          <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
            <h3 className="text-xl font-bold text-white">
              Organization Details
            </h3>
            <p className="text-slate-400 text-xs">
              Review and edit your organization credentials.
            </p>
          </CardHeader>
          <div className="p-6">
            <Form onSubmit={handleSubmit} className="space-y-4 w-full">
              <Input
                defaultValue={myOrg?.organizationName}
                id="organizationName"
                name="organizationName"
                label="Organization Name"
                placeholder="TechEvents Corp"
                required
                className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
              />

              <Input
                // defaultValue={}
                id="logo"
                type="file"
                accept="image/*"
                name="logo"
                label="Organization Logo"
                placeholder="https://images.unsplash.com/photo-1549880181-56a44cf8a4a1"
                required
                className="w-full bg-slate-800 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
              />

              <Input
                defaultValue={myOrg?.website}
                id="website"
                name="website"
                label="Organization Website"
                placeholder="techevents.corp"
                required
                className="w-full bg-slate-800 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
              />

              <TextArea
                defaultValue={myOrg?.description}
                id="org-desc"
                name="description"
                label="Description"
                placeholder="Hosting global developer conferences and software hacking marathons."
                required
                className="w-full bg-slate-800 border border-white/10 rounded-xl focus:outline-none min-h-25 text-white text-sm"
              />

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-11 px-6 shadow-lg"
                  radius="lg"
                >
                  Save Changes
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationPage;
