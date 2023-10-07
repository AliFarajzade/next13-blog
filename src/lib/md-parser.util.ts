import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'

const postsPath = path.join(process.cwd(), 'src', 'blogposts')

export function getSortedPosts() {
    const fileNames = fs.readdirSync(postsPath)

    const allPosts = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '')

        const filePath = path.join(postsPath, fileName)
        const content = fs.readFileSync(filePath, 'utf8')

        const matterResult = matter(content)

        const post: TPost = {
            id,
            date: matterResult.data.date,
            title: matterResult.data.title,
        }

        return post
    })

    return allPosts.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsPath, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    const processedContent = await remark().use(html).process(matterResult.content)

    const contentHtml = processedContent.toString()

    const blogPostWithHTML: TPost & { contentHtml: string } = {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        contentHtml,
    }

    return blogPostWithHTML
}
