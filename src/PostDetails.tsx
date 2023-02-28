import { Comment, Post } from "./@types/posts";

async function fetchComments(postId: string) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return response.json();
  }
  
  async function deletePost(postId: string) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/postId/${postId}`,
      { method: "DELETE" }
    );
    return response.json();
  }
  
  async function updatePost(postId: string) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/postId/${postId}`,
      //@ts-ignore
      { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
    );
    return response.json();
  }
  
  export function PostDetail({ post }: {
    post: Post
  }) {
    // replace with useQuery
    const data: Comment[] = [];
  
    return (
      <>
        <h3 style={{ color: "blue" }}>{post.title}</h3>
        <button>Delete</button> <button>Update title</button>
        <p>{post.body}</p>
        <h4>Comments</h4>
        {data.map((comment) => (
          <li key={comment.id}>
            {comment.email}: {comment.body}
          </li>
        ))}
      </>
    );
  }
  