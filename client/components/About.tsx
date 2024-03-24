import Image from "next/image";
import FacebookIcon from "@/components/icons/FacebookIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import Link from "next/link";

export default function About() {
  return (
    <div className="container mx-auto my-20 px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-1 flex justify-center">
          <div className="w-48 h-48 relative">
            <Image
              alt="Profgitile Picture"
              className="rounded-full object-cover"
              src="/pfp.png"
              fill
            />
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <h1 className="md:text-center lg:text-left text-5xl font-bold">About Me</h1>
          <div className="mx-auto tracking:tighter md:text-center lg:text-left text-gray-500">
            I&apos;m a third year UC Santa Barbara student currently studying Computer Science with a Data Science Minor!
          </div>
        </div>
        <div className="lg:col-span-1 flex flex-col justify-center items-center">
          <div className="flex flex-col items-start space-y-10 ">
            <Link
              className="flex items-center space-x-2 text-gray-500"
              href="https://www.facebook.com/justin.lang.144/"
              target="_blank"
            >
              <FacebookIcon className="w-5 h-5" />
              <span className="ml-2">Facebook</span>
            </Link>
            <Link
              className="flex items-center space-x-2 text-gray-500"
              href="https://www.instagram.com/justin._.lang"
              target="_blank"
            >
              <InstagramIcon className="w-5 h-5" />
              <span className="ml-2">Instagram</span>
            </Link>
            <Link
              className="flex items-center space-x-2 text-gray-500"
              href="https://www.linkedin.com/in/justin-lang-966b0a256/"
              target="_blank"
            >
              <LinkedInIcon/>
              <span className="ml-2">LinkedIn</span>
            </Link>
          </div> 
        </div>
      </div>
    </div>
  );
}
