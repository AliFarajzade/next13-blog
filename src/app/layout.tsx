import { interFont } from '@/lib/next-font.lib'
import '@/styles/globals.css'

interface IProps {
    children: React.ReactNode
}

const RootLayout: React.FC<IProps> = ({ children }) => {
    return (
        <html lang="en">
            <body className={interFont.className}>{children}</body>
        </html>
    )
}

export default RootLayout
