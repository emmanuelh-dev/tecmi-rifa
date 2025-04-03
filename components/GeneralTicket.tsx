'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

export default function GeneralTicket() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <Card className="overflow-hidden border-0 shadow-lg w-full">
        {/* Header with TECMITALK logo */}
        <div className="bg-[#004d40] text-white p-4 flex justify-center items-center">
          <Image 
            src="/tecmitalk-logo.svg" 
            alt="TECMITALK" 
            width={300} 
            height={80} 
            className="w-full max-w-[250px]" 
            priority
          />
        </div>
        
        {/* Ticket type banner */}
        <div className="flex">
          {/* Left side pattern */}
          <div className="w-[15%] bg-white flex flex-col justify-center items-center">
            <div className="w-full">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-1 bg-gray-300 my-1 mx-auto w-[80%] zigzag"></div>
              ))}
            </div>
          </div>
          
          {/* Ticket type */}
          <div className="w-[85%] bg-[#2196f3] py-3 flex justify-center items-center">
            <h2 className="text-white text-3xl font-bold">GENERAL</h2>
          </div>
        </div>
        
        {/* Ticket content */}
        <div className="bg-[#004d40] text-white p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* First row */}
            <div className="flex items-center">
              <div className="mr-3">
                <svg className="w-8 h-8 text-[#2196f3]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm">Acceso a todas</p>
                <p className="text-sm">las conferencias</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-3">
                <svg className="w-8 h-8 text-[#2196f3]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm">Acceso a taller</p>
                <p className="text-sm">magistral</p>
              </div>
            </div>
            
            {/* Second row */}
            <div className="flex items-center">
              <div className="mr-3">
                <svg className="w-8 h-8 text-[#2196f3]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm">Kit Conmemorativo</p>
              </div>
            </div>
          </div>
          
          {/* Price */}
          <div className="mt-8 text-center">
            <h3 className="text-5xl font-bold text-white">$150</h3>
            <p className="text-xs text-gray-300 mt-1">*boletos limitados*</p>
          </div>
        </div>
      </Card>
    </div>
  );
}