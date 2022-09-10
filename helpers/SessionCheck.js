import { useEffect, loading } from "react";
import { getSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { autoSignIn } from "redux/reducers/authSlice";
import Loader from "components/UI/Loader";

function SessionCheck({ children }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getSession()
      .then((session) => {
        if (session) {
          dispatch(autoSignIn({}))
            .unwrap()
            .then(() => {
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Loader size="large" align="center" position="center" color="primary" />
    );
  }

  return <>{children}</>;
}

export default SessionCheck;
