import { useRef } from "react";
import { useQuery } from "react-query";
import Button from "src/components/Button";
import { loginUser } from "../logic/userActions";
import { getCurrentUserConfig } from "../logic/userQueries";

export function CurrentUser() {
  const { data } = useQuery(getCurrentUserConfig());
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
        <input type="text" ref={inputRef} className="border-2"/>
        <Button onClick={login} >login</Button>
      </div>
    </>
  )
}