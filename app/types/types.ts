
export type UserRole = 'USER' | 'ADMIN' 

export type PopulatedUser = {
  _id: string;
  fullname: string;
  avatar?: string;
};

export type User  = {
    _id: string
    fullname: string
    email: string
    role: UserRole
    avatar: string
    following: string[]
    createdAt: string
    updatedAt: string
    __v: number
  }

export type Post = {
    _id: string;          
    authorId: PopulatedUser;     
    title: string;  
    content: string;  
    imageUrl?: string;  
    likes: string[];   
    likesCount: number;    
    isLiked : boolean;   
    createdAt: Date;   
    updatedAt: Date; 
    __v: number; 
}