"use client";
import React, { useState } from "react";
import GeneralSettings from "@/app/admin/general-settings/page";
import LoginForm from "../login/page";

const AdminSettingsWrapper = () => {
  const [id, setId] = useState("");

  return (
    <div>
      <LoginForm setId={setId} />
      <p>Logged-in Admin ID: {id}</p>
      <GeneralSettings id={id} />
    </div>
  );
};

export default AdminSettingsWrapper;
