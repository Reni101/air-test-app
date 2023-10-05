import {instance} from "./instance";
import {Post} from "./type";

export const postsApi = {
    getPosts(params: queryTypes) {
        return instance.get<Post[]>('posts', {
            params
        })
    },
}

export type sortType = 'id' | 'title' | 'body'
export type queryTypes = {
    q: string | null,
    _sort: sortType | null
    _order: 'asc' | 'desc' | null
}