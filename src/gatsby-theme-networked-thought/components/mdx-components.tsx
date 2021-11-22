/**
 * Shadowing `gatsby-theme-networked-thought/src/components/mdx-components.tsx` because:
 * 1. null `childImageSharp` warnings on all files during `yarn build`.
 * 2. Replace `<LinkToStacked>` with regular `<Link>`
 */

/** @jsx jsx */
import { Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, GatsbyImageProps } from "gatsby-plugin-image";
import { pick, pickBy, identity } from "lodash";
import { useWindowSize } from "react-use";
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { Styled, jsx, useColorMode } from "theme-ui";
import Tippy, { TipContentWrapper } from "gatsby-theme-networked-thought/src/components/tippy";

export type AnchorTagProps = {
  href: string;
  to?: string;
  previews?: { [key: string]: React.ReactNode };
};

const AnchorTag = ({ href, previews, ...restProps }: AnchorTagProps) => {
  const [colorMode] = useColorMode();
  const { width } = useWindowSize();
  const stacked = width >= 768;
  if (!href) {
    /* eslint-disable-next-line no-param-reassign */
    href = restProps.to as string;
  }

  const previewsMapping = previews || {};

  if (!href.match(/^http/)) {
    if (stacked) {
      return (
        <Tippy content={previewsMapping[href.replace(/^\//, "")]}>
          <Link {...restProps} to={href} sx={{ variant: "links.internal" }} />
        </Tippy>
      );
    }
    return <Link {...restProps} to={href} sx={{ variant: "links.internal" }} />;
  }

  const externalVariant = `links.external-${colorMode}`;
  const tipContent = <TipContentWrapper>{href}</TipContentWrapper>;

  return (
    <Tippy content={tipContent} placement="top">
      <Styled.a {...restProps} href={href} sx={{ variant: externalVariant }} />
    </Tippy>
  );
}

type ImageProps = { src: string } & Omit<GatsbyImageProps, "image">;

const Image = (props: ImageProps) => {
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
    /* eslint-disable-next-line jsx-a11y/alt-text */
    return <img src={src} {...pickBy(imageProps, identity)} />;
  }

  const image = data.images.nodes.find(({ relativePath }: { relativePath: string }) => relativePath.includes(src));
  if (!image || !image.childImageSharp) {
    return null;
  }

  return <GatsbyImage loading="lazy" image={image.childImageSharp?.gatsbyImageData} alt={alt} />;
}

export default {
  a: AnchorTag,
  img: Image,
};
