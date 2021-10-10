import axios from 'axios';
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default function usePost(){
    const POST_URL = '/api/posts'
    // Properties
    const posts = ref([]);
    const total = ref(500)
    const perPage = ref(10)
    const post = ref([]);
    const errors = ref('');
    const router = useRouter();

    // Functions
    const getPosts = async () => {
        let response = await axios.get(POST_URL)
        posts.value = response.data.data
        total.value = response.data.meta.total
        perPage.value = response.data.meta.per_page
    }

    const getPost = async (id) => {
        let response = await axios.get(POST_URL +'/'+id)
        post.value = response.data.data
    }

    const storePost = async (data) => {
        errors.value = ''
        try {
            await axios.post(POST_URL,data)
            await router.push({name: 'posts.index'})
        } catch (e) {
            if(e.response.status === 422){
                for(const key in e.response.data.errors){
                    errors.value +=e.response.data.errors[key][0]+' '
                }
            }
        }
    }

    const updatePost = async (id) => {
        errors.value = ''
        try {
            await axios.put(POST_URL+'/'+id, post.value)
            await router.push({name: 'posts.index'})
        } catch (e) {
            if(e.response.status === 422){
                for(const key in e.response.data.errors){
                    errors.value +=e.response.data.errors[key][0]+' '
                }
            }
        }
    }

    const destroyPost = async (id) => {
        if(!window.confirm('Are You Sure?')){
            return
        }
        await axios.delete(POST_URL+'/'+id)
        await getPosts()
    }

    return{
        post,
        total,
        posts,
        errors,
        perPage,
        getPost,
        getPosts,
        storePost,
        updatePost,
        destroyPost
    }
}
