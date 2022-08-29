import Link from "next/link";

export default function Header() {

  return (


<header class="p-3 mb-3 border-bottom">
<div class="container">
  <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
    <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
    </a>

    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
      <li><a href="/" class="nav-link px-2 link-secondary">Home</a></li>
      <li><a href="/articles" class="nav-link px-2 link-dark">Articles</a></li>
      <li><a href="/pages" class="nav-link px-2 link-dark">Pages</a></li>
      <li><a href="/examples" class="nav-link px-2 link-dark">Examples</a></li>
    </ul>

    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
      <input type="search" class="form-control" placeholder="Search..." aria-label="Search"></input>
  </form>

    <div class="dropdown text-end">
      <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle"></img>
      </a>
      <ul class="dropdown-menu text-small">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider"></hr></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>
</div>
</header>
  );
}
