import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { RootState } from "../../../redux/store";

const Layout: FC = () => {
  const { notes } = useSelector((state: RootState) => state.notes);

  const { id } = useParams();

  const found = notes.find((note) => note.id === id);

  if (!found) {
    return <Navigate to="/" replace />;
  }
  return <Outlet context={found} />;
};

export default Layout;
