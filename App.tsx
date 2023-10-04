import {Provider} from "react-redux";
import {store} from "./src/service/store";
import {PostsRoot} from "./src/component/posts-root/posts-root";

export default function App() {
    return (
        <Provider store={store}>
            <PostsRoot/>
        </Provider>
    );
}

