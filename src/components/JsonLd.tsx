type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Renders structured data as a JSON-LD script tag. Escaping "<" keeps a
 * string in the data (a post title, say) from closing the tag early, as the
 * Next.js JSON-LD guide recommends.
 */
export const JsonLd = ({ data }: JsonLdProps) => (
  <script
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    type='application/ld+json'
  />
);
