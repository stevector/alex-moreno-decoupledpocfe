import { useRouter } from "next/router";

export default function Header() {
  
  const router = useRouter();

  return (


<header className="p-3 mb-3 border-bottom">
<div className="container">
  <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
    </a>

    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
      <li><a href="/" className="nav-link px-2 link-secondary">Home</a></li>
      <li><a href="/articles" className="nav-link px-2 link-dark">Articles</a></li>
      <li><a href="/pages" className="nav-link px-2 link-dark">Pages</a></li>
      <li><a href="/examples" className="nav-link px-2 link-dark">Examples</a></li>
      <li><a href="/examples/landing/drupalcon" className="nav-link px-2 link-dark">Drupalcon</a></li>
    </ul>

    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
      <input type="search" className="form-control" placeholder="Search..." aria-label="Search"></input>
  </form>

    <div className="dropdown text-end">
      <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle"></img>
      </a>
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
