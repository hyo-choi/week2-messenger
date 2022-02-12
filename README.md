<h1>원티드 프리온보딩 코스 2주차 기업과제<br />
메신저 📈</h1>

## 🚀 배포

🔗 **과제물**(netlify): https://park-is-best-messenger.netlify.app/ <br>
🔗 **Figma**: https://www.figma.com/file/dmdlBIixqcime5DQUtgeZu/week2_messenger?node-id=0%3A1

## 🧑‍🤝‍🧑 팀 소개

### 저희는 Team **박이최고** 입니다.

| | 팀원 | 역할 | 
|------------------------------------------------------------ |----------------------------------------------------- |--------------------- | 
| ![](https://avatars.githubusercontent.com/u/68905615?s=25) | 고동현 [@brad-go](https://github.com/brad-go) | (팀장) IconButton, Button, Messenger 컴포넌트 구현  |
| ![](https://avatars.githubusercontent.com/u/71081893?s=25) | 이소진 [@krungy](https://github.com/krungy) | Input, ChatArea, Modal, Login 컴포넌트 구현 | 
| ![](https://avatars.githubusercontent.com/u/57004991?s=25) | 최효정 [@hyo-choi](https://github.com/hyo-choi) | MainContainer, Avatar, Message 컴포넌트 구현 | 

<br>

## 🪄 프로젝트 실행 방법

1. git clone하여 프로젝트를 내려받습니다.
   ```bash
   git clone https://github.com/OnBoarding-Park-is-best/week2-messenger.git
   ```
2. 아래 커맨드로 패키지를 설치합니다.
   ```bash
   yarn install
   ```
5. 아래 커맨드로 프로젝트를 실행합니다.
   ```bash
   yarn start
   ```

<br>

## 🧰 기술 스택 및 구현 사항

![](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white) ![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) ![](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=Storybook&logoColor=white) ![](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white)

## 📚 전체 구현사항

- 간단한 채팅을 할 수 있는 메신저를 구현합니다.

### 팀내 결정사항

#### 피그마를 통한 UI DESIGN

 정해진 디자인 기준이 없어서 피그마를 통해서 디자인을 미리 제작 후 만들기로함!

#### 타입스크립트 사용: 컴포넌트 타입 지정 방식

```tsx
interface SampleComponentProps {
  onClick: React.MouseEventHandler;
  selected?: boolean;
}

const SampleComponent = ({ onClick, selected }: **SampleComponentProps**) => {
  return <div onClick={onClick}>{selected ? 'yes' : 'no'}</div>;
};
```

- React.FC 대신 Props용 interface를 사용합니다.
- 함수형 컴포넌트의 return type(JSX.Element)은 생략합니다.

#### 반응형 기준

```css
@media screen and (max-width:767px) {
  /* 모바일 */
}
```

- 767px을 기준으로 모바일 환경(반응형)을 구성합니다.
- PC 환경을 기준으로 CSS를 작성한 후 모바일 환경에 대한 CSS를 작성합니다.

#### 스토리북 사용: story 제목 ([링크](https://github.com/OnBoarding-Park-is-best/week2-partners-dashboard/blob/develop/src/components/SampleComponent/SampleComponent.stories.tsx#L6))

```jsx
export default {
  title: 'base/SampleComponent',
  component: SampleComponent,
} as ComponentMeta<typeof SampleComponent>;
```

- base/컴포넌트명
- domain/컴포넌트명

#### redux에서 관리할 데이터 모델

- user id
- userName
- profileImage
- messageId
- content
- date
### 요구사항

- 레이아웃 (일반적인 메신저 레이아웃)
   - [x] 입력창 과는 별도로 대화목록만 스크롤 가능합니다.
   - [x] 프로필 이미지는 원형으로 왼쪽에 보입니다.
   - [x] 오른쪽 컨텐츠 영역 상단에는 이름과 보낸 날짜 하단에는 보낸 메시지의 내용이 출력됩니다.
   - [x] 메시지의 가장 오른쪽에는 삭제 버튼과 답장 버튼이 존재합니다.
- 기능
    - 입력창
        - [x] 엔터키로 메세지 전송할 수 있습니다. 
        - [x] shift + 엔터키로 줄바꿈 할 수 있습니다.
        - [x] 컨텐츠를 입력하지 않으면 전송할 수 없습니다.
    - 대화목록
        - [x] 메시지의 정렬은 과거 부터 최신 순으로 정렬됩니다.
        - [x] 메시지를 보낼때 대화목록은 항상 가장 아래로 스크롤 됩니다.
        - [x] 대화목록은 미리 생성된 데이터로 3명이 5건의 메시지를 주고 받는 내용이 출력됩니다.
    - 메시지
        - [x] 내가 전송한 메시지의 경우 이름 옆에 * 문자가 출력됩니다.
        - [x] 보낸 날짜의 경우 yyyy-mm-dd hh:MM:ss 포멧으로 출력됩니다. (사용자의 시간대로 출력)
        - [x] 답장을 클릭하면 "사용자 이름\n" + "메시지 내용\n" + "(회신)\n" 문자가 입력창에 자동으로 삽입됩니다. (\n 개행, 입력창에 내용이 존재할때는 입력된 내용 앞에 입력됩니다.
        - [x] 삭제 버튼을 클릭하면 "*** 메시지를 삭제하시겠습니까?" 라는 메시지가 출력되며 응답시 삭제됩니다. (***은 메시지 내용중 최대 10자 까지 보여주며 뒤에는 ... 처리됩니다.)
### 팀원별 분담한 기능

### 공통사항

- Redux를 통한 상태 관리 
- 피그마를 통한 UI 디자인

### :checkered_flag:\_고동현

- 피그마 svg를 활용한 **Icon** 컴포넌트 구현
- **Button** 컴포넌트 구현
- 간단한 대화를 할 수 있는 **Messenger** 컴포넌트 구현

### :bus:\_최효정

- **MainContainer** 컴포넌트 반응형 구현
- **Avatar** 컴포넌트 구현
- 유저와 날짜, 대화 내용을 보여주는 **Message** 컴포넌트 구현

### :flower_playing_cards:\_이소진

- base: **Input**, **ChatArea** 컴포넌트 구현
- domain: **Modal**, **Login** 컴포넌트 구현

### 공통 작업

:white_check_mark: 마크업 및 스타일링  :white_check_mark: 컴포넌트 조합 및 로직 구현 <br>

## 📂 디렉토리 구조

```bash
.
├── assets
├── components
│   ├── base
│   │   ├── Avatar
│   │   ├── Button
│   │   ├── ChatArea
│   │   ├── Icon
│   │   ├── Input
│   │   └── MainContainer
│   └── domain
│       ├── Login
│       ├── Message
│       ├── Messenger
│       └── Modal
├── constants
├── hooks
├── store
│   ├── actions
│   └── reducers
├── styles
├── types
└── utils
```