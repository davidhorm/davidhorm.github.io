/** 
 * Shadowing from "gatsby-theme-networked-thought/src/components/references.tsx"
 * to Replace `<LinkToStacked>` with `<Link>`
 */

/** @jsx jsx */
import { Link } from "gatsby";
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { Heading, jsx } from "theme-ui";

type ReferencesProps = {
  references: {
    slug: string;
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thought: any;
  }[];
};

const References = ({ references }: ReferencesProps) => (
  <div>
    <Heading as="h4" color="muted">
      Referred in
    </Heading>
    <div sx={{ mb: 2 }}>
      {references.map((ref) => (
        <Link
          key={ref.slug}
          sx={{
            textDecoration: "none",
            color: "muted",
            ":hover": {
              color: "text",
            },
          }}
          to={`/${ref.slug}`}
        >
          <div sx={{ py: 2 }}>
            <Heading as="h5" sx={{ m: 0, color: "muted" }}>
              {ref.thought.title}
            </Heading>
            <cite sx={{ fontSize: 1, m: 0, color: "muted" }}>{ref.thought.childMdx.excerpt}</cite>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default References;
