import Image from 'next/image'

interface IProps {
    src: string
    alt: string
    priority?: string
}

const CustomImage: React.FC<IProps> = ({ priority, src, alt }) => {
    const prty = priority ? true : false

    return (
        <div className="w-full h-full">
            <Image
                className="rounded-lg mx-auto"
                src={src}
                alt={alt}
                width={650}
                height={650}
                priority={prty}
            />
        </div>
    )
}

export default CustomImage
