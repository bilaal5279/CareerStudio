import React from 'react'
import Robot from '../assets/AiRobot.png' 
import { useState, useEffect, useRef } from 'react'


const Cards = () => {
  const [showCards, setShowCards] = useState(false)
  const cardsRef = useRef(null)

  // Use IntersectionObserver to detect when the cards are in view and trigger the animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setShowCards(true), 300) // Add a delay of 300ms before showing the cards
        }
      },
      { threshold: 0.5 }
    )
    if (cardsRef.current) {
      observer.observe(cardsRef.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div className='w-full py-10 px-4 '>
      <div ref={cardsRef} className='max-w-[1240ox] mx-auto grid md:grid-cols-4 gap-8 text-[#1A2F4F]'>
        <div className={`w-full flex flex-col p-4 my-4 ${showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-500 ease-in-out`}>
          <img className='w-200 mx-auto' src={Robot} alt='robot' />
        </div>
        <div className={`w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 ${showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-500 ease-in-out`}>
          <h1 className='text-2xl font-bold text-center py-8 '>Upgrading your Resume</h1>
          <p className='px-2 text-xl font-light'> At Careerstudio, we leverage AI technology to help job seekers optimize their resumes for specific job applications. Our platform automatically updates resumes to align with job requirements, highlighting relevant qualifications and increasing the likelihood of positive responses from employers. </p>
        </div>
        <div className={`w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 ${showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-500 ease-in-out`}>
          <h1 className='text-2xl font-bold text-center py-8 '>Partnered with recruiters</h1>
          <p className='px-2 text-xl font-light'> We partner with recruiters to connect job seekers with relevant job opportunities, increasing successful placements. Our platform optimizes resumes for specific job applications, leading to more positive responses from employers. </p>
        </div>
        <div className={`w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 ${showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-500 ease-in-out`}>
          <h1 className='text-2xl font-bold text-center py-8 '>Complete Your Job Application with a Powerful Cover Letter</h1>
          <p className='px-2 text-xl font-light'> Our service doesn't stop at just optimizing your resume for the job posting. We also offer a powerful and personalized cover letter to accompany your job application. A well-written cover letter is a great way to make a strong first impression and showcase your personality and communication skills. </p>
        </div>
      </div>
    </div>
  )
}

export default Cards;