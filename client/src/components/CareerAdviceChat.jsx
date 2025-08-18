import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ADVICE_API_END_POINT } from "../utils/constant";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formatTime = (date) =>
  new Intl.DateTimeFormat("default", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

const aiAvatar =
  "https://ui-avatars.com/api/?name=AI&background=22c55e&color=fff&size=64";

const CareerAdviceChat = () => {
  const { user } = useSelector((store) => store.auth);
  const userAvatar =
    user?.profile?.profilePhoto ||
    "https://ui-avatars.com/api/?name=User&background=2563eb&color=fff&size=64";
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("career_chat");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("career_chat", JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!user && !hasRedirected.current) {
      setMessages([]);
      localStorage.removeItem("career_chat");
      toast.info("Login first for career advice");
     
      hasRedirected.current = true;
       setTimeout(() => {
        navigate("/login");
      }, 1000*3); 
    }
  }, [user, navigate]);

  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    const userMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setIsTyping(true);

    try {
      const res = await axios.post(
        `${ADVICE_API_END_POINT}/chat`,
        { message: input },
        { withCredentials: true }
      );

      setTimeout(() => {
        const aiMessage = {
          role: "ai",
          content: res.data.reply,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setLoading(false);
        setIsTyping(false);
      }, 600); // Simulated delay
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: " Error: Unable to get advice.",
          timestamp: new Date().toISOString(),
        },
      ]);
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && input.trim() && user) {
      e.preventDefault();
      sendMessage();
    }
  };

  const copyChatToClipboard = async () => {
    const chatText = messages
      .map(
        (msg) =>
          `[${formatTime(new Date(msg.timestamp))}] ${
            msg.role === "user" ? "You" : "AI"
          }: ${msg.content}`
      )
      .join("\n");

    try {
      await navigator.clipboard.writeText(chatText);
      toast.success("Chat copied to clipboard!");
    } catch {
      toast.error("Failed to copy chat.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 shadow-xl rounded-xl flex flex-col h-[calc(100vh-70px)] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      {/* Header */}
      <div className="p-2 border-b flex justify-between items-center bg-white dark:bg-zinc-800 rounded-t-xl">
        <div className="flex items-center">
          <h2 className="text-3xl px-5 font-bold text-indigo-900 dark:text-blue-200">
            Clara{" "}
            <span className="text-xs font-normal ">
              {" "}
              {"( Your Career Guide Powered by Gemini )"}
            </span>
          </h2>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={copyChatToClipboard}
            className="hover:bg-zinc-200 dark:hover:bg-zinc-300 transition"
          >
            Copy
          </Button>
          <Button
            variant="destructive"
            onClick={() => setOpenDialog(true)}
            className="hover:bg-red-600 dark:hover:bg-red-700 transition"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Chat area */}
      <ScrollArea className="flex-grow px-2 py-1  overflow-y-auto">
        <div className="flex flex-col gap-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex items-end gap-2 max-w-full">
                {msg.role === "ai" && (
                  <img
                    src={aiAvatar}
                    alt="AI"
                    className="w-8 h-8 rounded-full shadow"
                  />
                )}
                <div
                  className={`max-w-[95vw] md:max-w-3xl p-4 rounded-xl shadow ${
                    msg.role === "user"
                      ? "bg-white text-black"
                      : "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  }`}
                >
                  <div className="whitespace-pre-wrap">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                  <div className="text-xs text-zinc-400 mt-2 font-mono text-right">
                    {formatTime(new Date(msg.timestamp))}
                  </div>
                </div>
                {msg.role === "user" && (
                  <img
                    src={userAvatar}
                    alt="User"
                    className="w-8 h-8 rounded-full shadow"
                  />
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2">
                <img
                  src={aiAvatar}
                  alt="AI"
                  className="w-8 h-8 rounded-full shadow"
                />
                <div className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white p-4 rounded-xl shadow flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-green-600 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  AI is typing...
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input fixed at bottom */}
      <div className="py-2 px-2 border-t bg-white dark:bg-zinc-900 rounded-b-xl flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading || !user}
          placeholder={user ? "   Ask Anything   " : "  Please login to chat  "}
          rows={1}
          className="resize-none border border-zinc-300 dark:border-zinc-700 focus:border-blue-400 dark:focus:border-blue-500 transition flex-1 text-md py-1 rounded-2xl"
        />
        <div className="py-2">
        <Button
          onClick={sendMessage}
          disabled={loading || !input.trim() || !user}
          className=" min-w-[100px] h-12 text-md bg-indigo-600 dark:bg-indigo-700 font-semibold shadow hover:bg-blue-700 dark:hover:bg-blue-800 transition"
        >
          {loading ? (
            <svg className="animate-spin h-4 w-4 mx-auto" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          ) : (
            "Send"
          )}
        </Button>
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently clear your
              chat history.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setMessages([]);
                localStorage.removeItem("career_chat");
                setOpenDialog(false);
              }}
            >
              Confirm Clear
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CareerAdviceChat;
