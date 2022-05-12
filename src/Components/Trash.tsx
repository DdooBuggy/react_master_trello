import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 300px;
  height: 50px;
  background-color: ${(props) => props.theme.deleteColor};
  margin: 20px 0;
  border-radius: 5px;
`;

const Area = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.boardColor};
`;

function Trash() {
  return (
    <Wrapper>
      <Droppable droppableId="trash">
        {(magic) => (
          <Area ref={magic.innerRef} {...magic.droppableProps}>
            {magic.placeholder}
            <FontAwesomeIcon icon={solid("trash-can")} />
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Trash;
