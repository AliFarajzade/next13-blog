import CustomImage from '@/components/custom-image.component'
import Video from '@/components/video.componentt'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'

type TFileTree = {
    tree: { path: string }[]
}

const generalHeader = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28',
}

export async function getPostByName(fileName: string): Promise<TBlogPost | undefined> {
    const res = await fetch(
        `https://raw.githubusercontent.com/alifarajzade/next13-blogposts/master/${fileName}`,
        {
            headers: {
                ...generalHeader,
            },
        }
    )

    if (!res.ok) return undefined

    const rawMDX = await res.text()

    if (rawMDX === '404: Not Found') return undefined

    const { content, frontmatter } = await compileMDX<{
        title: string
        date: string
        tags: string[]
    }>({
        source: rawMDX,
        components: { Video, CustomImage },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    rehypeSlug,
                    // @ts-ignore
                    rehypeHighlight,
                    [
                        rehypeAutolinkHeadings,
                        {
                            behavior: 'wrap',
                        },
                    ],
                ],
            },
        },
    })

    const id = fileName.replace(/\.mdx$/, '')

    const blogPostObj: TBlogPost = {
        meta: {
            id,
            title: frontmatter.title,
            date: frontmatter.date,
            tags: frontmatter.tags,
        },
        content,
    }

    return blogPostObj
}

export async function getPostsMeta(): Promise<TMeta[] | undefined> {
    const res = await fetch(
        'https://api.github.com/repos/alifarajzade/next13-blogposts/git/trees/master?recursive=1',
        {
            headers: {
                ...generalHeader,
            },
        }
    )

    if (!res.ok) return undefined

    const repoFileTree: TFileTree = await res.json()

    const filesArray = repoFileTree.tree.map(o => o.path).filter(p => p.endsWith('.mdx'))

    const posts: TMeta[] = []

    for (const file of filesArray) {
        const post = await getPostByName(file)

        if (post) posts.push(post.meta)
    }

    return posts
}
