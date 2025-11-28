type User = {
  name: string;
  email: string;
  password: string;
};

const USERS_KEY = "users";

function getUsers(): User[] {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const authAPI = {
  signup: async (email: string, name: string, password: string) => {
    await new Promise((res) => setTimeout(res, 500));
    
    const users = getUsers();
    if (users.some((u) => u.email === email)) {
      return { 
        success: false, 
        error: 'Email already registered' 
      };
    }
    
    const newUser = { email, name, password };
    users.push(newUser);
    saveUsers(users);
    
    return { 
      success: true, 
      user: newUser 
    };
  },

  login: async (email: string, password: string) => {
    await new Promise((res) => setTimeout(res, 500));
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return {
        success: false,
        error: 'Invalid email or password'
      };
    }
    
    return {
      success: true,
      user
    };
  }
};