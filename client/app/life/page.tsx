/**
 * v0 by Vercel.
 * @see https://v0.dev/t/id07a8AgS7e
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  Carousel,
} from "@/components/ui/carousel";
import life from "@/data/life";
import ProjectInfo from "@/data/project";
import Image from "next/image";

export default function Component() {
  return (
    <div className="w-full py-12 lg:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-4 min-h-[400px] justify-center items-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              My Life
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
              Hi, I&apos;m Justin Lang
            </h1>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              I&apos;m a Taiwanese American born in the United States to two
              amazing parents.
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-1 xl:grid-cols-2">
            <div className="col-span-1">
                my life 
            </div>
          <div className="mx-auto max-w-3xl px-4 col-span-1">
            My Childhood
            <Carousel>
              <CarouselContent>
                {life.map((event: any) => (
                  <CarouselItem key={event.id} className="flex justify-center" >
                    <Image
                      alt="Life events"
                      className="object-cover rounded-lg"
                      height={250}
                      src={event.imageRef}
                      style={{
                        aspectRatio: "500/250",
                        objectFit: "cover",
                      }}
                      width={500}
                      
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
