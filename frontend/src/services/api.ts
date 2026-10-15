const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// Fetch available career paths
export async function fetchCareers() {
  const response = await fetch(`${API_BASE_URL}/careers`);

  if (!response.ok) {
    throw new Error("Failed to fetch careers.");
  }

  return response.json();
}

// Fetch skills required for a career
export async function fetchCareerSkills(careerId: number) {
  const response = await fetch(
    `${API_BASE_URL}/careers/${careerId}/skills`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch career skills.");
  }

  return response.json();
}

// Register a new user
export async function createUser(
  fullName: string,
  email: string,
  targetCareer: string
) {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      full_name: fullName,
      email,
      target_career: targetCareer,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.detail || "Failed to create your profile."
    );
  }

  return response.json();
}

// Fetch all existing user profiles
export async function fetchUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to load existing profiles.");
  }

  return response.json();
}

// Save or update a user's rating for a specific career
export async function saveUserSkill(
  userId: number,
  careerId: number,
  skillId: number,
  currentLevel: number
) {
  const response = await fetch(
    `${API_BASE_URL}/users/${userId}/skills`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        career_id: careerId,
        skill_id: skillId,
        current_level: currentLevel,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.detail || "Failed to save your skill rating."
    );
  }

  return response.json();
}

// Fetch saved ratings for a specific career
export async function fetchUserSkills(
  userId: number,
  careerId: number
) {
  const response = await fetch(
    `${API_BASE_URL}/users/${userId}/skills?career_id=${careerId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch your saved skills.");
  }

  return response.json();
}

// Fetch skill-gap analysis for a specific career
export async function fetchSkillGap(
  userId: number,
  careerId: number
) {
  const response = await fetch(
    `${API_BASE_URL}/users/${userId}/skill-gap?career_id=${careerId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch skill-gap analysis.");
  }

  return response.json();
}

// Fetch the personalized roadmap for a specific career
export async function fetchRoadmap(
  userId: number,
  careerId: number
) {
  const response = await fetch(
    `${API_BASE_URL}/users/${userId}/roadmap?career_id=${careerId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch learning roadmap.");
  }

  return response.json();
}


export async function saveUserCareer(
  userId: number,
  fullName: string,
  email: string,
  targetCareer: string
) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      full_name: fullName,
      email,
      target_career: targetCareer,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.detail || "Failed to save your selected career."
    );
  }

  return response.json();
}
