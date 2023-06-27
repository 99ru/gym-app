import { SignIn } from '@clerk/nextjs/app-beta';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

interface PageProps {
  searchParams: {
    redirectUrl?: string;
  };
}

const Page: React.FC<PageProps> = ({ searchParams }) => {
  const { redirectUrl } = searchParams;

  return (
    <section className='py-24'>
      <div className='container'>
        <div className='flex justify-center'>
          <SignedOut>
          <h1>Hoj</h1>
            <SignIn redirectUrl={redirectUrl || '/'} />
          </SignedOut>
          <SignedIn>
            <h1>You are already signed in!</h1>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </section>
  );
};

export default Page;
