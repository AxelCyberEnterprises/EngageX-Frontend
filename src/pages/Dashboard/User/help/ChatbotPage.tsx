import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/store/slices/ChatbotSlice";
import { RootState } from "@/store/rootReducer";
import { Message } from "@/store/slices/ChatbotSlice";
import AIAvatar from "@/assets/images/svgs/ai-avatar.svg";
import AIGlobe from "@/assets/images/pngs/ai-image.png";
import { useNavigate } from "react-router-dom";

const Chat: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
  const chatboxRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);

  const handleSend = (e: any) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage: Message = {
        text: input,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      dispatch(addMessage(userMessage));
      setInput("");

      setIsBotTyping(true);
      setTimeout(() => {
        const botMessage: Message = {
          text: "Hello! How can I assist you?",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        dispatch(addMessage(botMessage));
        setIsBotTyping(false);
      }, 1000);
    }
  };

  const scrollToBottom = () => {
    if (chatboxRef.current) {
      const container = chatboxRef.current;
      const start = container.scrollTop;
      const end = container.scrollHeight - container.clientHeight;
      const duration = 500;
      let startTime: number | null = null;

      const animateScroll = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeInOut =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        container.scrollTop = start + (end - start) * easeInOut;

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = () => {
    if (chatboxRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatboxRef.current;
      setIsAtBottom(scrollHeight - scrollTop === clientHeight);
    }
  };

  return (
    <div className=" h-[calc(100vh-13rem)] relative w-full mx-auto">
      <section className="w-full border-y bg-white flex items-start text-[#262b3a] py-2 px-7 mb-2 gap-2">
        <button
          className="bg-transparent hover:bg-transparent mt-0.5 p-0"
          onClick={() => navigate(-1)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12.8945L11 6.89453M5 12.8945L11 18.8945M5 12.8945H19"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div>
          <p className="text-xl">AI Chatbot</p>
          <p className=" text-[rgba(71,77,99,1)] text-sm">
            A conversational tool for questions, support and answers about
            engage
            <span className="text-[#64BA9E]">X</span>
          </p>
        </div>
      </section>
      <div
        ref={chatboxRef}
        className=" h-[calc(100vh-13rem-2.5rem)] px-7 pb-14 pt-5  bg-white overflow-y-auto"
        onScroll={handleScroll}
      >
        {messages.length === 0 ? (
          <div className="text-center flex flex-col items-center gap-4">
            <img src={AIGlobe} className="w-48 -mt-3" alt="AI globe" />
            <p className="font-medium text-xl -mt-10">
              Ask about our <br /> services here
            </p>
            <p className="text-[#a5b8c3] text-sm">
              Ready to assist you with everything you need to know, <br />
              from answering questions to giving recommendations
            </p>
            <section className="text-[#4c5c75] text-sm mt-8 font-[montserrat] max-w-[41.5rem] flex max-sm:flex-col gap-2">
              <div className="border flex items-center border-[#a5b8c3] rounded-md p-2 py-6">
                <p>When was EngageX created and why was it created</p>
              </div>
              <div className="border flex items-center border-[#a5b8c3] rounded-md p-2 py-6">
                <p>
                  Explain how this platform can be used as a first-time user
                </p>
              </div>
              <div className="border flex items-center border-[#a5b8c3] rounded-md p-2 py-5">
                <p>Is there a refund policy after paying for subscription</p>
              </div>
            </section>
          </div>
        ) : (
          messages.map((msg: Message, index: number) => (
            <div
              key={index}
              className={`mb-8  font-[montserrat] overflow-y-auto text-[12px] ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              {msg.sender === "bot" && (
                <div className="flex items-center space-x-2">
                  <img
                    src={AIAvatar}
                    alt="AI Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="inline-block px-4 py-2 text-sm rounded-lg text-[#1e293b] bg-transparent font-medium border max-w-[70%] break-words">
                    {msg.text}
                    <p className="text-xs float-right ml-4 text-gray-500  sm:mt-2">
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              )}
              {msg.sender === "user" && msg.text && (
                <div className="px-4 py-2 rounded-lg bg-[#6f7c8e] text-sm inline-block font-medium text-white max-w-[70%] break-words shadow">
                  {msg.text}
                  <p className="text-xs text-gray-300 float-right ml-4 mt-2">
                    {msg.timestamp}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
        {!isAtBottom && (
          <button
            onClick={scrollToBottom}
            className="fixed z-50 max-md:left-0 md:-translate-x-[calc(80vw/2)] right-0 bottom-36 sm:bottom-28 mx-auto w-fit p-3 bg-[#262b3a] text-white rounded-full shadow-lg hover:bg-[#64BA9E] transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3.5L8 12.5M8 12.5L12 8.5M8 12.5L4 8.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {isBotTyping && (
          <div className="flex items-center space-x-2">
            <img
              src={AIAvatar}
              alt="AI Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className=" typing-dots text-5xl px-4 py-0 rounded-lg text-[#1e293b] flex items-start -mt-2.5 bg-transparent  w-fit">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          </div>
        )}
      </div>

      <div className=" justify-center flex flex-col px-7 bg-white sticky  items-center bottom-0 top-0 pb-5 sm:pb-1  ">
        <form
          onSubmit={handleSend}
          className="flex rounded-4xl w-full placeholder:text-[#475569] sm:w-4/5 items-center px-4 py-2 border border-gray-300 shadow space-x-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 text-[#262b3a] w-full border-none outline-none"
            placeholder="Message chatbot..."
          />
          <button
            type="submit"
            className={`p-3 px-3.5 ${
              input === ""
                ? "bg-gray-600 text-muted-foreground"
                : "bg-[#262b3a] text-white"
            } rounded-4xl hover:bg-[#64BA9E] transition-colors shadow-md`}
          >
            <svg
              width="16"
              height="19"
              viewBox="0 0 16 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.9844 8.8603L13.9843 8.86024L9.15713 4.03305L9.07711 3.95303V4.0662V17.8475C9.07711 18.1334 8.96352 18.4076 8.76133 18.6098C8.55914 18.812 8.28492 18.9256 7.99898 18.9256C7.71305 18.9256 7.43882 18.812 7.23663 18.6098C7.03445 18.4076 6.92086 18.1334 6.92086 17.8475V4.0662V3.95306L6.84084 4.03305L2.01178 8.86024L2.01177 8.86024C1.80922 9.0628 1.5345 9.17659 1.24805 9.17659C0.961591 9.17659 0.68687 9.0628 0.484316 8.86024C0.281762 8.65769 0.167969 8.38297 0.167969 8.09651C0.167969 7.81006 0.281762 7.53534 0.484316 7.33278L7.23432 0.582783L7.23437 0.582725C7.33453 0.482215 7.45355 0.402466 7.5846 0.348051C7.71565 0.293636 7.85615 0.265625 7.99804 0.265625C8.13994 0.265625 8.28044 0.293636 8.41149 0.348051C8.54254 0.402466 8.66156 0.482215 8.76172 0.582725L8.76178 0.582783L15.5118 7.33278L15.5118 7.33284C15.6123 7.433 15.6921 7.55202 15.7465 7.68307C15.8009 7.81412 15.8289 7.95462 15.8289 8.09651C15.8289 8.23841 15.8009 8.37891 15.7465 8.50996C15.6921 8.64101 15.6123 8.76002 15.5118 8.86018L15.5117 8.8603C15.4116 8.96081 15.2925 9.04056 15.1615 9.09497C15.0304 9.14939 14.8899 9.1774 14.748 9.1774C14.6061 9.1774 14.4656 9.14939 14.3346 9.09497C14.2036 9.04056 14.0845 8.96081 13.9844 8.8603Z"
                fill="white"
                stroke="white"
                strokeWidth="0.09375"
              />
            </svg>
          </button>
        </form>

        <div className="text-center text-[#94a3b8] text-sm mt-1">
          Engage<span className="text-[#64BA9E]">X</span> chatbot can make
          mistakes. Check out{" "}
          <a href="../help/safety" className="hover:underline">
            Terms & Conditions
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default Chat;
