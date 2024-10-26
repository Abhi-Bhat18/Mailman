"use client";
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { templateColumns } from "./templates-columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetEmailTemplatesQuery } from "@/lib/features/email-template/emailTemplateApis";
import { useAppSelector } from "@/lib/hook";

const Templates = () => {
  const project_id = useAppSelector(
    (state) => state.auth.defaultProject?.project_id
  );

  const { data, isError, isLoading } = useGetEmailTemplatesQuery({
    project_id,
    page: 1,
    page_limit: 10,
  });

  return (
    <section className="space-y-5">
      <div className="flex justify-between items-center">
        <p className="text-2xl">Templates</p>
        <Button variant={"link"}>
          <Link href={"/templates/new-template"}>New Template</Link>
        </Button>
      </div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && !isError && (
        <DataTable columns={templateColumns} data={data} />
      )}
    </section>
  );
};

export default Templates;
