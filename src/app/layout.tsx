import Navbar from '@/components/navbar.component'
import { interFont } from '@/lib/next-font.lib'
import '@/styles/globals.css'
import { classNames } from '@/util/styles.util'

interface IProps {
    children: React.ReactNode
}

export const metadata = {
    title: "Ali's Blog",
    description: 'Created by Ali Farajzade',
}

const RootLayout: React.FC<IProps> = ({ children }) => {
    return (
        <html lang="en">
            <body className={classNames(interFont.className, 'bg-slate-800')}>
                <Navbar />

                {children}
            </body>
        </html>
    )
}

export default RootLayout
