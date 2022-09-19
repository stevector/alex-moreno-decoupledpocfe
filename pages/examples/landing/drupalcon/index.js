import { DrupalClient } from "next-drupal"
import Image from "next/image";
import { isMultiLanguage } from "../../../../lib/isMultiLanguage.js";

import Layout from "../../../../components/layout";
import Link from "next/link";

import { ArticleGridItem, withGrid } from "../../../../components/grid";
import {
  getCurrentLocaleStore,
  globalDrupalStateStores,
} from "../../../../lib/stores";

export default function LandingSSRExample({
  menues,
  articles,
  multiLanguage,
  articlesStored,
}) {
  const ArticleGrid = withGrid(ArticleGridItem);
  //const imgSrc = node?.field_media_image?.field_media_image?.uri?.url || "";

  return (

    <Layout >

<div className="container col-xxl-8 px-4 py-5">
    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div className="col-10 col-sm-8 col-lg-6">
      <Image
              src="/bootstrap-themes.png"
              className="d-block mx-lg-auto img-fluid"
              objectFit="cover"
              width="700" 
              height="500" 
              loading="lazy"
              alt="Bootstrap"
            />
      </div>
      <div className="col-lg-6">
        <h1 className="display-5 fw-bold lh-1 mb-3">Introducing Front-End Sites at Drupalcon Prague 2022</h1>
        <p className="lead">Pantheon is proud to present one of the most advanced, and easy to use, decoupled solutions in the market. We call it WebOps for a reason</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
          <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Read more</button>
        </div>
      </div>
    </div>
  </div>

  <div className="row mb-2">


  <ArticleGrid
            data={articlesStored}
            contentType="articles"
            multiLanguage={multiLanguage}
          />


Articles 2
          
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

    const store = getCurrentLocaleStore(
      context.locale,
      globalDrupalStateStores
    );
    const articlesStored = await store.getObject({
      objectName: "node--article",
      params: "include=field_media_image.field_media_image",
      refresh: true,
      res: context.res,
    });

    // Fetch menues.
    const menues = await drupal.getMenu("main");

    return {
      props: {
        menues,
        articles,
        multiLanguage,
        articlesStored,
      },
    };
  } catch (error) {
    console.error("Unable to fetch data: ", error);
    return {
      notFound: true,
    };
  }
}
