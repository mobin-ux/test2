import axios from "axios";
import { useEffect, useState } from "react";
export const backendUrl = process.env.backendUrl;

const useAPI = () => {
  const [session, setSession] = useState(null);
  const [API, setAPI] = useState(
    new axios.create({
      baseURL: backendUrl,
      headers: {
        session,
      },
    })
  );
  useEffect(() => {
    setSession(window.sessionStorage.getItem("session"));
  }, []);

  useEffect(() => {
    setAPI(
      new axios.create({
        baseURL: backendUrl,
        headers: {
          session,
        },
      })
    );
  }, [session]);

  const { get: Get, post: Post, delete: Delete, put: Put } = API;

  const setHeader = () =>
    setAPI(
      new axios.create({
        baseURL: backendUrl,
        headers: {
          session,
        },
      })
    );

  return {
    Get,
    Post,
    Delete,
    Put,
    setHeader,
  };
};

export { useAPI };
