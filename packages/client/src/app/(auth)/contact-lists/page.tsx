"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import NewListForm from "../../../components/contact-lists/NewListForm";

import { DialogTitle } from "@radix-ui/react-dialog";
import { DataTable } from "@/components/ui/data-table";
import { ContactListColumns } from "../../../components/contact-lists/list-column";
import { useGetAllContactListsQuery } from "@/lib/features/contact-list/contactListApis";
import { useAppSelector } from "@/lib/hook";
import isUserAuthorized from "@/utils/permissionCheck";

const EmailLists = () => {
  const { defaultProject, permissions } = useAppSelector((state) => state.auth);

  const { data, isLoading, isError } = useGetAllContactListsQuery({
    project_id: defaultProject?.project_id,
    page: 0,
    pageLimit: 10,
  });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex w-full justify-between items-center border-b border-b-gray-300 pb-2">
        <p className="text-2xl"> Contact Lists</p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            {isUserAuthorized(permissions, "contact-lists", "create") && (
              <Button className="space-x-2 items-center">
                <span className="">New contact List</span>
              </Button>
            )}
          </DialogTrigger>
          <DialogContent className="p-5 border-secondary">
            <DialogTitle>
              <p className="text-xl">Create New Email List</p>{" "}
            </DialogTitle>
            <DialogHeader>
              <NewListForm closeDialog={() => setIsOpen(false)} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        {isLoading && <div> Loading ...</div>}
        {!isLoading && !isError && (
          <DataTable columns={ContactListColumns} data={data} />
        )}
      </div>
    </div>
  );
};

export default EmailLists;
