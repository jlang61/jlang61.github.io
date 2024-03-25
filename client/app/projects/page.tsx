/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jkk7ZtgVLgy
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
 import { Button } from "@/components/ui/button"

 export default function Component() {
   return (
     <div className="w-full">
       <div className="px-4 py-6 md:py-12 md:px-6">
         <div className="space-y-2 text-center">
           <h1 className="text-3xl font-bold">Projects</h1>
           <p className="text-gray-500 mx-auto max-w-[600px] dark:text-gray-400">
             Check out my computer science projects. From algorithms to web development, a showcase of my hard work.
           </p>
         </div>
       </div>
       <div className="border-t border-b divide-y">
         <div className="grid md:grid-cols-3 items-stretch divide-y md:divide-y-0">
           <div className="flex flex-col justify-between p-4 md:p-6">
             <div className="space-y-2">
               <h3 className="text-xl font-bold">Movie Database</h3>
               <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                 A web app for searching and exploring movies.
               </p>
             </div>
             <Button size="sm" variant="outline">
               View Details
             </Button>
           </div>
           <div className="flex flex-col justify-between p-4 md:p-6">
             <div className="space-y-2">
               <h3 className="text-xl font-bold">Weather App</h3>
               <p className="text-sm text-gray-500 truncate dark:text-gray-400">An app to check the weather forecast.</p>
             </div>
             <Button size="sm" variant="outline">
               View Details
             </Button>
           </div>
           <div className="flex flex-col justify-between p-4 md:p-6">
             <div className="space-y-2">
               <h3 className="text-xl font-bold">Task Manager</h3>
               <p className="text-sm text-gray-500 truncate dark:text-gray-400">Manage your tasks with this app.</p>
             </div>
             <Button size="sm" variant="outline">
               View Details
             </Button>
           </div>
         </div>
       </div>
     </div>
   )
 }
 
 