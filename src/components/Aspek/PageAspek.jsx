import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import Layout from "../Layout";
import Aspek from "./ListAspek";

const PageAspek = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    dispatch(getMe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, navigate]);
  return (
    <Layout>
      <Aspek />
    </Layout>
  );
};

export default PageAspek;
