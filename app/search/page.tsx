"use client"

import Basecontent from "@/components/basecontent"
import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import Skeleton from "@/components/Skeleton";
import { getData } from "@/lib/services";
import ErrorNetwork from "@/components/errorNetwork";
import { useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { Suspense } from 'react'
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog"
import { TbFaceIdError } from "react-icons/tb";


function ContentMusic() {
    const searchParams = useSearchParams()
    const search = searchParams.get('term')
    const [title, setTitle] = useState("")

    const [limit, setLimit] = useState(4)
    const [term, setTerm] = useState(search)
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        refetch();
        setTerm(title)
        router.push(`/search?term=${title}`);
    }

    const getQuery = async () => {
        return await getData(`/search?term=${title !== "" ? title : term}+&limit=${limit}`)
    }
    const handleLoadMore = () => {
        setLimit((prevLimit) => prevLimit + 2);
        refetch();
    }
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["newarticles"],
        queryFn: getQuery
    })

    if (isLoading) {
        return (
            <div className="wrapper">
                <Skeleton width="100%" height="300px" spaceBottom="5px" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="max-w-[900px] mx-auto">
                <ErrorNetwork />
            </div>
        )
    }
    const dataContent = data?.data.results

    console.log(dataContent)

    return (
        <div className="bg-white min-h-screen">
            <div className="sticky top-0">
                <div className="wrapper bg-[#f8fafc]">
                    <div className="bgheader pt-4 pb-9">
                        <div className="flex justify-between items-center px-4">
                            <div>
                                <Image src="/images/menu.svg" alt="menu" width={16} height={13} />
                            </div>
                            <Link href="/">
                                <Image src="/images/logo-text.svg" width={73} height={16} alt="logo" />
                            </Link>
                            <Dialog>
                                <DialogTrigger>
                                    <Image src="/images/search.svg" alt="search" width={16} height={16} className="cursor-pointer" />
                                </DialogTrigger>
                                <DialogContent>
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex flex-col wrapper gap-5">
                                            <h4 className="text-white text-center">Search</h4>
                                            <input
                                                type="text"
                                                placeholder="Artist / Album / Title"
                                                className="w-full rounded-full py-3 px-5 text-center"
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                            <DialogClose asChild>
                                                <input type="submit" value="Search" className="py-3 px-5 rounded-full text-white bggradient-cs cursor-pointer" />
                                            </DialogClose>
                                        </div>
                                    </form>

                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <div className="flex gap-2 py-9 mx-auto text-center items-center justify-center text-[14px]">
                        Search result for : <div className="text-[#7b34dd] text-[18px] font-bold">{term}</div>
                    </div>
                    {
                        dataContent.length > 0 ?
                            <div className="relative px-5 py-5">
                                {
                                    dataContent.map((item: any, key: number) => {
                                        return (
                                            <div className="flex bg-white rounded-[10px] my-5 shadow-custom" key={key}>
                                                <div className="rounded-[5px] flex overflow-hidden p-3 gap-3  w-full">
                                                    <div className="w-[100px] h-[100px]"><Image src={item.artworkUrl100} alt="image" width={100} height={100} /></div>
                                                    <div className="relative flex flex-col justify-between py-1  flex-1">
                                                        <div className="relative">
                                                            <h5 className="text-[10px] font-medium">{item.artistName}</h5>
                                                            <Link href={`${item.trackViewUrl}`} target="_blank" className="text-[14px] font-bold capitalize">{item.collectionName}</Link>
                                                        </div>
                                                        <div className="flex justify-between w-full items-center">
                                                            <div className="bg-[#10b981] text-[10px] text-white rounded-xl px-3 py-1 uppercase">{item.kind}</div>
                                                            {
                                                                item.trackPrice && <div className="flex gap-1">
                                                                    <Image src="/images/currency-dollar.svg" alt="currency" width={18} height={18} />
                                                                    <div className="text-[#f5b014] text-[12px] font-bold ">{item.trackPrice}</div>
                                                                </div>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="flex justify-center my-10">
                                    <div className="bg-[#e2e8f0]  hover:bg-slate-400 hover:text-white cursor-pointer rounded-3xl py-3 px-10 text-center inline-block mx-auto" onClick={handleLoadMore}>Load More</div>
                                </div>
                            </div>
                            : <div className="wrapper text-center py-20">
                                <div className="flex justify-center">
                                    <div className="text-center">
                                        <TbFaceIdError className="mx-auto text-8xl text-red-500" />
                                        <h3 className="text-2xl block mb-7">Data Not Found</h3>
                                        <Link href="/" className="bggradient-cs text-white px-11 mt-9 py-3 rounded-full">Home</Link>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default function SearchPage() {

    return (
        <Basecontent>
            <Suspense>
                <ContentMusic />
            </Suspense>
        </Basecontent>
    )
}
