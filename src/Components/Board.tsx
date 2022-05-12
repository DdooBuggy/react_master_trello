import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 400px;
  width: 300px;
  position: relative;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
`;

const DeleteBtn = styled.div`
  position: absolute;
  margin-left: 15px;
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.deleteColor};
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#F8EFBA"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  border-radius: 5px;
  flex-grow: 1;
  transition: background-color 0.3s ease-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  input {
    width: 100%;
    height: 20px;
    font-size: 13px;
    border: 0;
    background-color: ${(props) => props.theme.cardColor};
    border-radius: 5px;
    text-align: center;
  }
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  const onDelete = () => {
    setToDos((allBoards) => {
      const currentBoards = { ...allBoards };
      delete currentBoards[boardId];
      return currentBoards;
    });
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <DeleteBtn onClick={onDelete}>
        <FontAwesomeIcon icon={solid("rectangle-xmark")} />
      </DeleteBtn>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
