import { CreateGameForm } from "../forms/crate-game/create-game-form";


type TCreateProps = {

}

type TCreateGameValues = {
  nickname: string;
  rounds: number;
}

export const CreateGame = ({ }: TCreateProps): JSX.Element => {

  return (
    <CreateGameForm />
  );
}
