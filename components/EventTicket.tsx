'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

interface EventTicketProps {
  price?: string;
  date?: string;
  time?: string;
  location?: string;
}

export default function EventTicket({
  price = 'VIP $200',
  date = '29 de Abril del 2025',
  time = '9:00 a.m. - 6:00 p.m.',
  location = 'Tecmilenio Campus San Nicolás'
}: EventTicketProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <Card className="overflow-hidden border-0 shadow-lg flex flex-col sm:flex-row w-full">
        <div className="bg-[#004d40] text-white p-3 sm:p-4 md:p-6 flex-grow">
          <div className="flex justify-between items-start">
            <div className="w-full">
              <h3 className="text-xs sm:text-sm font-medium mb-1">#leadyourpath</h3>
              <div className="mb-4 sm:mb-6 md:mb-8">
                <Image 
                  src="/tecmitalk-logo.svg" 
                  alt="TECMITALK" 
                  width={300} 
                  height={80} 
                  className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px]" 
                  priority
                />
              </div>
            </div>
          </div>
          
          <div className="mt-2 sm:mt-auto space-y-2 flex flex-wrap">
            <div className="inline-block border border-white/30 rounded-full px-2 sm:px-3 md:px-4 py-1 text-xs sm:text-sm mr-1 mb-1">
              {date}
            </div>
            <div className="inline-block border border-white/30 rounded-full px-2 sm:px-3 md:px-4 py-1 text-xs sm:text-sm mr-1 mb-1">
              {time}
            </div>
            <div className="inline-block border border-white/30 rounded-full px-2 sm:px-3 md:px-4 py-1 text-xs sm:text-sm mb-1">
              {location}
            </div>
          </div>
          
          <div className="mt-3 sm:mt-4 md:mt-6 flex items-center justify-between sm:justify-start sm:space-x-2 md:space-x-4">
            <div className="w-16 sm:w-20 md:w-24">
              <Image src="/logo.png" alt="FETECMI" width={80} height={30} className="w-full" />
            </div>
            <div className="w-16 sm:w-20 md:w-24">
              <Image src="/logo.png" alt="TECMILENIO" width={80} height={30} className="w-full" />
            </div>
            <div className="w-16 sm:w-20 md:w-24">
              <Image src="/logo.png" alt="VIVE" width={80} height={30} className="w-full" />
            </div>
          </div>
        </div>
        
        <div className="bg-[#a5d6a7] w-full sm:w-1/4 p-3 sm:p-4 flex flex-col justify-between relative">
          <div>
            <div className="absolute top-2 right-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#e91e63] flex items-center justify-center">
                <span className="text-white text-[10px] sm:text-xs">VIP</span>
              </div>
            </div>
            <h3 className="text-[#004d40] font-bold text-lg sm:text-xl mt-8 sm:mt-10">{price}</h3>
          </div>
          
          <div className="mt-auto">
            {/* Barcode */}
            <div className="space-y-1">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-1 bg-[#004d40]" style={{ opacity: Math.random() * 0.5 + 0.5 }}></div>
              ))}
            </div>
          </div>
        </div>
      </Card>
      
      {/* Perforation */}
      <div className="hidden sm:flex absolute top-0 bottom-0 right-[25%] flex-col justify-between py-2">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-white"></div>
        ))}
      </div>
    </div>
  );
}