<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <h3 class="card-header">Post List</h3>
                <div class="row mt-3">
                    <div class="col-sm-6 d-flex justify-content-start">
                        <router-link class="btn btn-primary" :to="{name: 'posts.create'}">Create Post</router-link>
                    </div>
                    <div class="col-sm-6 d-flex justify-content-end">
                        <form class="form-inline">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="searchWord">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Created By</th>
                            <th>Last Modified</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="(post,index) in posts" :key="post.id">
                            <td scope="row">{{ index+1 }}</td>
                            <td>{{ post.title }}</td>
                            <td>{{ post.body }}</td>
                            <td>{{ post.user.name }}</td>
                            <td>{{ post.updated_at }}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div class="row">
                    <div class="col-md-6">
                        Total {{ total }} Posts
                    </div>
                    <div class="col-md-6">
                        <pagination v-model="page" :records="total" :per-page="perPage" @paginate="changeList"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue'
import usePost from '../../composable/Post'
import axios from 'axios'
import Pagination from 'v-pagination-3';

export default {
    name: 'PostIndex',
    components: {
        Pagination
    },
    data(){
        return{
            searchWord: '',
            page: 1,
        }
    },
    props: {

    },
    setup() {
        const { posts, total, perPage,  getPosts, destroyPost } = usePost()

        onMounted(getPosts)

        const deletePost = async (id) => {
            await destroyPost(id)
        }

        const changeList = async (page=1) => {
            let response = await axios.get(`/api/posts?page=${page}`)
            posts.value = response.data.data
        }

        return{
            posts,
            total,
            perPage,
            changeList,
            deletePost
        }
    },
}
</script>
