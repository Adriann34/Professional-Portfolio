"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { cn } from "@/lib/utils";

export type CarouselApi = UseEmblaCarouselType[1];
type CarouselContextValue = { viewportNode: ReturnType<typeof useEmblaCarousel>[0] };
const CarouselContext = React.createContext<CarouselContextValue | null>(null);

export function Carousel({ opts, setApi, className, children, ...props }: React.ComponentProps<"div"> & { opts?: Parameters<typeof useEmblaCarousel>[0]; setApi?: (api: CarouselApi) => void }) {
  const [carouselRef, api] = useEmblaCarousel(opts);
  React.useEffect(() => { if (api) setApi?.(api); }, [api, setApi]);
  const move = React.useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); api?.scrollPrev(); }
    if (event.key === "ArrowRight") { event.preventDefault(); api?.scrollNext(); }
  }, [api]);
  return <CarouselContext.Provider value={{ viewportNode: carouselRef }}><div className={cn("relative", className)} role="region" aria-roledescription="carousel" onKeyDownCapture={move} {...props}>{children}</div></CarouselContext.Provider>;
}

export function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("CarouselContent must be used within Carousel");
  // Embla returns a callback ref; the hooks rule cannot infer that through context.
  // eslint-disable-next-line react-hooks/refs
  return <div ref={context.viewportNode} className="overflow-hidden"><div className={cn("flex -ml-4", className)} {...props} /></div>;
}

export function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div role="group" aria-roledescription="slide" className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)} {...props} />;
}
