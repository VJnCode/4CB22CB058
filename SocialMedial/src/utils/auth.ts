interface AuthRequestBody {
    email: string;
    name: string;
    rollNo: string;
    accessCode: string;
    clientID: string;
    clientSecret: string;
  }
  
  interface AuthResponse {
    token_type: string;
    access_token: string;
    expires_in: number;
  }
  
  let authToken: string | null = null;
  
  const AUTH_URL = "http://20.244.56.144/evaluation-service/auth";
  
  const credentials: AuthRequestBody = {
    email: "varunraj0609@gmail.com",
    name: "varun raj",
    rollNo: "4cb22cb058",
    accessCode: "nZYDqH",
    clientID: "202dbe97-0ec9-478a-a14d-7062ad7301f5",
    clientSecret: "MRaVjwxwEDaBmCBA",
  };
  
  export const authenticate = async (): Promise<AuthResponse> => {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      throw new Error("Authentication failed");
    }
  
    const data = await response.json();
    return data as AuthResponse;
  };
  
  export const getAuthToken = async (): Promise<string> => {
    if (!authToken) {
      const authData = await authenticate();
      authToken = authData.access_token;
    }
    return authToken;
  };
  