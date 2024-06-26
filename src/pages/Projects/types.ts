export type Project = {
  administrator: User;
  created_at: string;
  description: string;
  id: number;
  members: User[];
  name: string;
  repository_url: string | null;
  required_roles: RequiredRoles;
  status: string;
};

export type User = {
  name: string;
  role: string;
};

export type RequiredRoles = {
  'front-end': number;
  'back-end': number;
  'full-stack': number;
  designer: number;
  any: number;
};
