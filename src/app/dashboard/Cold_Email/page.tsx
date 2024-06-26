'use client'
import GenerationComp from "@/components/GenerationComp"
import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { getCurrentDate } from "@/lib/GetCurrentDate"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { FaArrowLeft } from "react-icons/fa"

const Page = () => {
    const {data: session} = useSession()
  const [company,setCompany]=useState<string>('')
  const [senderName,setSenderName]=useState<string>('')
  const [receiverName,setReceiverName]=useState<string>('')
  const [workxp,setWorkxp]=useState<string>('')
  const [field,setField]=useState<string>('')
  const [tools,setTools]=useState<string>('')
  const [role, setRole] = useState<string>('');
  const [generations,setGenerations]=useState<string>('')
  const [isLoading,setIsLoading]=useState<boolean>(false)
  // console.log(const userEmail= session?.user?.email)
  const userEmail= session?.user?.email
  const userPrompt=`Generate a cold email from sender name as ${senderName} to a receiver name as ${receiverName} for a ${role} role in the field of ${field} considering a work exp of ${workxp} and having a great knowledge of building things on ${tools}`
  const currentDate=getCurrentDate()
  // console.log(role);
  const roles = [
    {
        id: 1,
        value: 'Internship', 
        label: 'Internship',
    },
    {
        id: 2,
        value: 'Full-time', 
        label: 'Full-time',
    },
    {
        id: 3,
        value: 'Contract-based',
        label: 'Contract-based'
    },
    {
        id: 4,
        value: 'Freelance',
        label: 'Freelance'
    }
]
  const handleSubmit=async(event: React.FormEvent)=>{
        setIsLoading(true)
        setGenerations('')
        event.preventDefault()
        try{
            const res= await axios.post('https://marketing-7do1.onrender.com/email',{
                email:userEmail,
                prompt:userPrompt,
                title:`Cold email for a ${role} in ${field} at ${company}`,
                presentDate:currentDate,
                type:'Cold-Email',
            })
            // console.log(res.data)
            // console.log(res)
            setGenerations(res.data.response)
            setIsLoading(false)
            setSenderName('')
            setCompany('')
            setReceiverName('')
            setWorkxp('')
            setField('')
            setRole('')
            setTools('')
        }catch(err:any){
            setIsLoading(false)
            console.log(err);
        }finally{
            setIsLoading(false)
        }
  }
  return (
    <div className="w-full h-full  flex flex-col items-center">
      <div className="pt-20 flex items-center justify-center p-4 text-white">
            <Link href='/dashboard'>
            <FaArrowLeft className="hover:cursor-pointer w-6 h-6 lg:hidden mb-10 text-gray-400" />
            </Link>
            <Heading
            title='Cold Email Generator'
            description="The best cold email generator for all your referral needs"
            color="text-red-500"
            />
        </div>
        <div className="w-full md:w-[60%] lg:w-[40%] mx-auto px-4">
            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-2">
                    <input type="text" aria-required className="p-3 focus:outline-none text-gray-300 rounded-lg bg-black w-full placeholder:text-gray-400" required value={company} placeholder="Name of the company" onChange={(e)=>setCompany(e.target.value)} />
                </div>

                <div className="flex flex-col gap-y-2">
                    <input type="text" aria-required className="p-3 focus:outline-none text-gray-300 rounded-lg bg-black w-full placeholder:text-gray-400" required value={senderName} placeholder="Your Name" onChange={(e)=>setSenderName(e.target.value)} />
                </div>
            
                <div className="flex flex-col gap-y-2">
                    <input type="text" aria-required className="p-3 focus:outline-none text-gray-300 rounded-lg bg-black w-full placeholder:text-gray-400" required value={receiverName} placeholder="Receiver's name" onChange={(e)=>setReceiverName(e.target.value)} />
                </div>

                <div className="flex flex-col gap-y-2">
                    <input type="text" aria-required className="p-3 focus:outline-none text-gray-300 rounded-lg bg-black w-full placeholder:text-gray-400" required value={workxp} placeholder="Work experience in years/months" onChange={(e)=>setWorkxp(e.target.value)} />
                </div>

                {/* select  */}
                      <select
                        className="rounded-lg p-2  bg-black hover:outline-none focus:outline-none text-gray-400"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}>
                        {roles.map((role) => (
                            <option className="" value={role.value} key={role.id}>{role.label}</option>
                        ))}
                    </select>
 
                <div className="flex flex-col gap-y-2">
                    <input type="text" aria-required className="p-3 focus:outline-none text-gray-300 rounded-lg bg-black w-full placeholder:text-gray-400" required value={field} placeholder="Name of the position that you are applying for" onChange={(e)=>setField(e.target.value)} />
                </div>

                <div className="flex flex-col gap-y-2">
                    <input type="text" aria-required className="p-3 focus:outline-none text-gray-300 rounded-lg bg-black w-full placeholder:text-gray-400" required value={tools} placeholder="Tools on which you are building stuff" onChange={(e)=>setTools(e.target.value)} />
                </div>

                <div className="flex flex-col gap-y-2">
                </div>
                <Button disabled={isLoading || (!senderName ||!receiverName ||!company||!workxp||!tools||!role||!field)} variant={'default'} className="w-full hover:scale-90 duration-200 text-base bg-red-500 hover:bg-red-500 font-semibold transition-all"> {isLoading?(<>Generating... <Loader2 className="h-4 w-4 animate-spin ml-1"/></>):(<>Submit</>)} </Button>
            </form>
        </div>
        <div className=" w-[80%] lg:ml-[15rem] overflow-x-hidden mt-24 ">
          {generations && generations.length > 0 && <GenerationComp data={generations} bgColor='bg-red-500/10' borderColor='border-red-500/10' />}
        </div>
    </div>
  )
}

export default Page