"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const categories = [
    "Programming",
    "Lifestyle",
    "Music",
    "Beauty",
    "Gaming",
    "Art and Craft",
  ];
  const filtered = categories.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const features = [
    {
      title: "Blog beautifully",
      desc: "Customize your blog’s look and feel in a couple of clicks with beautifully designed themes. Bring your writing to life with magical drag-and-drop layouts. Or put your fingerprint on every font, color, and element on the page.",
    },
    {
      title: "Edit easily",
      desc: "From simple and clean to glossy magazine – whatever your publishing style, the intuitive block editor adapts to you. Drag, drop, and easily swap out your menu, punch in a pull quote, or make your post pop with a beautiful gallery. Just like that.",
    },
    {
      title: "Share anything simply",
      desc: "From video to audio, stories to GIFs, bring it all together—right from where you write. And with plenty of storage for every type of media, your content’s secure, easy to reuse anywhere on your blog, and owned by you alone.",
    },
    {
      title: "Blog from anywhere",
      desc: "The Jetpack mobile app for iOS and Android puts total control of your blog a tap and swipe away. Wherever you are at the time.",
    },
    {
      title: "Write now, publish here",
      desc: "SWith post-scheduling, you can catch your readers at the best time for them. And for you. Write up a post, set your publish date, and then leave it to your blog to hit publish.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-r from-pink-400 via-pink-300 to-yellow-200">
      {/* HERO */}
      <div className="relative flex h-[500px] items-center justify-center text-center">
        <Image
          src="/images/background.webp"
          alt="bg"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative space-y-4 text-white">
          <h1 className="text-6xl font-bold">Blogging Platform</h1>
          <p className="text-3xl font-bold">Create a blog that stands out</p>
        </div>
      </div>

      <div>
        <div>
          <p className="justify-left mt-10 ml-5 flex text-5xl font-bold text-blue-950">
            Start simple. Grow limitless.
          </p>
          <p className="justify-left mt-5 ml-10 flex text-2xl text-black">
            From your first post to a full content platform, build, customize,
            and scale your blog effortlessly.
          </p>
        </div>
        <div className="relative mt-10 ml-10 h-[400px] w-[650px]">
          <Image
            src="/images/publish.webp"
            alt="pub"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-10 ml-5 grid grid-cols-2 gap-5">
        <div className="mt-25">
          <p className="text-5xl font-bold text-purple-900">
            How to <br />
            create a blog <br />
            for free
          </p>
          <br />
          <p className="text-2xl text-black">
            Follow these 4 steps to start building your blog today.
          </p>
          <div className="mt-5">
            <Popover>
              {/* FIXED TRIGGER */}
              <PopoverTrigger
                render={
                  <Button className="h-20 w-80 text-2xl">Get Started</Button>
                }
              />

              <PopoverContent className="w-80 space-y-3">
                <h2 className="font-semibold">What's on your mind?</h2>

                {/* INPUT */}
                <Input
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />

                {/* FILTERED LIST */}
                <ul className="space-y-1 rounded border p-2">
                  {filtered.map((item) => (
                    <li
                      key={item}
                      onClick={() => router.push(`/login`)}
                      className="cursor-pointer rounded p-1 font-bold hover:bg-white hover:text-black"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="px-5 py-5">
          <Card className="bg-pink-800 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <CardContent className="px-8 py-8 text-2xl">
              <p>1. Sign up for a free blog maker like Blog Publisher.</p>
              <br />
              <p>
                2. Pick a blog name .Let people know what your blog is all
                about.
              </p>
              <br />
              <p>
                3. Write and publish your first post.Launch with posts you're
                passoniate about.
              </p>
              <br />
              <p>4. Share your blog.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* POPULAR BLOGS */}
      <div className="mx-auto mt-12 max-w-5xl p-4 text-blue-950">
        <h2 className="mb-4 text-2xl font-bold">Popular Blogs</h2>

        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="bg-green-100">
              <CardContent className="p-4">
                <h3 className="font-semibold text-pink-800">Blog {item}</h3>
                <p className="text-sm text-gray-800">Description...</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-10 ml-5 grid grid-cols-2 gap-5">
        <div>
          <Accordion defaultValue={["item-0"]} className="w-full">
            {features.map((feature, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="flex justify-between text-2xl font-bold text-blue-950 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                  {feature.title}
                </AccordionTrigger>

                <AccordionContent className="text-blue-900">
                  {feature.desc}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="relative h-[350px] w-[300px]">
          <Image
            src="/images/scene.jpg"
            alt="scene"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
