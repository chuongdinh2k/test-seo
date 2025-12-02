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