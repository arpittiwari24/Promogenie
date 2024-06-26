'use client'
import { myStore } from "@/app/store/MyStore"
import { usePremiumContext } from "@/components/IsPremium"
import Navbar from "@/components/Navbar"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { useEffect } from "react"
import { MdOutlineCheck } from "react-icons/md";


const Pricing = () => {

  //   const Yearly = "https://promogenie2.lemonsqueezy.com/buy/47e6a174-e7ed-4442-91a3-d17b912da47b"

  // const Monthly = "https://promogenie2.lemonsqueezy.com/buy/72a4ef4b-30cf-4e7e-8d1c-2c8ca330b792"

  // const handleClick = () => {
  //   window.location.replace(Yearly)
  // }

  // const handleClick2 = () => {
  //   window.location.replace(Monthly)
  // }
  // const {user}=useUser()

  // const userProfile=myStore(state=>state.user)
  // const setUserProfile=myStore(state=>state.setUser)
  // const {data: session} = useSession()
  // useEffect(()=>{
  //   const getUser=()=>{
  //     if(session?.user){
  //       setUserProfile(session.user)
  //     }
  //   }
  //   getUser()
  // },[session])
  // console.log(userProfile)
  const router=useRouter()

    const premium = usePremiumContext()
    // console.log(premium)
  const data=[

    {
        id:2,
        heading:'MOST POPULAR',
        priceCategory:'Monthly',
        cost:'10',
        features:[
            'Unlimited generations.',
            'Unlimited access to templates.',
            'Priority customer support.'
        ],
        btnBeforeSession:'Sign In',
        btnAfterSession:'Explore more',

    },
    {
        id:3,
        heading:'-30% DISCOUNTED',
        priceCategory:'Yearly',
        cost:'85',
        features:[
            'Save 30% with this plan.',
            'Unlimited generations.',
            'Unlimited access to templates.',
        ],
        btnBeforeSession:'Sign In',
        btnAfterSession:'Explore more',
    },

]


  return (
    <div className="bg-black bg-grid-gray-100/[0.1] pt-28" id="pricing">
    <div className="px-4 py-20  sm:px-6 mx-auto text-white">

<div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
  <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-fuchsia-200">Pricing</h2>
  <p className="mt-1 bg-clip-text text-transparent bg-gray-400">Whatever your status, our offers evolve according to your needs.</p>
</div>

<div className="mt-12 grid sm:grid-cols-1 sm:px-16 lg:grid-cols-3 gap-8 lg:items-center">

    {data.map((item)=>(
      <div key={item.id} className={`${item.id ===2?'lg:px-[16.3px] lg:py-[21.8px] px-[2px] py-[2.2px]':'p-[1px]'} rounded-xl bg-gradient-to-r from-indigo-500  to-purple-500`}>
        <div  className={`flex flex-col  bg-black  rounded-xl text-center  shadow-xl  p-8 ${item.id === 2 ? 'lg:scale-110 ':''} `} >
        <p className="mb-3"><span className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs uppercase  bg-blue-100  ${(item.heading === '-30% DISCOUNTED') ? 'text-green-600 font-extrabold':'text-blue-800 font-semibold'} `}>{item.heading}</span></p>
        <h4 className="font-medium text-lg  ">{item.priceCategory}</h4>
        <span className="mt-5 font-bold text-5xl">
          <span className={`font-bold text-2xl ${item.cost==='Free'?'hidden':''}`}>$</span>
          <span className={`mt-5 font-bold text-5xl ${item.cost==='Free'?'':'line-through '} `}>{item.cost}</span>
          <span className={`font-bold text-2xl ml-1 capitalize  ${item.cost==='Free'?'hidden':''}`}>Free</span>
        </span>

        {item.features.map((ft,index)=>(
      <div key={index} className="mt-7 flex flex-col justify-center items-start space-y-2.5 text-sm">
            <div className="flex gap-x-2 justify-start items-center">
                <div className="w-4 h-4">
               <MdOutlineCheck className="text-blue-600 " />
                </div>
                <p>{ft}</p>
            </div>
    </div>
        ))}


      </div>
      </div>
    ))}




</div>
</div>
</div>
  )
}

export default Pricing
