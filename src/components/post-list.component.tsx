import PostItem from '@/components/post-item.component'
import { getSortedPosts } from '@/lib/md-parser.util'

const PostList: React.FC = () => {
    const posts = getSortedPosts()

    return (
        <section className="mt-6 mx-auto max-w-2xl">
            <h2 className="text-4xl font-bold text-white/90">Blog</h2>
            <ul className="w-full">
                {posts.map(post => (
                    <PostItem key={post.id} post={post} />
                ))}
            </ul>
        </section>
    )
}

export default PostList
