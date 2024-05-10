import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center gap-5 justify-center flex-1 ">
      <p className="text-9xl ">404</p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="text-md">
        Sorry, we couldn’t find the page you’re looking for.
      </p>

      <Link href="/" className="btn btn-primary">
        Go back home
      </Link>
    </main>
  );
}
