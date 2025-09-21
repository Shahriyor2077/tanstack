import { memo, useState, type FormEvent } from "react";
import { useComment } from "../api/hooks/useComment";

const Comments = () => {
  const [text, setText] = useState("");
  const {getComment, createComment, deleteComment }=useComment()
  const {data, isLoading} = getComment()

  const handleDelete = (id: string) => {
    deleteComment.mutate(id);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = { text };
    createComment.mutate(comment);
  };

  return (
    <div className="Comments">
      {isLoading && <h1>Loading...</h1>}
      <form onSubmit={handleSubmit} action="">
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          type="text"
        />
        {createComment.isError && (
          <div>{createComment.error.response.data}</div>
        )}
        <button disabled={createComment.isPending}>
          {createComment.isPending ? "loading..." : "submit"}
        </button>
      </form>
      <ul>
        {data?.map((item: any) => (
          <li key={item.id}>
            <span> {item.text} </span>
            <button onClick={() => handleDelete(item.id)}>delete</button>
            <button>update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(Comments);
