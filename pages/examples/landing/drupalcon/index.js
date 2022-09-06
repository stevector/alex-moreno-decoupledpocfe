import { DrupalClient } from "next-drupal"
import Image from "next/image";
import { isMultiLanguage } from "../../../../lib/isMultiLanguage.js";

import Layout from "../../../../components/layout";
import PageHeader from "../../../../components/page-header.js";
import Link from "next/link";

import { ArticleGridItem, withGrid } from "../../../../components/grid";


export default function LandingSSRExample({
  menues,
  articles,
  multiLanguage,
}) {
  const ArticleGrid = withGrid(ArticleGridItem);

  return (

    <Layout >



<div className="container col-xxl-8 px-4 py-5">
    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div className="col-10 col-sm-8 col-lg-6">
      <Image
              priority
              src="/bootstrap-themes.png"
              className="d-block mx-lg-auto img-fluid"
              layout="fill"
              objectFit="cover"
              width="700" 
              height="500" 
              loading="lazy"
              alt="Bootstrap"
            />
      </div>
      <div className="col-lg-6">
        <h1 className="display-5 fw-bold lh-1 mb-3">Introducing Decoupled for Drupalcon Prague 2022</h1>
        <p className="lead">Pantheon is proud to present one of the most advanced, and easy to use, decoupled solutions in the market. We call it webops for a reason</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
          <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Read more</button>
        </div>
      </div>
    </div>
  </div>

  <div className="row mb-2">

    {articles ? (
            articles?.map((node) => (
              <div className="col-md-6">

                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary">World</strong>
                  <h3 className="mb-0">{node.title}</h3>
                  <div className="mb-1 text-muted">Nov 12</div>
                  <p className="card-text mb-auto">{node.body.summary}</p>
                  <div dangerouslySetInnerHTML={{ __html: node.body?.summary }} />
                  <Link
                  passHref
                  href={`${
                    multiLanguage ? `/${node.path?.langcode || locale}` : ""
                  }${node.path.alias.includes("/articles") ? "" : "/articles"}${
                    node.path.alias
                  }`}
                >
                  <a className="font-normal underline">Read more →</a>
                </Link>
                img:{node.img} {node.img}
                </div>
                <div className="col-auto d-none d-lg-block">
                  <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c"/>
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
        
                </div>
              </div>
            </div>

            ))
          ) : (
            <h2 className="text-xl text-center mt-14">No pages found 🏜</h2>
          )}
          
          </div>

    </Layout>
  )


}

export async function getServerSideProps(context) {

  const origin = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const { locales, locale } = context;
  // if there is more than one language in context.locales,
  // assume multilanguage is enabled.
  const multiLanguage = isMultiLanguage(locales);

  try {
    const drupal = new DrupalClient(process.env.BACKEND_URL)

    // Fetch articles.
    const articles = await drupal.getResourceCollectionFromContext(
      "node--article",
      context
    );

    // Fetch menues.
    const menues = await drupal.getMenu("main");

    return {
      props: {
        menues,
        articles,
        multiLanguage,
      },
    };
  } catch (error) {
    console.error("Unable to fetch data: ", error);
    return {
      notFound: true,
    };
  }
}
