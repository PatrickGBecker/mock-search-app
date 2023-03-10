import React, { useState } from 'react'
import nucasaLogo from '../public/nucasa-logo.png';
import Image from 'next/legacy/image';
import { 
    GlobeAltIcon, 
    MenuIcon, 
    UserCircleIcon,
    UsersIcon,  
    SearchIcon, 
} from '@heroicons/react/solid';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';

function Header({ placeholder }) {
    const [searchInput, setSearchInput] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);
    const router = useRouter();

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }
    
    const search = () => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests,
            }
        })
    }

    const resetInput = () => {
        setSearchInput('');
    }
    
    const handleSelect = ( ranges )=> {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

  return (
    <header className='sticky top-0 z-50 grid 
    grid-cols-3 bg-[#74a7af] shadow-md  px-5 md:px-10'>

        {/* left */}
        <div onClick={() => router.push('/')} 
        className='relative flex items-center h-20 ml-8
        cursor-pointer my-auto'>
            <div className='mt-5 sm:mt-10 sm:mr-8 md:mt-12'>
            </div>
        </div>
        {/* middle */}
        <div className='flex items-center h-10 mt-5 md:border-2 rounded-full py-2 
        md:shadow-sm'>
            <input 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className='flex-grow pl-5 bg-transparent outline-none 
                text-sm text-white placeholder-white' 
                type='text' 
                placeholder={placeholder || 'Start your search'} />
              <SearchIcon className='hidden md:inline-flex h-8 bg-[#e0474c]
             text-white rounded-full p-2 cursor-pointer md:mx-2 ' />
        </div>
        {/* right */}
        {/*<div className='flex items-center space-x-4 justify-end text-white'>
            <p className='hidden md:inline cursor-pointer'>Become a Host</p>
            <GlobeAltIcon className='h-6 cursor-pointer'/>

            <div className='flex items-center space-x-2 border-2 p-2 rounded-full'>
                <MenuIcon className='h-6' />
                <UserCircleIcon className='h-6' />
  </div>*/}
        
        
        {searchInput && (
            <div className='flex flex-col col-span-3 mx-auto pb-2'>
                <DateRangePicker 
                    ranges={[selectionRange]} 
                    minDate={new Date()}
                    rangeColors={['#ea773d']}
                    onChange={handleSelect}
                />
                <div className='flex items-center border-b mb-4'>
                    <h2 className='text-white text-2xl flex-grow font-semibold'
                    >Number of Guests</h2>

                      <UsersIcon className='text-[white] px-2 h-5' />
                    <input 
                    value={noOfGuests}
                    onChange={(e) => setNoOfGuests(e.target.value)}
                    min={1}
                    type='number' 
                    className='w-12 pl-2 text-lg text-red-400 outline-none'/>
                </div>
                <div className='flex'>
                      <button onClick={resetInput} className='flex-grow text-gray-500 hover:text-[#FF5A5F]'>Cancel</button>
                      <button onClick={search} className='flex-grow text-[#ea773d] hover:text-[#FF5A5F]'>Search</button>
                </div>
            </div>
            )}
    </header>
  )
}

export default Header
