import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import AvatarWithStatus from './AvatarWithStatus';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import MessagesPaneHeader from './MessagesPaneHeader';
import { ChatProps, MessageProps } from './types';
import { primitives } from '@tauri-apps/api';

type MessagesPaneProps = {
  chat: ChatProps;
};
interface ImagesResponse {
  created: number;
  data: UrlImage[];
}

//type Image = UrlImage | B64JsonImage;

interface UrlImage {
  url: string;
  revisedPrompt?: string;
}

interface B64JsonImage {
  b64Json: string;
  revisedPrompt?: string;
}


export default function MessagesPane({ chat }: MessagesPaneProps) {
  const [chatMessages, setChatMessages] = React.useState(chat.messages);
  const [textAreaValue, setTextAreaValue] = React.useState('');

  async function imageRequest(message:string) {
    try {
      const request = {
         invoke_message: message,
         access_token: "1",
         user_id: "1",
      };
      /*
      const response: ImagesResponse = await primitives.invoke("image_request",{
        payload:request
      });
      */
     const response:ImagesResponse = await primitives.invoke("image_request",{
      payload:request
    });
      console.log('Response:', response);

      setChatMessages([
        ...chatMessages,
        {
          id: message,
          sender: 'You',
          content: response.data[0].url,
          timestamp: 'Just now',
        },
      ]);

    } catch (error) {

      console.error('Error occurred:', error);
      let error_string: string = "An error occurred";
      if (error instanceof TypeError) {
        error_string = error.toString();
      }
      setChatMessages([
        ...chatMessages,
        {
          id: message,
          sender: 'You',
          content: error_string,
          timestamp: 'Just now',
        },
      ]);

    }
  }
  
  React.useEffect(() => {
    setChatMessages(chat.messages);
  }, [chat.messages]);

  return (
    <Sheet
      sx={{
        height: { xs: 'calc(100dvh - var(--Header-height))', lg: '100dvh' },
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.level1',
      }}
    >
      <MessagesPaneHeader sender={chat.sender} />

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: 'scroll',
          flexDirection: 'column-reverse',
        }}
      >
        <Stack spacing={2} justifyContent="flex-end">
          {chatMessages.map((message: MessageProps, index: number) => {
            const isYou = message.sender === 'You';
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? 'row-reverse' : 'row'}
              >
                {message.sender !== 'You' && (
                  <AvatarWithStatus
                    online={message.sender.online}
                    src={message.sender.avatar}
                  />
                )}
                <ChatBubble variant={isYou ? 'sent' : 'received'} {...message} />
              </Stack>
            );
          })}
        </Stack>
      </Box>

      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={() => {
          const newId = chatMessages.length + 1;
          const newIdString = newId.toString();
          imageRequest(textAreaValue);
          setChatMessages([
            ...chatMessages,
            {
              id: newIdString,
              sender: 'You',
              content: textAreaValue,
              timestamp: 'Just now',
            },
          ]);
        }}
      />
    </Sheet>
  );
}
