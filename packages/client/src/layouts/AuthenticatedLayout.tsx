"use client";
import { useCheckLoginQuery } from "@/lib/features/auth/authApis";
import { ReactNode } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hook";
import HeaderV2 from "@/components/header/Header";
import { toast } from "sonner";

interface Props {
  children: ReactNode;
}

const AuthenticatedLayout: React.FC<Props> = ({ children }) => {
  
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  
  const router = useRouter();

  const { data, error, isLoading } = useCheckLoginQuery(undefined, {
    // This conditionally disables the query based on the login state
    skip: isLoggedIn,
  });

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    router.push("/sign-in");
    return null;
  } else if (isLoggedIn || (!isLoading && !error)) {
    return (
      <main>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <Sidebar />
          <div className="flex flex-col">
            <HeaderV2 />
            <div className="p-5">{children}</div>
          </div>
        </div>
      </main>
    );
  }
};

export default AuthenticatedLayout;
