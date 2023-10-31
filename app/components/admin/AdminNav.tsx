"use client";

import Link from "next/link";
import React from "react";
import AdminNavItem from "./AdminNavItem";
import { MdBorderStyle, MdDashboard, MdLibraryAdd, MdManageAccounts } from "react-icons/md";
import { usePathname } from "next/navigation";
import Container from "../Container";

const AdminNav = () => {
  const pathname = usePathname();
  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href="/admin">
            <AdminNavItem
              label="Summery"
              icon={MdDashboard}
              selected={pathname === "/admin"}
            />
          </Link>
          <Link href="/admin/add-prodcuts">
            <AdminNavItem
              label="Add Products"
              icon={MdLibraryAdd}
              selected={pathname === "/admin/add-prodcuts"}
            />
          </Link>
          <Link href="/admin/manage-products">
            <AdminNavItem
              label="Manage Products"
              icon={MdManageAccounts}
              selected={pathname === "/admin/manage-products"}
            />
          </Link>
              <Link href="/admin/manage-orders">
            <AdminNavItem
              label="Manage Orders"
              icon={MdBorderStyle}
              selected={pathname === "/admin/manage-orders"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AdminNav;
