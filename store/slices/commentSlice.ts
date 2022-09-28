import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionStatus } from "@type/question.type";

interface CommonState {
  comment: QuestionStatus[];
}

const initialState: CommonState = {
  comment: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    // reducer

    //create
    createComment: {
      reducer: (state, action: PayloadAction<QuestionStatus>) => {
        if (state.comment.some(e => e.groupNum === action.payload.groupNum)) {
          //대댓글

          let index = 0;
          state.comment.forEach((e, i) => {
            if (e.groupNum === action.payload.groupNum) {
              return (index = i);
            }
          });

          const newComment = [...state.comment];
          newComment[index].addChat?.push(action.payload);
          state.comment = newComment;
          return;
        }

        // 댓글
        state.comment = [...state.comment, action.payload];
      },
      prepare: (text: QuestionStatus) => ({
        payload: text,
      }),
    },

    //read
    findComment: {
      reducer: (state, action: PayloadAction<QuestionStatus[]>) => {
        state.comment = action.payload;
      },
      prepare: (text: QuestionStatus[]) => ({
        payload: text,
      }),
    },

    // update
    updateComment() {},

    //delete
    deleteComment: {
      reducer: (
        state,
        action: PayloadAction<{ me: number; parents?: number }>
      ) => {
        const { me, parents } = action.payload;
        if (parents === undefined) {
          //댓글
          const newCommet = [...state.comment];
          newCommet.splice(me, 1);
          state.comment = newCommet;
        } else {
          // 대댓글
          const newReply = [...state.comment[parents].addChat];
          newReply.splice(me, 1);
          state.comment[parents].addChat = newReply;
        }
      },
      prepare: (text: { me: number; parents?: number }) => ({
        payload: text,
      }),
    },
  },
});

// counter action function
export const { createComment, findComment, updateComment, deleteComment } =
  commentSlice.actions;

export default commentSlice;
