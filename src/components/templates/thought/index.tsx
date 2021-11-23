/** @jsx jsx */
/** @jsxFrag React.Fragment **/
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { jsx, Box, Styled } from "theme-ui";
import { TipContentWrapper } from "gatsby-theme-networked-thought/src/components/tippy";
import mdxComponents, { AnchorTagProps } from "gatsby-theme-networked-thought/src/components/mdx-components";

type Reference = {
    slug: string;
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thought: any;
};

const ReferencePreviewTip = ({ reference: { thought } }: { reference: Reference }) => (
    <TipContentWrapper>
        <Styled.h3
            sx={{
                my: 3,
            }}
        >
            {thought.title}
        </Styled.h3>
        <Styled.p>{thought.childMdx.excerpt}</Styled.p>
    </TipContentWrapper>
);


interface ThoughtProps {
    thought: {
        title: string;
        mtime: string;
        mtimeFmt: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        childMdx: any;
        inboundReferences: Reference[];
        outboundReferences: Reference[];
    };
}

const AnchorTagWithPopups = (previews: Record<string, React.ReactNode>) =>
    (props: AnchorTagProps) => <mdxComponents.a previews={previews} {...props} />;


const Thought = ({ thought }: ThoughtProps) => {
    const previews: Record<string, React.ReactNode> = {};
    const outboundReferences = thought.outboundReferences || [];
    outboundReferences
        .filter((reference) => !!reference.thought.childMdx.excerpt)
        .forEach((reference) => {
            previews[reference.slug] = <ReferencePreviewTip reference={reference} />;
        });


    // TODO: add tooltip preview info
    const components = { ...mdxComponents, a: AnchorTagWithPopups(previews) };

    return (
        <MDXProvider components={{ ...components, a: AnchorTagWithPopups }}>
            <Box sx={{ flex: "1" }}>
                <Styled.h1 sx={{ my: 3 }}>{thought.title}</Styled.h1>
                <span sx={{ fontSize: 0, color: "muted" }}>
                    Last updated on <time dateTime={thought.mtime}>{thought.mtimeFmt}</time>
                </span>

                <MDXRenderer>{thought.childMdx.body}</MDXRenderer>
            </Box>
            {/* <ThoughtFooter references={thought.inboundReferences} /> */}
        </MDXProvider>
    );
};

export default Thought;
