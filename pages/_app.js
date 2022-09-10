import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "redux/store";
import RouteGuard from "helpers/RouteGuard";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </Provider>
  );
}

export default MyApp;
