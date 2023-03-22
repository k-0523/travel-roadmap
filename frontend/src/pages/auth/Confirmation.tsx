import React from "react";
import { useConfirmation } from "../../queries/AuthQuery";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/ui/Loading";
import { toast } from "react-toastify";

const Confirmation: React.VFC = () => {
  const { uuid } = useParams();
  const history = useNavigate();

  const { status } = useConfirmation(String(uuid));
  if (status === "loading") {
    return <Loading />;
  } else if (status === "success") {
    history("/login", { replace: true });
    toast.success("本登録が完了しました。");
  } else if (status === "error") {
    history("/login", { replace: true });
    toast.error("無効なURLです。");
  }

  return <></>;
};

export default Confirmation;
