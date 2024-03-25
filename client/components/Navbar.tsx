/**
 * v0 by Vercel.
 * @see https://v0.dev/t/vVEoZmwYOj4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import Image from "next/image";
export default function Component() {
  return (
    <nav className="fixed bg-gray-200 inset-x-0 top-0 z-50">
      <div className="px-4 md:px-6">
        <div className="flex h-14 items-center">
          <Link className="h-8 w-8 mr-4" href="/">
            <Image
              alt="Logo"
              className="rounded-full"
              height="32"
              src="/home.png"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
          </Link>
          <Link className="ml-6 font-bold hover:underline" href="/">
            Justin&apos;s Portfolio
          </Link>
          <nav className="ml-auto flex items-center space-x-4">
            <Link className="font-semibold hover:underline" href="/life">
              My Life
            </Link>
            <Link className="font-semibold hover:underline" href="/projects">
              Projects
            </Link>

            <Link
              className="font-semibold hover:underline"
              href="https://github.com/jlang61"
            >
              Github
            </Link>
            <Link className="font-semibold hover:underline" href="/">
              Miscellaenous Stuff
              </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
