import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {createAppAsyncThunk} from "../common/utils/create-app-async-thunk";
import {postsApi} from "../api/posts.api";
import {Post} from "../api/type";


export const getPosts = createAppAsyncThunk(
    'weatherReducer/getWeather',
    async (_, {rejectWithValue, getState}) => {
        let q = getState().postsSlice.filters.q
        if (q === '') q = null
        try {
            const res = await postsApi.getPosts({q})
            return res.data
        } catch (e) {
            return rejectWithValue(e)
        }


    }
)

type initStateType = {
    posts: Post[]
    filters: {
        q: string | null,
    },
}

const initialState: initStateType = {
    posts: [],
    filters: {
        q: null,
    },
}

const slice = createSlice({
    name: 'postsSlice',
    initialState,
    reducers: {
        setSearchText(state, action: PayloadAction<string>) {
            state.filters.q = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload
        })
    }

})

export const {setSearchText} = slice.actions
export const postsReducer = slice.reducer



