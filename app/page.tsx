"use client"
import Basecontent from "@/components/basecontent"
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState } from "react";


export default function Home() {
    const [title, setTitle] = useState("")
    const router = useRouter();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push(`/search?term=${title}`);
    }

    return (
        <Basecontent>
            <form onSubmit={handleSubmit}>
                <div className="flex min-h-screen items-center justify-center mainbg flex-col">
                    <Image src="/images/logo.svg" width={73} height={83} alt="logo" />
                    <div className="absolute bottom-[30px] flex flex-col wrapper gap-5">
                        <input
                            type="text"
                            placeholder="Artist / Album / Title"
                            className="w-full rounded-full py-3 px-5 text-center"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input type="submit" value="Search" className="py-3 px-5 rounded-full text-white" />
                    </div>
                </div>
            </form>

        </Basecontent>
    )
}
