import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100px;
  height: 200px;
  background-color: wheat;
`;

const Area = styled.div`
  width: 100%;
  height: 100%;
`;

function Trash() {
  return (
    <Wrapper>
      <h3>Trash</h3>
      <Droppable droppableId="trash">
        {(magic) => (
          <Area ref={magic.innerRef} {...magic.droppableProps}>
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Trash;
