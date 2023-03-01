import { useMutation, useQuery } from "react-query";
import { Comment, Post } from "../@types/posts";

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
    const {data, error, isLoading, isIdle, isError} = useQuery<Comment[], Error>(['comments', post.id], () => fetchComments(post.id))

    const deleteMutation = useMutation((postId: string) => deletePost(postId))

  
    if (isLoading || isIdle) return <h3>Loading...</h3>;
    if (isError)
      return (
        <>
          <h3>Oops, something went wrong</h3>
          <p>{error.toString()}</p>
        </>
      );

    return (
      <>
        <h3 style={{ color: "blue" }}>{post.title}</h3>
        {deleteMutation.isError && <p style={{color: '#f00'}}>Error deleting post</p>}
        {deleteMutation.isLoading && <p style={{color: '#00f'}}>Loading...</p>}
        {deleteMutation.isSuccess && <p style={{color: '#0f0'}}>Success</p>}
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button> <button>Update title</button>
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
  