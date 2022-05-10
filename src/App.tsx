import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import Trash from "./Components/Trash";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin: 0 auto;
  height: 90vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

interface IToDoBoard {
  toDoBoard: string;
}

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    // same board movement
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    // cross board movement
    if (destination?.droppableId !== source.droppableId) {
      // to trash
      if (destination?.droppableId === "trash") {
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          sourceBoard.splice(source.index, 1);
          return {
            ...allBoards,
            [source.droppableId]: sourceBoard,
          };
        });
      } else {
        // to other board
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          const taskObj = sourceBoard[source.index];
          const destinationBoard = [...allBoards[destination.droppableId]];
          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination.index, 0, taskObj);
          return {
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          };
        });
      }
    }
  };
  const { register, handleSubmit, setValue } = useForm<IToDoBoard>();
  const onAddBoard = (data: IToDoBoard) => {
    const value = data.toDoBoard;
    setToDos({ ...toDos, [value]: [] });
    setValue("toDoBoard", "");
  };
  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);
  return (
    <div>
      <form onSubmit={handleSubmit(onAddBoard)}>
        <input
          {...register("toDoBoard", { required: true })}
          placeholder="Add board"
        />
        <button>Add Board</button>
      </form>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
        <Trash />
      </DragDropContext>
    </div>
  );
}

export default App;
