import SurveyComponent from '@/components/SurveyComponent'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 md:p-24">
      <h1 className="text-4xl font-bold mb-8">Personality Survey</h1>
      <SurveyComponent />
    </main>
  )
}
