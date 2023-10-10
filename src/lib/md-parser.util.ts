export async function getPostsMeta(): Promise<TMeta[] | undefined> {
    const res = await fetch(
        'https://api.github.com/repos/alifarajzade/next13-blogposts/git/trees/master?recursive=1',
        {
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28',
            },
        }
    )
}
