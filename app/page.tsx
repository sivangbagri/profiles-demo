import SurveyComponent from '@/components/SurveyComponent'
import Head from 'next/head'

export default function Home() {
  return (
    
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      
      <h1 className="text-3xl font-bold mb-8 font-mono">Whats your gaming personality ?</h1>
      <SurveyComponent />
    </main>
  )
}
