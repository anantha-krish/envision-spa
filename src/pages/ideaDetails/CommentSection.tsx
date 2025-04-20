import { useEffect, useState } from "react";
import { IdeaDetailBaseComponentProps } from ".";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  fetchLikeStatus,
  postNewCommentEvent,
  toggleLikeEvent,
} from "../../features/idea/ideaActions";
import { clearComments } from "../../features/idea/ideaSlice";
import { RootState } from "../../store";

export const CommentSection: React.FC<IdeaDetailBaseComponentProps> = ({
  ideaId,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLikeStatus(+ideaId));
    dispatch(fetchComments(+ideaId));
    return () => {
      //cleanup
      dispatch(clearComments());
    };
  }, [dispatch, ideaId]);

  const engagementCount = useSelector((state: RootState) => state.idea.count);
  const isLiked = useSelector((state: RootState) => state.idea.isLiked);

  const [showCommentBox, setShowCommentBox] = useState(false);
  const comments = useSelector((state: RootState) => state.idea.comments);
  const [newComment, setNewComment] = useState("");
  const handleAddComment = async () => {
    setShowCommentBox(false);
    dispatch(postNewCommentEvent(+ideaId, newComment));
  };

  return (
    <div className="w-10/12  p-4 px-8 ">
      {/* Toolbar */}
      <div className="comment_toolBar flex items-center justify-between border-b pb-2 mb-3">
        <div className="flex space-x-4">
          <button
            className="btn btn-lg text-xl btn-ghost"
            onClick={() => dispatch(toggleLikeEvent(+ideaId, isLiked))}
          >
            👍
            <span className="ml-1">{engagementCount.likes}</span> Likes (
            {isLiked ? "Liked" : "Disliked"})
          </button>
          <button
            className="btn btn-lg text-xl btn-ghost"
            onClick={() => setShowCommentBox(!showCommentBox)}
          >
            💬 <span className="ml-1">{engagementCount.comments}</span>Comment
          </button>
          <button className=" btn-lg text-xl btn-ghost font-semibold ">
            👁️ <span className="ml-1">{engagementCount.views}</span> Views
          </button>
        </div>
      </div>

      {/* Comment Box */}
      {showCommentBox && (
        <div className="comment_box flex items-center gap-2 mb-4">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddComment}>
            Post
          </button>
        </div>
      )}

      <div className="comment_list space-y-4">
        {comments.map(({ id, text, createdAt, userName }) => (
          <div key={id} className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-gray-500 ring-offset-base-100 ring-offset-2">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${userName}`}
                  className="inline "
                  alt={userName}
                />
              </div>
            </div>
            <div>
              <p className="opacity-80  text-xs pb-1">{userName}</p>
              <div className="bg-gray-200 p-2 pr-5 rounded-lg ">
                <p>{text}</p>
              </div>
              <time className="text-xs opacity-70">{createdAt}</time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
