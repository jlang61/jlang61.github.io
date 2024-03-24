/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BsPSlUwqWOD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
 import { Button } from "@/components/ui/button"
 import { Label } from "@/components/ui/label"
 import { Input } from "@/components/ui/input"
 import { Textarea } from "@/components/ui/textarea"
 
 export default function Component() {
   return (
     <>
       <div className="bg-gray-50/95 py-8 lg:py-16">
         <div className="container grid gap-6 px-4 md:px-6">
           <div className="space-y-2 text-center">
             <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Projects by Jenny Lake</h1>
             <p className="mx-auto max-w-2xl text-gray-500 md:text-xl/relaxed dark:text-gray-400">
               Computer Science student passionate about coding. Here are some of my favorite projects.
             </p>
           </div>
           <div className="mx-auto grid max-w-3xl items-start gap-6 lg:max-w-5xl lg:grid-cols-2 xl:gap-8">
             <div className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="absolute inset-0 bg-black/30 backdrop-blur z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <Button className="z-20 translate-y-[-10] group-hover:translate-y-0" variant="outline">
                   View Details
                 </Button>
               </div>
               <img
                 alt="Project thumbnail"
                 className="object-cover"
                 height="250"
                 src="/placeholder.svg"
                 style={{
                   aspectRatio: "500/250",
                   objectFit: "cover",
                 }}
                 width="500"
               />
             </div>
             <div className="grid gap-1">
               <h3 className="text-xl font-semibold">Weather App: A Simple React Application</h3>
               <p className="text-sm text-gray-500 dark:text-gray-400">
                 A simple weather app built using React. It displays the current weather based on the user's location.
               </p>
             </div>
             <div className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="absolute inset-0 bg-black/30 backdrop-blur z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <Button className="z-20 translate-y-[-10] group-hover:translate-y-0" variant="outline">
                   View Details
                 </Button>
               </div>
               <img
                 alt="Project thumbnail"
                 className="object-cover"
                 height="250"
                 src="/placeholder.svg"
                 style={{
                   aspectRatio: "500/250",
                   objectFit: "cover",
                 }}
                 width="500"
               />
             </div>
             <div className="grid gap-1">
               <h3 className="text-xl font-semibold">Weather App: A Simple React Application</h3>
               <p className="text-sm text-gray-500 dark:text-gray-400">
                 A simple weather app built using React. It displays the current weather based on the user's location.
               </p>
             </div>
           </div>
         </div>
       </div>
       <div className="py-12 lg:py-24">
         <div className="container grid gap-6 px-4 md:px-6">
           <div className="mx-auto max-w-2xl space-y-2">
             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
               Weather App: A Simple React Application
             </h2>
             <p className="text-gray-500 dark:text-gray-400">Technologies used:</p>
             <ul className="text-gray-500 list-disc dark:text-gray-400">
               <li>React</li>
               <li>OpenWeather API</li>
               <li>Tailwind CSS</li>
             </ul>
           </div>
           <div className="mx-auto max-w-3xl space-y-4">
             <div className="grid gap-4">
               <img
                 alt="Project thumbnail"
                 className="overflow-hidden rounded-lg object-cover aspect-[2/1] dark:filter dark:grayscale dark:blur-md"
                 height="400"
                 src="/placeholder.svg"
                 width="800"
               />
             </div>
           </div>
           <div className="mx-auto max-w-3xl space-y-4">
             <div className="prose prose-gray prose-lg dark:prose-invert md:prose-lg/relaxed lg:prose-xl/relaxed">
               <p>
                 The Weather App is a simple React application that allows users to check the current weather based on
                 their location. The app uses the OpenWeather API to fetch weather data and displays it in a
                 user-friendly interface.
               </p>
               <p>
                 Users can enter the name of their city or allow the app to access their location automatically. The app
                 then retrieves the current weather conditions, including temperature, humidity, and wind speed, and
                 displays the information on the page.
               </p>
             </div>
           </div>
         </div>
       </div>
       <div className="py-6 lg:py-12">
         <div className="container px-4 md:px-6">
           <div className="grid gap-4">
             <form className="space-y-6">
               <div className="grid gap-2">
                 <Label htmlFor="name">Name</Label>
                 <Input id="name" placeholder="Enter your name" required />
               </div>
               <div className="grid gap-2">
                 <Label htmlFor="email">Email</Label>
                 <Input id="email" placeholder="Enter your email" required type="email" />
               </div>
               <div className="grid gap-2">
                 <Label htmlFor="message">Message</Label>
                 <Textarea
                   className="min-h-[150px] resize-none"
                   id="message"
                   placeholder="Enter your message"
                   required
                 />
               </div>
               <Button type="submit">Submit</Button>
             </form>
           </div>
         </div>
       </div>
     </>
   )
 }
 
 