import { ProfileSidebar, ProfileFeed } from '@/features/profile';
import type { User, Post, Friend, Photo } from '@/features/profile';

interface ProfileTabTodoProps {
    user: User;
    friends: Friend[];
    photos: Photo[];
    posts: Post[];
}

export function ProfileTabTodo({ user, friends, photos, posts }: ProfileTabTodoProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-4 items-start mt-4">
            <ProfileSidebar user={user} friends={friends} photos={photos} />
            <ProfileFeed user={user} posts={posts} />
        </div>
    );
}