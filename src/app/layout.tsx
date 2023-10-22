import Navbar from '@/components/navbar.component'
import { interFont } from '@/lib/next-font.lib'
import '@/styles/globals.css'
import { classNames } from '@/util/styles.util'
import { Metadata } from 'next'

interface IProps {
    children: React.ReactNode
}

export const metadata: Metadata = {
    title: "Ali's Blog",
    description: 'Created by Ali Farajzade',
}

const RootLayout: React.FC<IProps> = ({ children }) => {
    return (
        <html lang="en">
            <body className={classNames(interFont.className, 'bg-slate-800')}>
                <Navbar />
                <main className="px-4 md:px-6 prose prose-xl prose-invert mx-auto">{children}</main>
            </body>
        </html>
    )
}

export default RootLayout
