enum Action {
  CREATE_CHAT = "create_chat",
  JOIN_CHAT = "join_chat",
  DELETE_CHAT = "delete_chat",
  CHAT = "chat",
  GET_CHATS = "get_chats",
  GET_CHAT_HISTORY = "get_chat_history",
  CHANGE_TITLE_CHAT = "change_title",
  STREAMING_CHAT = "streaming_chat",
  CHAT_WITH_LLM = "chat_with_llm",
  CHAT_WITH_RAG = "chat_with_rag",
  GET_USER_INFORMATION = "get_user_information",
  CREATE_NAME_CHAT = "create_name_chat",
}

const onmessageFunction = (getState: any, dispatch: any) => {
  return (event: MessageEvent) => {
    const socket = getState().websocket.socket;
    const response = JSON.parse(event.data);

    if (response.status === 200) {
      switch (response.action) {
        case Action.CHAT:
          break;
        case Action.CREATE_NAME_CHAT:
          break;
      }
    }
  };
};
export default onmessageFunction;
