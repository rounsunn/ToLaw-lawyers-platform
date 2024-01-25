import React from 'react'
import { IoBagOutline } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdChat } from "react-icons/md";

const DesktopProfileView = ({ lawyerData, handleEditButton, handleLogout }) => {
  return (
    <div className="flex max-sm:items-end justify-center items-center font-poppins">
        {/* background */}
        <div className=' absolute top-0 left-0 w-full bg-[#0C253F] h-40 -z-[1]'/>
        {/* max-sm:hidden block */}

        {/* box for large screens */}
        <div className='max-md:mx-10 mx-40 my-10 border-gray-400 border-[1px] rounded-3xl px-5 pt-3 pb-4 w-full shadow-md bg-white z-10'>
            {/* personal info */}
            <div className='flex justify-between items-center gap-5'>
                <div className='flex flex-column items-start gap-2'>
                    {lawyerData ? (
                        <h1 className="text-3xl font-semibold capitalize">{lawyerData?.fullName}</h1>
                    ): (
                        <div className='w-[100px] h-[20px] animate-pulse bg-gray-300 rounded-sm' />
                    )}
                    {lawyerData ? (
                        <h2 className='text-sm italic'>Bar Council Number - {lawyerData?.barCouncilNumber}</h2>
                    ): (
                        <div className='w-[200px] h-[15px] animate-pulse bg-gray-300 rounded-sm'></div>
                    )}
                </div>
                {lawyerData ? (
                    <img src={lawyerData?.profilePic} alt="profile-pic" className="w-24 h-24 object-cover rounded-full border-black border-[1px]" />
                ): (
                    <div className='w-24 h-24 rounded-full animate-pulse bg-gray-300'></div>
                )}
            </div>
            <div className="h-[1px] bg-gray-300 my-3"/>
            {/* work details + add icons */}
            <div className='flex flex-column gap-[2px]'>
                <div className="my-2">
                    <h2 className='text-lg'>Area of Practice</h2>
                    {lawyerData ? (
                        <div className='flex gap-2 flex-wrap'>
                            {lawyerData?.lawArea.map((item, index)=>
                            <p key={index} className="border-[#0C253F] bg-gray-100 p-1 border-[1px] text-sm capitalize">{item}</p>
                            )}
                        </div>
                    ): (
                        <div className='w-full h-[15px] animate-pulse bg-gray-200 rounded-sm my-1'></div>
                    )}
                </div>
                {lawyerData ? (
                    <div className='flex gap-2 items-center'>
                        <IoBagOutline className="h-4 w-4 text-[#0C253F]" /> 
                        <p>{lawyerData?.experience}+ years of Experience</p>
                    </div>
                    ): (
                    <div className='w-1/2 h-[15px] animate-pulse bg-gray-200 rounded-sm my-1'></div>
                )}

                {lawyerData ? (
                    <div className='flex gap-2 items-center'>
                        <FaMapMarkerAlt className="h-4 w-4 text-[#0C253F]" /> 
                        <p className='capitalize'>{lawyerData?.region}</p>
                    </div>
                ): (
                    <div className='w-1/3 h-[15px] animate-pulse bg-gray-200 rounded-sm my-1'></div>
                )}
                
                {lawyerData ? (
                    <div className='flex gap-2 items-center'>
                        <MdChat className="h-4 w-4 text-[#0C253F]" /> 
                        {lawyerData?.languages.map((item, index)=>
                        <p key={index} className='capitalize'>{item}</p>
                        )}
                    </div>
                ): (
                    <div className='w-1/2 h-[15px] animate-pulse bg-gray-200 rounded-sm my-1'></div>
                )}
                
            </div>
            <div className="h-[1px] bg-gray-300 my-3"/>
            {/* bio + certificates */}
            <div className=''>
                <div>
                    <h3 className='mb-1'>Biography</h3>
                    {lawyerData ? (
                        <p className='text-sm text-gray-400 tracking-wide'>{lawyerData?.biography}</p>
                    ): (
                        <div className='w-full h-[15px] animate-pulse bg-gray-200 rounded-sm my-2'></div>
                    )}
                </div>
                {lawyerData?.lawCertificate && 
                <img src={lawyerData?.lawCertificate}  alt="law certificate" />
                }
            </div>
            <div className="h-[1px] bg-gray-300 my-3"/>
            {/* charges */}
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl'>Consultation Services</h2>
                <div className='flex justify-between items-center gap-4'>
                    {lawyerData ? (
                        <div>Duration - {lawyerData?.consultingDuration} minutes</div>
                    ): (
                        <div className='w-1/2 h-[15px] animate-pulse bg-gray-300 rounded-sm'></div>
                    )}
                    {lawyerData ? (
                        <div>Charges - ₹{lawyerData?.charges}/hr</div>
                    ): (
                        <div className='w-1/2 h-[15px] animate-pulse bg-gray-300 rounded-sm'></div>
                    )}
                </div>
            </div>
            <div className="h-[1px] bg-gray-300 my-3"/>
            {/* edit */}
            <div className="flex flex-col gap-2">
                <button onClick={handleEditButton} className='w-full bg-[#0C253F] text-white py-2 rounded-md'>
                    Edit your Profile
                </button>
                <button onClick={handleLogout} className='w-full bg-blue-900 text-white py-2 rounded-md'>
                    Logout
                </button>
            </div>
        </div>

    </div>
  )
}

export default DesktopProfileView