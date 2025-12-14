
import CreatePost from '../../_molecules/createPost/CreatePost'
import FeedPost from '../feedPosts/FeedPost'

export default function Feed() {
    return (
        <div className='w-full max-w-[500px] flex items-center flex-col gap-5 '>
            <CreatePost />
            <FeedPost />
        </div>
    )
}
