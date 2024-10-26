"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewCampaignForm from "./components/CampaignForm";
import TemplatePreview from "../templates/TemplatePreview";

const NewCampaign = () => {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-2xl">New Campaign</p>
      </div>
      <NewCampaignForm />
    </div>
  );
};

export default NewCampaign;
