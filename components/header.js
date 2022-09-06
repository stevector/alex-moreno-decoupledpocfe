import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  
  const router = useRouter();

  return (


<header className="p-3 mb-3 border-bottom">
<div className="container">
  <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
      <li>
      <Link passHref href="/">
        <a className="nav-link px-2 link-secondary">Home</a>
      </Link>        
        </li>
      <li>
      <Link passHref href="/articles">
        <a className="nav-link px-2 link-dark">Articles</a>
      </Link>
        </li>
      <li>
      <Link passHref href="/pages">
        <a className="nav-link px-2 link-dark">Pages</a>
      </Link>  
        </li>
      <li>
      <Link passHref href="/examples">
        <a className="nav-link px-2 link-dark">Examples</a>
      </Link>  
        </li>
      <li>
      <Link passHref href="/examples/landing/drupalcon">
        <a className="nav-link px-2 link-dark">Drupalcon</a>
        </Link>  

        </li>
    </ul>

    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
      <input type="search" className="form-control" placeholder="Search..." aria-label="Search"></input>
  </form>

    <div className="dropdown text-end">
    <Link passHref href="#">
      <a className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      <Image
        priority
        src="https://github.com/mdo.png"
        layout="fill"
        objectFit="cover"
        alt="mdo"
        width="32" 
        height="32" 
        className="rounded-circle"
      />
      </a>
      </Link>  

      <ul className="dropdown-menu text-small">
        <li><a className="dropdown-item" href="#">New project...</a></li>
        <li><a className="dropdown-item" href="#">Settings</a></li>
        <li><a className="dropdown-item" href="#">Profile</a></li>
        <li><hr className="dropdown-divider"></hr></li>
        <li><a className="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>
</div>
</header>
  );
}
