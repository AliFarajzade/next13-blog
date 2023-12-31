import { getFormattedDate } from '@/lib/time.util'
import Link from 'next/link'

interface IProps {
    post: TMeta
}

const PostItem: React.FC<IProps> = ({ post }) => {
    const { id, title, date } = post
    const formattedDate = getFormattedDate(date)

    return (
        <li className="mt-4 text-2xl text-white/90">
            <Link className="underline hover:text-white" href={`/posts/${id}`}>
                {title}
            </Link>
            <br />
            <p className="text-sm mt-1">{formattedDate}</p>
        </li>
    )
}

export default PostItem
