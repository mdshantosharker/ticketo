"use client";
import DashboardHeading from "@/components/DashboardHeading";
import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/utils/uploadImage";
import { Button, Card, CardHeader, Form, Input, TextArea } from "@heroui/react";
import React from "react";

const OrganizationPage = () => {
  const { data: session } = authClient.useSession();
  console.log(session?.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const imageFile = formData.get("organizationLogo");
    const imageUrl = await uploadImage(imageFile);
    console.log(data, imageUrl);
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
                id="organizationName"
                name="organizationName"
                label="Organization Name"
                placeholder="TechEvents Corp"
                required
                className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
              />

              <Input
                id="logo"
                type="file"
                name="logo"
                label="Organization Logo"
                placeholder="https://images.unsplash.com/photo-1549880181-56a44cf8a4a1"
                required
                className="w-full bg-slate-800 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
              />

              <Input
                id="website"
                name="website"
                label="Organization Website"
                placeholder="techevents.corp"
                required
                className="w-full bg-slate-800 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
              />

              <TextArea
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
