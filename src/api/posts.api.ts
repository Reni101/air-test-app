import {instance} from "./instance";
import {Post} from "./type";

export const postsApi = {
    getPosts(params: { q: string | null }) {
        return instance.get<Post[]>('posts', {
            params
        })
    },

}