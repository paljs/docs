import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
  }
`;

const SEO: React.FC<SEOProps> = ({ description, lang, meta, keywords, title }) => {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const metaDescription = description || data.site.siteMetadata.description;
        const URL = data.site.siteMetadata.siteUrl;
        return (
          <Helmet
            htmlAttributes={{
              lang: lang ?? 'en',
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:title',
                content: title,
              },
              {
                property: 'og:site_name',
                content: 'Pal.Js',
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              {
                name: 'og:image',
                content: `${URL}/header.png`,
              },
              {
                name: 'og:url',
                content: URL,
              },
              {
                name: 'twitter:card',
                content: 'summary_large_image',
              },
              {
                name: 'twitter:creator',
                content: '@AhmedElywh',
              },
              {
                name: 'twitter:site',
                content: '@pal4js',
              },
              {
                name: 'twitter:title',
                content: title,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
              {
                name: 'twitter:image',
                content: `${URL}/header.png`,
              },
            ]
              .concat(
                keywords && keywords.length > 0
                  ? {
                      name: 'keywords',
                      content: keywords.join(', '),
                    }
                  : [],
              )
              .concat(meta ?? [])}
          >
            <script type="application/ld+json">
              {`
        {
          "@context": "https://schema.org",
          "@type": "OpenSource",
          "url": "https://paljs.com",
          "name": "Pal.Js",
          "author": "Ahmed Elywa"
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+201275545187",
            "contactType": "Customer Support"
          }
        }
      `}
            </script>
          </Helmet>
        );
      }}
    />
  );
};

SEO.defaultProps = {
  keywords: [
    'Pal.js',
    'application',
    'react',
    'prisma',
    'nexus',
    'graphql',
    'CRUD',
    'N+1',
    'components',
    'admin',
    'nexus-prisma',
    'nexus-plugin-prisma',
    'styled-components',
    'grid-system',
    'free react admin',
  ],
};

interface SEOProps {
  description?: string;
  lang?: string;
  meta?: any[];
  keywords?: string[];
  title: string;
}

export default SEO;
