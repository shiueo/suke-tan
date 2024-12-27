import Link from "next/link";

export default function Guide() {
  return (
    <div className="min-h-full">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight sm:text-4xl">suke-tan 이용 가이드</h1>
      <p className="text-sm leading-7 sm:text-base [&:not(:first-child)]:mt-4">
        Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One
        day, his advisors came to him with a problem: the kingdom was running out of money.
      </p>
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight sm:text-4xl">suke-tan 기여 가이드</h1>
      <p><Link href="https://github.com/shiueo/suke-tan" className="underline decoration-wavy decoration-2 decoration-rose-600 font-bold">suke-tan</Link> 레포지토리의 <Link className="underline decoration-wavy decoration-2 decoration-rose-600 font-bold" href="https://github.com/shiueo/suke-tan/tree/main/data">데이터</Link> 폴더 내의 각 학기에 해당하는 json을 수정해 수업 DB를 반영 가능.</p>
    </div>
  )
}
