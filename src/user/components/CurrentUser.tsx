import { useRef } from "react";
import { loginUser } from "../logic/userActions";
import { useCurrentUser } from "../logic/userQueries";

export function CurrentUser() {
  const { data } = useCurrentUser();
  const inputRef = useRef<HTMLInputElement | null>(null);

  function login() {
    const userId = inputRef.current?.value;
    if (!userId) {
      alert("put user id in input");
      return;
    }
    loginUser(userId);
  }

  return (
    <>
      {data ? <h6>Hello {data.name}</h6> : <h6>need to login</h6>}
      <div>
        <input type="text" ref={inputRef} />
        <button onClick={login} >login</button>
      </div>
    </>
  )
}