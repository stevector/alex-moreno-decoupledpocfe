import { IMAGE_URL } from "../lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function Article({ imgSrc, title, body }) {
  return (

    <div className="row g-5">
    <div className="col-md-8">


    
      <article className="prose lg:prose-xl mt-10 mx-auto">


<h1>{title}</h1>

<Link passHref href="/">
  <a className="font-normal">Home &rarr;</a>
</Link>

<div className="mt-12 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-screen-lg">
  {imgSrc ? (
    <div
      className="relative w-full rounded-lg shadow-lg overflow-hidden mb-10"
      style={{ height: "50vh" }}
    >
      <Image
        priority
        src={IMAGE_URL + imgSrc}
        layout="fill"
        objectFit="cover"
        alt={title}
      />
    </div>
  ) : null}
  <div dangerouslySetInnerHTML={{ __html: body }} />
</div>




      </article>

      </div>




        <div className="col-md-4">
        <div className="position-sticky" >
          <div className="p-4 mb-3 bg-light rounded">
            <h4 className="fst-italic">About</h4>
            <p className="mb-0">Customize this section to tell your visitors a little bit about your publication, writers, content, or something else entirely. Totally up to you.</p>
          </div>

          <div className="p-4">
            <h4 className="fst-italic">Archives</h4>
            <ol className="list-unstyled mb-0">
              <li><a href="#">March 2021</a></li>
              <li><a href="#">February 2021</a></li>
              <li><a href="#">January 2021</a></li>
              <li><a href="#">December 2020</a></li>
              <li><a href="#">November 2020</a></li>
              <li><a href="#">October 2020</a></li>
              <li><a href="#">September 2020</a></li>
              <li><a href="#">August 2020</a></li>
              <li><a href="#">July 2020</a></li>
              <li><a href="#">June 2020</a></li>
              <li><a href="#">May 2020</a></li>
              <li><a href="#">April 2020</a></li>
            </ol>
          </div>

          <div className="p-4">
            <h4 className="fst-italic">Elsewhere</h4>
            <ol className="list-unstyled">
              <li><a href="#">GitHub</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Facebook</a></li>
            </ol>
          </div>
        </div>
      </div>

      </div>


  );
}
