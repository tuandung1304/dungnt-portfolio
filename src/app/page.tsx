import Achievements from '@/app/components/Achievements'
import Chatbot from '@/app/components/chatbot/Chatbot'
import Contact from '@/app/components/Contact'
import Education from '@/app/components/Education'
import Experience from '@/app/components/Experience'
import Hero from '@/app/components/Hero'
import Navbar from '@/app/components/Navbar'
import Projects from '@/app/components/Projects'
import Skills from '@/app/components/Skills'
import Technologies from '@/app/components/Technologies'

export const dynamic = 'force-static'

export default function App() {
  return (
    <div className="overflow-x-hidden text-stone-300 antialiased">
      <div className="fixed inset-0 -z-10">
        <div className="relative h-full w-full bg-black">
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute top-[-10%] right-0 left-0 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
        </div>
      </div>
      <div className="container mx-auto px-8">
        <Navbar />
        <Hero />
        <Skills />
        <Technologies />
        <Projects />
        <Experience />
        <Achievements />
        <Education />
        <Contact />
      </div>
      <Chatbot />
    </div>
  )
}
