// import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Avatar } from "antd";
import { useState } from "react";
import EditTaskModal from "./EditTaskModal";

interface ContainerProps {
  isDragging: boolean;
}

const Container = styled.div<ContainerProps>`
  border-radius: 10px;
  box-shadow: 5px 5px 5px 2px grey;
  padding: 8px;
  color: #000;
  margin-bottom: 8px;
  min-height: 120px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${(props) => bgcolorChange(props)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const TextContent = styled.div``;

const Icons = styled.div`
  display: flex;
  justify-content: end;
  padding: 2px;
`;
function bgcolorChange(props: any) {
  return props.isDragging
    ? "lightgreen"
    : props.isDraggable
    ? props.isBacklog
      ? "#F2D7D5"
      : "#DCDCDC"
    : props.isBacklog
    ? "#F2D7D5"
    : "#EAF4FC";
}

export default function Card({ task, index }: { task: any; index: number }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);

  const handleCancel = () => setIsModalVisible(false);

  const handleFormSuccess = () => {};

  return (
    <>
      <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            onClick={showModal}
          >
            <div
              style={{ display: "flex", justifyContent: "start", padding: 2 }}
            >
              <span>
                <small
                  style={{
                    display: "inline-block",
                    width: "40px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  #{task.id}
                  {"  "}
                </small>
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "center", padding: 2 }}
            >
              <TextContent>{task.title}</TextContent>
            </div>
            <Icons>
              <div>
                <Avatar
                  onClick={() => console.log(task)}
                  src={`https://loremflickr.com/320/${task.id}`}
                />
              </div>
            </Icons>
            {/* {provided.placeholder} */}
          </Container>
        )}
      </Draggable>
      <EditTaskModal
        visible={isModalVisible}
        onClose={handleCancel}
        task={task} // Pass task data to modal
        onSuccess={handleFormSuccess}
      />
    </>
  );
}
