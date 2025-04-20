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
import {
  HandThumbUpIcon as OutlineLikeIcon,
  ChatBubbleBottomCenterTextIcon as OutlineCommentIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon as SolidLikeIcon,
  ChatBubbleBottomCenterTextIcon as SolidCommentIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";

import TextareaAutosize from "react-textarea-autosize";
import clsx from "clsx";

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

  const likes = useSelector((state: RootState) => state.idea.likes);
  const comments = useSelector((state: RootState) => state.idea.comments);
  const views = useSelector((state: RootState) => state.idea.views);
  const isLiked = useSelector((state: RootState) => state.idea.isLiked);

  const [showCommentBox, setShowCommentBox] = useState(false);
  const commentList = useSelector((state: RootState) => state.idea.commentList);
  const [newComment, setNewComment] = useState("");
  const handleAddComment = async () => {
    setShowCommentBox(false);
    dispatch(postNewCommentEvent(+ideaId, newComment));
  };

  return (
    <div className="w-10/12  p-4 px-8 ">
      {/* Toolbar */}
      <div className="comment_toolBar flex border-b-2  border-t-2 border-gray-300 dark:border-gray-800 p-2 pl-14 mb-3">
        <div className="space-x-8">
          <button
            className="btn btn-ghost"
            onClick={() => dispatch(toggleLikeEvent(+ideaId, !isLiked))}
          >
            <span className="w-6">
              {isLiked ? <SolidLikeIcon /> : <OutlineLikeIcon />}
            </span>
            <span className="p-2">{likes} Likes</span>
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => {
              if (newComment.length > 0) {
                setNewComment("");
              }
              setShowCommentBox(!showCommentBox);
            }}
          >
            <span className="w-6">
              {showCommentBox ? <SolidCommentIcon /> : <OutlineCommentIcon />}
            </span>
            <span className="p-2">{comments} Comments</span>
          </button>
          <button className="btn btn-ghost pointer-events-none">
            <span className="w-6 text-gray-500">
              <EyeIcon />
            </span>
            <span className="p-2">{views} Views</span>
          </button>
        </div>
      </div>

      {/* Comment Box */}
      {showCommentBox && (
        <div className="comment_box flex items-center gap-2 mb-4">
          <TextareaAutosize
            minRows={2}
            maxRows={5}
            className={clsx(
              "textarea textarea-primary w-full min-h-0",
              "resize-none"
            )}
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <button
            className="btn btn-primary flex-1/5"
            onClick={handleAddComment}
          >
            Post
          </button>
        </div>
      )}

      <div className="comment_list space-y-4">
        {commentList.map(({ id, text, createdAt, userName }) => (
          <div key={id} className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-gray-500 dark:ring-offset-gray-700 ring-offset-base-100 ring-offset-2">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${userName}`}
                  className="inline "
                  alt={userName}
                />
              </div>
            </div>
            <div>
              <p className="opacity-80  text-xs pb-1">{userName}</p>
              <div className="bg-gray-200 dark:bg-gray-800 p-2 pb-3 pr-5 rounded-lg ">
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
