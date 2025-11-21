declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRoles;
      groupId: string;
      token: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: UserRoles;
    groupId: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    groupId: string;
    token: string;
  }
}

export interface BackendJWTPayload {
  Name: string;
  Role: string;
  UserId: string;
  GroupId: string;
  exp: number;
}
