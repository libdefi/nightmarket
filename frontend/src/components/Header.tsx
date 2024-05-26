import Link from 'next/link';
import { ConnectWallet } from "components/Button/ConnectWallet";
import Image from 'next/image';

const Header = () => {
  return (
    <header className="py-4">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/svg/titleLogo.svg"
            alt="Your App Name"
            width={350}
            height={50}
          />
        </Link>
        <nav>
          <ConnectWallet />
        </nav>
      </div>
    </header>
  );
};

export default Header;
