/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BsPSlUwqWOD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Mailing from "@/components/Mailing";



import Link from "next/link";
import Image from "next/image";
import ProjectInfo from "@/data/project";
import { Mail } from "lucide-react";
import About from "@/components/About";

export default function Component() {
  return (
    <div>
      <About/>
      <div className="bg-gray-50/95 py-8 lg:py-16">
        <div className="grid gap-6 px-4 md:px-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              My Projects
            </h1>
            {/* <p className="mx-auto max-w-2xl text-gray-500 md:text-xl/relaxed">
              Computer Science student passionate about coding. Here are some of
              my favorite projects.
            </p> */}
          </div>
          <div className="mx-auto grid max-w-3xl items-start gap-6 lg:max-w-5xl lg:grid-cols-2 xl:gap-8">
            {ProjectInfo.map((project) => (
              <div key={project.id}>
                <div className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/30 backdrop-blur z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <a href={project.href}>
                    <Image
                      alt="Project thumbnail"
                      className="object-cover"
                      height="250"
                      src={project.imageRef}
                      style={{
                        aspectRatio: "500/250",
                        objectFit: "cover",
                      }}
                      width="500"
                    />
                  </a>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <div className="text-sm text-gray-500">{project.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-center grid-col-2 py-12 lg:py-24">
        <div className="col-span-1 gap-6 px-4 md:px-6">
          <div className="mx-auto max-w-2xl space-y-2">
            <h2 className="text-3xl font-bold  sm:text-4xl md:text-5xl">
              Languages and Skills
            </h2>
            <p className="text-gray-500 ">
              {"I've learned a lot through mentors, peers, and hours of non-stop debugging. \n    Currently, these are the skills that I have learned and feel proficient in!"}
            </p>
            <ul className="text-gray-500 list-disc">
              <li>React</li>
              <li>Tailwind CSS</li>
              <li>Python</li>
              <li>C++</li>
              <li>Javascript</li>
              <li>Typescript</li>
              <li>Next.js</li>
              <li>Microsoft Azure</li>
            </ul>
          </div>
        </div>
        <div className="col-span-1 gap-6 px-4 md:px-6">
          <div className="mx-auto max-w-2xl space-y-2">
            <Mailing />
          </div>
        </div>
      </div>
    </div>
  );
}
