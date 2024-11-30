import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  //   useEffect(() => {
  //     setIsLogin(!!authorizationUtil.getAuthorization());
  //   }, []);

  return { isLogin };
};

export const useAdminAuth = () => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  //   useEffect(() => {
  //     setIsLogin(!!authorizationUtil.getIsAdmin());
  //   }, []);

  return { isLogin };
};
