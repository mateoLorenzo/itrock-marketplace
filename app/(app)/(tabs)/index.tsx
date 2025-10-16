import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";
import React from "react";

const Index = () => {
  const { state } = useAuth();
  return !state?.isAuthenticated ? (
    <Redirect href="/home" />
  ) : (
    <Redirect href="/auth/sign-in" />
  );
};

export default Index;
