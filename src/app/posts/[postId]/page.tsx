import { getPostByName, getPostsMeta } from '@/lib/md-parser.util'
import { getFormattedDate } from '@/lib/time.util'
import 'highlight.js/styles/github-dark.css'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface IProps {
    params: {
        postId: string
    }
}

export const revalidate = 1 * 24 * 60 * 60

export async function generateStaticParams() {
    const posts = await getPostsMeta()

    if (posts === undefined) return []

    return posts.map(p => ({
        postId: p.id,
    }))
}

export async function generateMetadata({ params: { postId } }: IProps): Promise<Metadata> {
    const post = await getPostByName(`${postId}.mdx`)

    if (post === undefined)
        return {
            title: 'Post not found',
        }

    return {
        title: post.meta.title,
    }
}

const Page = async ({ params: { postId } }: IProps) => {
    const post = await getPostByName(`${postId}.mdx`)

    if (post === undefined) return notFound()

    const { content, meta } = post

    const formattedDate = getFormattedDate(meta.date)

    const tags = meta.tags.map((tag, i) => (
        <Link key={i} href={`/tags/${tag}`}>
            {tag}
        </Link>
    ))

    return (
        <>
            <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>
            <h2 className="mt-0 text-sm">{formattedDate}</h2>
            <article>{content}</article>
            <section>
                <h3>Related: </h3>
                <div className="flex flex-wrap gap-4">{tags}</div>
            </section>
            <p className="mb-10">
                <Link href={'/'}>Back to Home</Link>
            </p>
        </>
    )
}

export default Page
