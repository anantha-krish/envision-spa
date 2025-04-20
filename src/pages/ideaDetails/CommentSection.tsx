import { useEffect, useState } from "react";
import { IdeaDetailBaseComponentProps } from ".";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../features/idea/ideaActions";
import { clearComments } from "../../features/idea/ideaSlice";
import { RootState } from "../../store";

export const CommentSection: React.FC<IdeaDetailBaseComponentProps> = ({
  ideaId,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchComments(+ideaId));
    return () => {
      //cleanup
      dispatch(clearComments());
    };
  }, [dispatch, ideaId]);

  const [showCommentBox, setShowCommentBox] = useState(false);
  const comments = useSelector((state: RootState) => state.idea.comments);
  const [newComment, setNewComment] = useState("");
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    /*  setComments([
      ...comments,
      { id: Date.now(), user: "You", text: newComment },
    ]);
    */
    setNewComment("");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Toolbar */}
      <div className="comment_toolBar flex items-center justify-between border-b pb-2 mb-3">
        <div className="flex space-x-4">
          <button className="btn btn-lg text-xl btn-ghost">
            👍
            <HandThumbUpIcon />
            <span className="ml-1">12</span> Likes
          </button>
          <button
            className="btn btn-lg text-xl btn-ghost"
            onClick={() => setShowCommentBox(!showCommentBox)}
          >
            💬 <span className="ml-1">2</span>Comment
          </button>
          <button className=" btn-lg text-xl btn-ghost font-semibold ">
            👁️ <span className="ml-1">34</span> Views
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
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.userName}`}
                  alt={comment.userName}
                />
              </div>
            </div>
            <div className="bg-base-200 p-3 rounded-lg">
              <p className="font-semibold">{comment.userName}</p>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
