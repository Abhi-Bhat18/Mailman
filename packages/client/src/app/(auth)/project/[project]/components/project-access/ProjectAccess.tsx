"use client";
import React, { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { projectAccessColumn, projectAccessData } from "./projectAccessColumns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import InviteUser from "./InviteUser";
import { useGetProjectUsersQuery } from "@/lib/features/project/projectApis";
import { projectAccessColumns } from "../projectAccess-columns";

interface Props {
  project_id: string;
}

const ProjectUsers: React.FC<Props> = ({ project_id }) => {
  const { data, isLoading, error } = useGetProjectUsersQuery(project_id);
  const [selection, setSelection] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return <>Table Loding...</>;
  }
  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <p className="text-2xl">Users</p>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
              <Button className="space-x-1 items-center">
                <span className="">Invite user</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="p-5 border-secondary">
              <DialogHeader>
                <p className="text-2xl">Invite Users</p>
              </DialogHeader>
              <InviteUser
                closeDialog={() => setIsOpen(false)}
                project_id={project_id}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="">
          <DataTable
            setSelection={setSelection}
            columns={projectAccessColumns}
            data={data}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectUsers;
