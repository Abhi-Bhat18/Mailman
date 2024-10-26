"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { campaignColumns } from "./components/campaign-columns";
import Link from "next/link";
import { useGetAllCampaignsQuery } from "@/lib/features/campaign/campaignApis";
import { useAppSelector } from "@/lib/hook";

const Campaigns = () => {
  const project_id = useAppSelector(
    (state) => state.auth.defaultProject?.project_id
  );

  const { data, error, isLoading } = useGetAllCampaignsQuery(project_id!);

  return (
    <section className="w-full space-y-5">
      <div className="flex w-full justify-between items-center">
        <p>Campaigns </p>
        <Button variant={"link"}>
          <Link href={"/new-campaign"}> New Campaign </Link>
        </Button>
      </div>
      {isLoading && <div>Loading</div>}
      {error && <div>Something went wrong</div>}
      {!isLoading && !error && (
        <DataTable columns={campaignColumns} data={data} />
      )}
    </section>
  );
};

export default Campaigns;
