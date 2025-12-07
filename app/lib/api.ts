// lib/api.ts
export async function getRandomUser() {
    const response = await fetch(`https://randomuser.me/api`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    return response.json();
  }

// export async function getVessel(id: string) {
//   const backendApiUrl = process.env.BACKEND_API_URL || "https://dev-sbh-be.yellowocean-92ab1503.australiaeast.azurecontainerapps.io/api"
//   const response = await fetch(`${backendApiUrl}/vessels/${id}?populate[vesselPosts][populate][content][populate]=*`, {
//     method: "GET",
//     next: { revalidate: 3600 },
//   });
//   if (!response.ok) {
//     throw new Error('Failed to fetch vessel data');
//   }
//   return response.json();
// }