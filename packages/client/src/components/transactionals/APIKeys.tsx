"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import NewApiKeyForm from "./NewApiKeyForm";
import { useGetAPIKeysQuery } from "@/lib/features/apikeys/keysApis";
import TableLoading from "../loading-screens/TableLoading";
import { DataTable } from "../ui/data-table";
import { apiKeyColumns } from "./apiKeyColumns";

const APIKeys = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, isError } = useGetAPIKeysQuery({});
  console.log("Data", data);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between space-y-5">
        <p className="text-2xl">API Keys</p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button>New API Key</Button>
          </DialogTrigger>
          <DialogContent className="border-secondary">
            <DialogHeader>Generate New API Key</DialogHeader>
            <NewApiKeyForm closeDialog={() => setIsOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <div>
        {isLoading && (
          <>
            <TableLoading columns={5} />
          </>
        )}
        {!isLoading && !isError && (
          <DataTable data={data} columns={apiKeyColumns} />
        )}
      </div>
    </div>
  );
};

export default APIKeys;
