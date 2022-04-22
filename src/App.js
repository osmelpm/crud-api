import { Provider } from "react-redux";
import CrudApi from "./component/CrudApi";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <CrudApi />
      </div>
    </Provider>
  );
}
