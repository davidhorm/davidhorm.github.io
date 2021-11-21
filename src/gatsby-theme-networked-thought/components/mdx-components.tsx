/** @jsx jsx */
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, GatsbyImageProps } from "gatsby-plugin-image";
import { pick, pickBy, identity } from "lodash";
import { jsx } from "theme-ui";
import OriginalMdxComponents from "gatsby-theme-networked-thought/src/components/mdx-components";

type ImageProps = { src: string } & Omit<GatsbyImageProps, "image">;

/**
 * Shadowing `/node_modules/gatsby-theme-networked-thought/src/components/mdx-components.tsx`
 * because of null `childImageSharp` warnings on all files during `yarn build`.
 */

function Image(props: ImageProps) {
  const { src, alt, ...rest } = props;
  const data = useStaticQuery(graphql`
    query ImageComponent_v2 {
      images: allFile {
        nodes {
          relativePath
          name
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 1800)
          }
        }
      }
    }
  `);

  if (src.match(/^http/)) {
    const imageProps = pick(rest, ["title", "alt", "className", "style"]);
    return <img src={src} {...pickBy(imageProps, identity)} />;
  }

  const image = data.images.nodes.find(({ relativePath }: { relativePath: string }) => {
    return relativePath.includes(src);
  });
  if (!image || !image.childImageSharp) {
    return null;
  }

  return <GatsbyImage loading="lazy" image={image.childImageSharp?.gatsbyImageData} alt={alt} />;
}

export default {
  a: OriginalMdxComponents.a,
  img: Image,
};
