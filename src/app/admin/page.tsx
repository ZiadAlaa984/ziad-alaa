"use client"

import { User, BookOpen, Mail, Briefcase, Code2, Award, School } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProjectsContent from './TabContent/ProjectsContent'
import Login from './auth/login'
import { useAuth } from '@/context/useAuth'
import { useEffect, useState } from 'react'
import Loading from '../loading'
import { Button } from '@/components/ui/button'
import { LogoutButton } from './auth/signout'
import ProfileContent from './TabContent/ProfileContent'
import Link from 'next/link'
import ExperienceContent from './TabContent/Experience/ExperienceContent'
import EducationContent from './TabContent/Education/EducationContent'
import ContactContent from './TabContent/ContactContent/ContactContent'

const tabs = [
  {
    name: 'Profile',
    value: 'profile',
    icon: User,
    content: <ProfileContent />
  },
  {
    name: 'Experience',
    value: 'experience',
    icon: Briefcase,
    content: <ExperienceContent />
  },
  {
    name: 'Education',
    value: 'education',
    icon: School,
    content: <EducationContent />
  },
  {
    name: 'Contact',
    value: 'contact',
    icon: Mail,
    content: <ContactContent />
  },
  {
    name: 'Blog',
    value: 'blog',
    icon: BookOpen,
    content: (
      <>
        Read my latest <span className='text-foreground font-semibold'>blog posts</span> on technology, design, and
        insights from my professional journey. Stay tuned for new articles!
      </>
    )
  },


  {
    name: 'Projects',
    value: 'projects',
    icon: Code2,
    content: <ProjectsContent />
  },
  {
    name: 'Certificates',
    value: 'certificates',
    icon: Award,
    content: (
      <>
        My <span className='text-foreground font-semibold'>certifications</span> and achievements recognize
        my commitment to continuous learning and professional development.
      </>
    )
  }
]

const AdminTabs = () => {
  const { session } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // session might take a moment to load
    if (session !== undefined) {
      setLoading(false)
    }
  }, [session])

  // 1️⃣ Loading state
  if (loading) {
    return <Loading />
  }

  // 2️⃣ If session is null, redirect to Login
  if (!session) {
    return <Login />
  }

  // 3️⃣ If session exists, show tabs
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='flex items-center w-full  justify-between'>
        hello : {session.user.email}

        <div className='flex items-center gap-2'>
          <Link href='/'>
            <Button variant='outline'>Home</Button>
          </Link>
          <LogoutButton />
        </div>
      </div>
      <Tabs defaultValue='profile' className='gap-4'>
        <TabsList>
          {tabs.map(({ icon: Icon, name, value }) => (
            <TabsTrigger key={value} value={value} className='flex cursor-pointer items-center gap-1 px-2.5 sm:px-3'>
              <Icon />
              {name}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default AdminTabs
