import Image from "next/image"
import LogoImg from '../../../public/logo.svg'
import Link from "next/link"

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <Image
            src={LogoImg}
            alt="Logo"
            height={50}
            width={50}
        />
      </Link>
    </div>
  )
}

export default Logo
