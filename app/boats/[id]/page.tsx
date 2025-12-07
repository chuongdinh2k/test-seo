import { Metadata } from "next";


export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const backendApiUrl = process.env.BACKEND_API_URL || "https://dev-sbh-be.yellowocean-92ab1503.australiaeast.azurecontainerapps.io/api"
    try {
        const url = `${backendApiUrl}/vessels/${id}?populate[vesselPosts][populate][content][populate]=*`;
        const response = await fetch(url, {
            method: "GET",
            next: { revalidate: 3600 },
        });
        if (!response.ok) {
            return {
                title: `Boat Detail - ${id}`,
                description: "Discover luxury boat hire options in Sydney Harbour.",
            };
        }

        const result = await response.json();
        const vessel = result.data;
        if (!vessel) {
            return {
                title: "Boat Not Found",
                description: "The requested boat could not be found.",
            };
        }

        const vesselName =
            vessel?.vesselPosts?.content?.seo?.title || vessel?.vesselName + " Boat Hire ";
        const description =
            vessel?.vesselPosts?.content?.seo?.description || vessel?.vesselName + " Boat Hire";
        const linkUrl = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.connetweb.com%2Fit%2Fproduct%2Ftest-product-1%2F&psig=AOvVaw0gQEtbULazR2r_ocD7beEz&ust=1764740240682000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPiWyuyXnpEDFQAAAAAdAAAAABAE"
            return {
            title: `${vesselName}`,
            description: `${vesselName}`,
            // openGraph: {
            //     title: `${vesselName}`,
            //     description: `${vesselName}`,
            //     images: [linkUrl],
            // },
            // twitter: {
            //     title: `${vesselName}`,
            //     description: `${vesselName}`,
            // },
            // alternates: {
            //   canonical: `https://stephendinh.cloud/boats/${id}`,
            // },
            // authors: [
            //     {
            //         name: "Sydney Boat Hire",
            //     },
            // ],
            // creator: "Sydney Boat Hire",
            // publisher: "Sydney Boat Hire",
            // applicationName: "Sydney Boat Hire",
            // keywords: ["Sydney Boat Hire", "Sydney Boat", "Boat Hire", "Boat", "Sydney", "Harbour"],
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    "max-video-preview": -1,
                    "max-image-preview": "large",
                    "max-snippet": -1,
                },
            },
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
