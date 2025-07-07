import { getAuthUser } from '@/utils/getUser';
import { CalendarHeart, Stethoscope } from 'lucide-react'
import React from 'react'

export default async function VisitStatus() {
    const user = await getAuthUser();

    const role = user?.user_metadata?.role || "PATIENT";
    return (
        <div className='cursor-pointer'>
            {role === "PATIENT" ? (<CalendarHeart />) : (<Stethoscope />)  }
        </div>
    )
}
