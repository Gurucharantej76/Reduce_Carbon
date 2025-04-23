import AuthForm from '@/components/AuthForm';

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-green-800 dark:text-green-100 mb-6 text-center">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Log in to track your carbon footprint and compete with others!
        </p>
        <AuthForm />
      </main>
    </div>
  );
}
