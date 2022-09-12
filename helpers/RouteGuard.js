import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { autoSignIn } from "redux/reducers/authSlice";
import Loader from "components/UI/Loader";

function RouteGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    getSession()
      .then((session) => {
        if (session) {
          dispatch(autoSignIn({ router }))
            .unwrap()
            .then(() => {
              setLoading(false);
            });
        } else {
          setLoading(false);
          router.push("/sign-in");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        router.push("/sign-in");
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="large" align="center" position="center" color="primary" />
      </div>
    );
  }

  return <>{children}</>;
}

export default RouteGuard;
