import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  sendMessage,
  receiveResponse,
  setTyping,
  clearChat,
  selectAIMessages,
  selectAIIsTyping,
} from '../store/slices/aiSlice';

export const useAI = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectAIMessages);
  const isTyping = useAppSelector(selectAIIsTyping);

  const send = useCallback(
    (content) => {
      dispatch(sendMessage(content));
      dispatch(setTyping(true));
      setTimeout(() => {
        dispatch(receiveResponse());
      }, 1200 + Math.random() * 800);
    },
    [dispatch]
  );

  const clear = useCallback(() => dispatch(clearChat()), [dispatch]);

  return { messages, isTyping, send, clear };
};
