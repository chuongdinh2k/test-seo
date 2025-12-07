// import { getVessel } from "@/app/lib/api";
import type { Metadata } from "next";


export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    try {
        const backendApiUrl = process.env.BACKEND_API_URL || "https://dev-sbh-be.yellowocean-92ab1503.australiaeast.azurecontainerapps.io/api"
        const response = await fetch(`${backendApiUrl}/vessels/${id}?populate[vesselPosts][populate][content][populate]=*`, {
            method: "GET",
            next: { revalidate: 3600 },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch vessel data');
        }
        const vesselData = await response.json();
        console.log("vesselData", vesselData);
        if (!vesselData?.data) {
            return {
                title: "Boat Not Found",
                description: "The requested boat could not be found.",
            };
        }

        // Add safety checks to prevent undefined values
        const seoTitle = vesselData?.data?.vesselPosts?.content?.seo?.title;
        const seoDescription = vesselData?.data?.vesselPosts?.content?.seo?.description || "Sydney Hire Boat";

        // Debug logging
        // Ensure description is a valid non-empty string
        const validDescription = seoDescription && typeof seoDescription === 'string' && seoDescription.trim().length > 0
            ? seoDescription.trim()
            : "Sydney Hire Boat";

        console.log("validDescription", validDescription);
        const linkUrl = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.connetweb.com%2Fit%2Fproduct%2Ftest-product-1%2F&psig=AOvVaw0gQEtbULazR2r_ocD7beEz&ust=1764740240682000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPiWyuyXnpEDFQAAAAAdAAAAABAE"
        return {
            title: seoTitle,
            description: seoTitle,
            openGraph: {
                title: seoTitle,
                description: validDescription,
                images: [linkUrl],
            },
            twitter: {
                card: "summary_large_image",
                title: seoTitle,
                description: validDescription,
                images: [linkUrl],
            },
            alternates: {
                canonical: `https://stephendinh.cloud/boats/${id}`
            },
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-video-preview': -1,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },
            // keywords: ["blog", "seo", "next.js", "tailwindcss", "Blog Post stephen", "stephen blog"],
            // authors: [{ name: "Sydney Boat Hire" }],
            // creator: "Sydney Boat Hire",
            // publisher: "Sydney Boat Hire",
        };
    } catch (error) {
        console.error("[Metadata] Failed to fetch vessel:", error);
        return {
            title: `Boat Detail - ${id}`,
            description: "Discover luxury boat hire options in Sydney Harbour.",
        };
    }
}

export default async function VesselDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <div>Boat Detail: {id}</div>;
}
