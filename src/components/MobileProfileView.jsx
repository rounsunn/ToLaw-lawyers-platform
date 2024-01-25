import React from 'react';
import logo from "../assets/full_logo.png";
import { IoBagOutline } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdChat } from "react-icons/md";

const MobileProfileView = ({ lawyerData, handleEditButton, handleLogout }) => {
    const backgroundImageStyle = {
        backgroundImage: `url(${lawyerData?.profilePic})`,
      };
  return (
    <div className='w-screen h-screen flex flex-col font-poppins'>
        <div className="bg-[#0C253F] h-24 w-full flex items-center justify-center">
            <img src={logo} alt="logo" className="object-contain w-20 h-20 py-1"/>
        </div>
        <div className="absolute top-24 h-50 w-full bg-cover bg-center z-1 p-2" style={backgroundImageStyle} />

        <div className="flex-grow flex flex-col justify-end">
            {/* main container */}
            <div className="bg-[#F6FAFC] items-end z-20 p-4 border-black border-1 rounded-t-[27px]">
                {/* personal info */}
                <div className='flex justify-between items-center my-2'>
                    <div className='flex flex-column items-start gap-2'>
                        {lawyerData ? (
                            <h1 className="text-3xl font-light capitalize">{lawyerData?.fullName} </h1>
                        ) : (
                            <div className='w-[100px] h-[20px] animate-pulse bg-gray-300 rounded-sm' />
                        )}
                        {lawyerData ? (
                            <h2 className='text-sm italic'>Bar Council Number - {lawyerData?.barCouncilNumber}</h2>
                        ) : (
                            <div className='w-[200px] h-[15px] animate-pulse bg-gray-300 rounded-sm'></div>
                        )}
                    </div>
                    {lawyerData ? (
                        <img src={lawyerData?.profilePic} alt="profile-pic" className="w-24 h-24 object-cover rounded-full border-black border-[1px]" />
                    ): (
                        <div className='w-24 h-24 rounded-full animate-pulse bg-gray-300'></div>
                    )}
                </div>

                <div className="my-3">
                    <h2 className='text-neutral-800 text-md font-normal mb-1'>Area of Practice</h2>
                    {lawyerData ? (
                        <div className='flex gap-2 flex-wrap'>
                            {lawyerData?.lawArea.map((item, index)=>
                            <p key={index} className="opacity-70 text-slate-900 font-normal text-sm p-1 rounded-md border-1 border-blue-900 capitalize">{item}</p>
                            )}
                        </div>
                    ): (
                        <div className='w-full h-[15px] animate-pulse bg-gray-200 rounded-sm my-1'></div>
                    )}
                </div>

                {/* bio + certificates */}
                <div className='my-3'>
                    <div>
                        <h3 className='text-neutral-800 text-md font-normal'>Biography</h3>
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

                {/* work details + add icons */}
                <div className='flex flex-column gap-[2px] my-3'>
                    
                    {lawyerData ? (
                    <div className='flex gap-2 items-center mb-1'>
                        <IoBagOutline className="h-4 w-4 text-[#75B1CE]" /> 
                        <p className="text-sm">{lawyerData?.experience}+ years of Experience</p>
                    </div>
                    ): (
                        <div className='w-1/2 h-[15px] animate-pulse bg-gray-200 rounded-sm my-1'></div>
                    )}

                    {lawyerData ? (
                        <div className='flex gap-2 items-center mb-1'>
                            <FaMapMarkerAlt className="h-4 w-4 text-[#75B1CE]" /> 
                            <p className='capitalize text-sm'>{lawyerData?.region}</p>
                        </div>
                    ): (
                        <div className='w-1/3 h-[15px] animate-pulse bg-gray-200 rounded-sm my-1'></div>
                    )}

                    {lawyerData ? (
                    <div className='flex gap-2 items-center mb-1'>
                        <MdChat className="h-4 w-4 text-[#75B1CE]" /> 
                        {lawyerData?.languages.map((item, index)=>
                        <p key={index} className='text-sm capitalize'>{item}</p>
                        )}
                    </div>
                    ): (
                        <div className='w-1/2 h-[15px] animate-pulse bg-gray-200 rounded-sm my-1'></div>
                    )}
                    </div>


                {/* charges */}
                <div className='flex flex-col gap-1 my-3'>
                    <h2 className='text-neutral-800 text-md font-normal'>Consultation Services</h2>
                    <div className='flex justify-between items-center gap-5'>
                        {lawyerData ? (
                            <div className='text-neutral-800 text-sm font-normal'>Duration - {lawyerData?.consultingDuration} minutes</div>
                        ): (
                            <div className='w-1/2 h-[15px] animate-pulse bg-gray-300 rounded-sm'></div>
                        )}
                        {lawyerData ? (
                            <div className='text-neutral-800 text-sm font-normal'>Charges - ₹{lawyerData?.charges}/hr</div>
                        ): (
                            <div className='w-1/2 h-[15px] animate-pulse bg-gray-300 rounded-sm'></div>
                        )}
                    </div>
                </div>

                {/* edit */}
                <div className="flex gap-2 mt-2">
                    <button onClick={handleEditButton} className='w-full bg-[#0C253F] text-white py-2 rounded-md'>
                        Edit your Profile
                    </button>
                    <button onClick={handleLogout} className='w-full bg-blue-900 text-white py-2 rounded-md'>
                        Logout
                    </button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default MobileProfileView;
