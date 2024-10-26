"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { resetDocument } from "@/components/email-builder/documents/editor/EditorContext";
import SaveTemplate from "../../templates/new-template/components/SaveTemplate";
import EmailBuilder from "@/components/email-builder/EmailBuilder";
import { useGetAnEmailTemplateQuery } from "@/lib/features/email-template/emailTemplateApis";
import { useAppSelector } from "@/lib/hook";
import UpdateTemplate from "../../templates/new-template/components/UpdateTemplate";
const Template = () => {
  const path = usePathname();
  const id = path.split("/").at(-1);
  const project_id = useAppSelector(
    (state) => state.auth.defaultProject?.project_id
  );

  const { isLoading, data, isError } = useGetAnEmailTemplateQuery({
    project_id,
    template_id: id,
  });

  if (isLoading) {
    return <div>Loading ...</div>;
  } else if (!isLoading && !isError) {
    return (
      <div className="space-y-5">
        <div className="w-full flex items-center">
          <UpdateTemplate />
        </div>
        <EmailBuilder />
      </div>
    );
  }
};

export default Template;
