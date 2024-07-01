"use server";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
export const getAccessToken = () => {
  const cookiestore = cookies().get("accessToken")?.value;
  return cookiestore;
};
export const getRefreshToken = () => {
  const cookiestore = cookies().get("refreshToken")?.value;
  return cookiestore;
};
