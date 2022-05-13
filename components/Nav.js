import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="bg-blue pt-0.5 pr-1 ">
      <ul className="flex">
        <li className="mr-1 text-white">
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li className="mr-1 text-white">
          <Link href="/issues">
            <a>issues</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
