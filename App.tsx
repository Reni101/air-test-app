import {Provider} from "react-redux";
import {store} from "./src/service/store";
import {Posts} from "./src/component/posts/posts";

export default function App() {
    return (
        <Provider store={store}>
            <Posts/>
        </Provider>
    );
}

