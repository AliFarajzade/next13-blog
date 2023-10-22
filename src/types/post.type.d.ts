type TMeta = {
    id: string
    title: string
    date: string
    tags: string[]
}

type TBlogPost = {
    meta: TMeta
    content: ReactElement<any, string | JSXElementConstructor<any>>
}
