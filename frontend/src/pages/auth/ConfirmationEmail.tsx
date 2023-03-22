import React from "react";
import { useConfirmationEmail } from "../../queries/AuthQuery";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/ui/Loading";
import { toast } from "react-toastify";

const Confirmation: React.VFC = () => {
  const { uuid } = useParams();
  const history = useNavigate();

  // @ts-ignore to ignore the type checking errors on the next line in a TypeScript
  const { status } = useConfirmationEmail(uuid);
  if (status === "loading") {
    return <Loading />;
  } else if (status === "success") {
    history("/login", { replace: true });
    toast.success("メールアドレスの認証が完了しました。");
  } else if (status === "error") {
    history("/login", { replace: true });
    toast.error("無効なURLです。");
  }

  return <></>;
};

export default Confirmation;
