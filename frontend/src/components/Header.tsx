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
        <nav className="flex items-center space-x-8">
          <Link href="https://kohei-eth.notion.site/NightMarket-Wiki-d6765d4c1c0e4bcc892a45e05da1f5aa" target="_blank"  className="hover:underline">
              Wiki
            </Link>
            <Link href="https://x.com/0xnightmarket" className="hover:underline" target="_blank" rel="noopener noreferrer">
              X
            </Link>
          <ConnectWallet />
        </nav>
      </div>
    </header>
  );
};

export default Header;
