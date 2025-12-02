import type { Metadata } from "next";
import { getRandomUser } from "../../lib/api";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getRandomUser();
    console.log("post", post);
    
    if (!post.results?.[0]) {
      return {
        title: `Blog Post Not Found`,
        description: `Blog Post Not Found`,
      };
    }
    console.log("post", post.results[0].name.first);
    console.log("post", post.results[0].name.last);
    const linkUrl = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.connetweb.com%2Fit%2Fproduct%2Ftest-product-1%2F&psig=AOvVaw0gQEtbULazR2r_ocD7beEz&ust=1764740240682000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPiWyuyXnpEDFQAAAAAdAAAAABAE"
    return {
      title: `Blog Post stephen ${post.results[0].name.first} ${post.results[0].name.last}`,
      description: `Blog Post stephen ${post.results[0].name.first} ${post.results[0].name.last}`,
      openGraph: {
        title: `Blog Post stephen ${post.results[0].name.first} ${post.results[0].name.last}`,
        description: `Blog Post stephen ${post.results[0].name.first} ${post.results[0].name.last}`,
        images: [linkUrl],
      },
      twitter: {
        card: "summary_large_image",
        title: `Blog Post stephen ${post.results[0].name.first} ${post.results[0].name.last}`,
        description: `Blog Post stephen ${post.results[0].name.first} ${post.results[0].name.last}`,
        images: [linkUrl],
      },
      alternates: {
        canonical: `https://sydneyboathire.com.au/blog/${slug}`,
      },
      keywords: ["blog", "seo", "next.js", "tailwindcss"],
      authors: [{ name: "Sydney Boat Hire" }],
      creator: "Sydney Boat Hire",
      publisher: "Sydney Boat Hire",
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: `Blog Post stephen ${slug}`,
      description: `Blog Post stephen ${slug}`,
    };
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogPost = await getRandomUser();
  const blogData = blogPost.results[0];

  const jsonLd = blogData ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blogData.name.first,
    "description": blogData.name.last,
    "author": {
      "@type": "Organization",
      "name": "Sydney Boat Hire"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sydney Boat Hire"
    },
    "datePublished": blogData.createdAt,
    "dateModified": blogData.updatedAt,
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <div>BlogPost stephen {slug}</div>
    </>
  );
}