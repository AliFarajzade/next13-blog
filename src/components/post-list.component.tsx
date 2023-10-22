import PostItem from '@/components/post-item.component'
import { getPostsMeta } from '@/lib/md-parser.util'

const PostList = async () => {
    const posts = await getPostsMeta()

    if (posts === undefined) return <p className="mt-10 text-center">No posts available</p>

    return (
        <section className="mt-6 mx-auto max-w-2xl">
            <h2 className="text-4xl font-bold text-white/90">Blog</h2>
            <ul className="w-full list-none p-0">
                {posts.map(post => (
                    <PostItem key={post.id} post={post} />
                ))}
            </ul>
        </section>
    )
}

export default PostList
