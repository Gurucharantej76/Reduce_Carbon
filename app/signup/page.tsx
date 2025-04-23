import AuthForm from '@/components/AuthForm';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-green-800 dark:text-green-100 mb-6 text-center">
          Join CarbonCutter
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Create an account to start tracking your carbon footprint!
        </p>
        <AuthForm />
      </main>
    </div>
  );
}
