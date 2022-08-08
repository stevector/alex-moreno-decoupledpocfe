import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { isMultiLanguage } from "../../lib/isMultiLanguage.js";
import {
  getCurrentLocaleStore,
  globalDrupalStateStores,
} from "../../lib/drupalStateContext";

import Layout from "../../components/layout";
import PageHeader from "../../components/page-header.js";
import Link from "next/link";

export default function LandingSSRExample({
  hrefLang,
  pages,
  articles,
  recipes,
  footerMenu,
  multiLanguage,
//  stars,
  jsonraw,
}) {
  const { locale } = useRouter();


  return (
    <Layout footerMenu={footerMenu}>
      <NextSeo
        title="Decoupled landing Demo"
        description="Created by Alex Moreno."
        languageAlternates={hrefLang || false}
      />{" "}
      <PageHeader title="My landing" />

      <div className="mt-12 mx-auto max-w-[50vw]">

      <br></br><br></br>
        <ul><strong>Pages:</strong>
          {pages ? (
            pages?.map(({ id, title, body, path }) => (
              <li className="prose justify-items-start" key={id}>
                <h2>{title}</h2>
                <div dangerouslySetInnerHTML={{ __html: body?.summary }} />
                <Link
                  passHref
                  href={`${
                    multiLanguage ? `/${path?.langcode || locale}` : ""
                  }${path.alias.includes("/pages") ? "" : "/pages"}${
                    path.alias
                  }`}
                >
                  <a className="font-normal underline">Read more →</a>
                </Link>
              </li>
            ))
          ) : (
            <h2 className="text-xl text-center mt-14">No pages found 🏜</h2>
          )}
        </ul>

        <br></br><br></br>
        <ul><strong>Articles:</strong>
          {articles ? (
            articles?.map(({ id, title, body, path }) => (
              <li className="prose justify-items-start" key={id}>
                <h2>{title}</h2>
                <div dangerouslySetInnerHTML={{ __html: body?.summary }} />
                <Link
                  passHref
                  href={`${
                    multiLanguage ? `/${path?.langcode || locale}` : ""
                  }${path.alias.includes("/articles") ? "" : "/articles"}${
                    path.alias
                  }`}
                >
                  <a className="font-normal underline">Read more →</a>
                </Link>
              </li>
            ))
          ) : (
            <h2 className="text-xl text-center mt-14">No articles found 🏜</h2>
          )}
        </ul>


        <br></br><br></br>
        <ul><strong>Recipes:</strong>
          {recipes ? (
            recipes?.map(({ id, title, body, path }) => (
              <li className="prose justify-items-start" key={id}>
                <h2>{title}</h2>
                <div dangerouslySetInnerHTML={{ __html: body?.summary }} />
                <Link
                  passHref
                  href={`${
                    multiLanguage ? `/${path?.langcode || locale}` : ""
                  }${path.alias.includes("/recipes") ? "" : "/recipes"}${
                    path.alias
                  }`}
                >
                  <a className="font-normal underline">Read more →</a>
                </Link>
              </li>
            ))
          ) : (
            <h2 className="text-xl text-center mt-14">No recipes found 🏜</h2>
          )}
        </ul>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const origin = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const { locales, locale } = context;
  // if there is more than one language in context.locales,
  // assume multilanguage is enabled.
  const multiLanguage = isMultiLanguage(locales);
  const hrefLang = locales.map((locale) => {
    return {
      hrefLang: locale,
      href: origin + "/" + locale,
    };
  });


  // Query data.
  const store = getCurrentLocaleStore(locale, globalDrupalStateStores);
  try {

    // const res = await fetch('https://api.github.com/repos/vercel/next.js');
    // const json = await res.json();

    // const rawcall = await fetch('http://decoupledpoc.lndo.site/jsonapi/node/article');
    console.log("url");
    console.log(process.env);

    const rawcall = await fetch(process.env.BACKEND_URL + '/jsonapi/node/article');
  
    const jsonraw = await rawcall.json();

    console.log("data::");
    console.log(jsonraw.data);

    console.log("other data::");
    const data = jsonraw.data[1].type;
    console.log(jsonraw.data[1].type);
    console.log(jsonraw.data[1].id);
    console.log("title:: " + jsonraw.data[1].attributes.title);
    console.log("end data::");
    console.log("queryhing");

    const pages = await store.getObject({
      objectName: "node--page",
      query: `
      {
        id
        title
        body
        path {
          alias
          langcode
        }
      }
    `,
    });

    const articles = await store.getObject({
      objectName: "node--article",
      query: `
      {
        id
        title
        body
        path {
          alias
          langcode
        }
      }
    `,
    });

    const recipes = await store.getObject({
      objectName: "node--recipe",
      query: `
      {
        id
        title
        body
        path {
          alias
          langcode
        }
      }
    `,
    });

    const footerMenu = await store.getObject({
      objectName: "menu_items--main",
    });

console.log(footerMenu);

    if (!pages) {
      return { props: { footerMenu } };
    }

    return {
      props: {
        pages,
        articles,
        recipes,
        footerMenu,
        hrefLang,
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
