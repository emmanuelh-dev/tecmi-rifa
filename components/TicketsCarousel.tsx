'use client';

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import GeneralTicket from './GeneralTicket';
import VipTicket from './VipTicket';
import PriorityTicket from './PriorityTicket';

export default function TicketsCarousel() {
  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-bold text-white text-center mb-6">Nuestros Boletos</h2>
      <p className="text-white text-center mb-8">Desliza para ver los beneficios de cada tipo de boleto</p>
      
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <GeneralTicket />
            </div>
          </CarouselItem>
          <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <VipTicket />
            </div>
          </CarouselItem>
          <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <PriorityTicket />
            </div>
          </CarouselItem>
        </CarouselContent>
        <div className="flex justify-center mt-4">
          <CarouselPrevious className="relative static left-0 right-auto translate-y-0 mr-2" />
          <CarouselNext className="relative static right-0 left-auto translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
}