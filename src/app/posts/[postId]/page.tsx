import { getPostData, getSortedPosts } from '@/lib/md-parser.util'
import { getFormattedDate } from '@/lib/time.util'
import { Metadata, NextPage } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface IProps {
    params: {
        postId: string
    }
}

export function generateStaticParams() {
    const posts = getSortedPosts()

    return posts.map(p => ({
        postId: p.id,
    }))
}

export function generateMetadata({ params: { postId } }: IProps): Metadata {
    const posts = getSortedPosts()

    const post = posts.find(p => p.id === postId)

    if (!post)
        return {
            title: 'Post not found',
        }

    return {
        title: post.title,
    }
}

const Page: NextPage<IProps> = async ({ params: { postId } }) => {
    const posts = getSortedPosts()

    const post = posts.find(p => p.id === postId)

    if (!post) return notFound()

    const { title, date, contentHtml } = await getPostData(postId)
    const formattedDate = getFormattedDate(date)

    return (
        <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
            <h1 className="text-3xl mt-4 mb-0">{title}</h1>
            <p className="mt-0">{formattedDate}</p>
            <article>
                <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
                <p>
                    <Link href="/">← Back to home</Link>
                </p>
            </article>
        </main>
    )
}

export default Page
