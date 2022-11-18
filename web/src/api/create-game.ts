import { TCreateGameValues } from "../forms/crate-game/types";
import { getBackendPath } from "./utils";
import { io } from "socket.io-client";

export const createGame = (values: TCreateGameValues) => {
  // fetch(getPath('create-game'), {
  //   method: 'POST',
  //   body: JSON.stringify(values)
  // }).then(res => console.log(res));

  const socket = io(getBackendPath(), {
    auth: { nickname: values.nickname }
  });
}