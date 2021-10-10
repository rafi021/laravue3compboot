<template>
<div class="row">
        <div class="col-md-12">
            <div class="card">
                <h3 class="card-header">Post Edit Form</h3>
                <div class="row mt-3">
                    <div class="col-sm-12 d-flex justify-content-end">
                        <router-link class="btn btn-primary" :to="{name: 'posts.index'}">Back to Posts</router-link>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <form @submit.prevent="savePost">
                    <div class="mb-3">
                    <label for="title" class="form-label">Post Title</label>
                    <input type="text" name="title" id="title" class="form-control"
                    v-model="post.title"
                    placeholder="Enter a title" aria-describedby="helpId">
                    <small id="helpId" class="text-muted">Provide a valid Post Title</small>
                    </div>
                    <div class="mb-3">
                    <label for="body" class="form-label">Post Body</label>
                    <textarea name="body" id="body" cols="30" rows="10" class="form-control"
                    v-model="post.body" placeholder="Enter body content" aria-describedby="helpId"></textarea>
                    <small id="helpId" class="text-muted">Provide some text for Post body content</small>
                    </div>
                    <button type="submit" class="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue'
import usePost from  '../../composable/Post'

export default {
    props: {
        id: {
            required: true,
            type: String
        }
    },
    setup(props) {
        const { errors, post, getPost, updatePost } = usePost()

        onMounted(getPost(props.id))

        const savePost = async () => {
            await updatePost(props.id)
        }
        return {
            errors,
            post,
            savePost
        }
    }
}
</script>
