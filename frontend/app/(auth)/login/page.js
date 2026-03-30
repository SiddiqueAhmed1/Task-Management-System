import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 mb-4">
            <span className="text-2xl">⚡</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Task Management System
          </h1>
          <p className="text-muted-foreground mt-1">
            Sign in to your workspace
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
