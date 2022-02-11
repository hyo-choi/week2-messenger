import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '~store/reducers';
import { UserType } from '~types/data';
import { AvatarSizeEnum } from '~types/components';
import useMessage from '~hooks/useMessage';
import useAccess from '~hooks/useAccess';
import {
  Avatar,
  Button,
  Icon,
  ChatArea,
  MainContainer,
} from '~components/base';
import { Message, Modal } from '~components/domain';
import { COLORS } from '~constants/style';
import styled, { css, keyframes } from 'styled-components';

interface MessengerType {
  width?: string;
  height?: string;
  loginUser: UserType;
}

// 유저를 입력받으면 로그인
const Messenger = ({ loginUser, width, height }: MessengerType) => {
  const { user } = useSelector((state: RootStateType) => state.user);
  const { messages } = useSelector((state: RootStateType) => state.messages);
  const { handleUserLogin, handleClickLogoutBtn } = useAccess();
  const {
    handleChange,
    handleBtnSubmit,
    handleUserKeyPress,
    handleDelete,
    handleReply,
    chatMessage,
    chatFormError,
    submitForm,
    inputRef,
  } = useMessage();

  const chatContainer = useRef<HTMLDivElement>(null);

  // 유저 정보를 받아서 로그인
  useEffect(() => {
    handleUserLogin(loginUser);
  }, []);

  // 메세지가 보내지면 자동 스크롤
  useEffect(() => {
    if (chatContainer) {
      chatContainer.current?.addEventListener('DOMNodeInserted', (event) => {
        const target = event.currentTarget as HTMLDivElement;
        target.scroll({
          top: target.scrollHeight,
          behavior: 'smooth',
        });
      });
    }
  }, [messages]);

  // Chatarea의 입력량 늘어날 시 자동 크기 조절
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = '1px';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [chatMessage]);

  return (
    <MainContainer width={width} height={height}>
      <Modal width="30em" />
      <Wrapper>
        {/* 유저 프로필, 이름, 나가기 버튼 */}
        <Nav>
          <User>
            <Avatar
              src={user.profileImage}
              alt="user avatar image"
              size={
                Number(width) > 767
                  ? AvatarSizeEnum.Medium
                  : AvatarSizeEnum.Small
              }
            />
            <Title>{user.userName}의 채팅방</Title>
          </User>
          <Button
            children="나가기"
            contained={false}
            onClick={handleClickLogoutBtn}
          />
        </Nav>
        {/* 채팅 목록이 담기는 곳 */}

        <ChatContainer ref={chatContainer}>
          {messages.map((message) => (
            <Message
              key={message.messageId}
              message={message}
              me={message.userName === user.userName}
              onReply={handleReply}
              onDelete={handleDelete}
            />
          ))}
        </ChatContainer>
        {/* 메세지 입력 폼 */}
        <ChatFormContainer>
          <ChatForm chatFormError={chatFormError} onSubmit={submitForm}>
            <ChatLabel chatFormError={chatFormError}>
              Message
              <ChatArea
                value={chatMessage}
                error={chatFormError}
                onKeyPress={handleUserKeyPress}
                onChange={handleChange}
                ref={inputRef}
              />
            </ChatLabel>
            <Icon
              name="send"
              size={36}
              color={chatFormError ? COLORS.ERROR_COLOR : COLORS.PRIMARY}
              onClick={handleBtnSubmit}
            />
          </ChatForm>
        </ChatFormContainer>
      </Wrapper>
    </MainContainer>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 16px;
  @media screen and (max-width: 767px) {
    padding: 0;
  }
`;

const Nav = styled.nav`
  position: sticky:
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 2px solid ${COLORS.PRIMARY};
`;

const User = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Title = styled.h2`
  margin-left: 12px;
  font-size: 1.6rem;
  color: ${COLORS.PRIMARY};
  line-height: 1.46;
  @media screen and (max-width: 767px) {
    margin-left: 6px;
    font-size: 1.2rem;
  }
`;

const ChatContainer = styled.div`
  height: 85%;
  padding: 20px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 767px) {
    padding: 20px 0;
  }
`;

const ChatFormContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px 20px 30px;
  background: ${COLORS.WHITE};
  @media screen and (max-width: 767px) {
    padding: 10px 0 30px;
  }
`;

const ChatForm = styled.form<{ chatFormError: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 6px 12px;
  border: 1px solid ${COLORS.PRIMARY};
  border-radius: 30px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  ${(props) =>
    props.chatFormError
      ? css`
          border: 1px solid red;
          animation: ${wiggling} 1s;
        `
      : css`
          animation: none;
        `}
  @media screen and (max-width: 767px) {
    border: none;
    padding: 0;
    box-shadow: none;
  }
`;

const ChatLabel = styled.label<{ chatFormError: boolean }>`
  display: flex;
  flex-direction: column;
  align-item: flex-start;
  width: 100%;
  margin: 0 10px;
  font-size: 12px;
  color: ${(props) =>
    props.chatFormError ? COLORS.ERROR_COLOR : COLORS.PRIMARY};
`;

const wiggling = keyframes`
  0% {
    transform: rotate(0deg);
  }
  10%{
    transform: rotate(3deg);
  }
  20%{
    transform: rotate(-3deg);
  }
  30%{
    transform: rotate(2deg);
  }
  40%{
    transform: rotate(-2deg);
  }
  50%{
    transform: rotate(1deg);
  }
  60%{
    transform: rotate(-1deg);
  }
  70%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(0deg);
  }
`;

export default Messenger;
