import React, { useState } from "react";
import { Badge, Button, Card, Form, ListGroup } from "react-bootstrap";
import {
  FaComments,
  FaPaperPlane,
  FaTimes,
  FaUser,
} from "react-icons/fa";

interface Message {
  id: string;
  sender: "user" | "support";
  text: string;
  timestamp: Date;
}

export const ChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "support",
      text: "Xin chào! Chúng tôi có thể giúp gì cho bạn?",
      timestamp: new Date(),
    },
  ]);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: message,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate support response
    setTimeout(() => {
      const supportReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: "support",
        text: "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong giây lát.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, supportReply]);
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    }, 1500);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 9999,
          }}
        >
          <Button
            variant="primary"
            size="lg"
            className="rounded-circle shadow-lg"
            onClick={handleToggle}
            style={{
              width: "60px",
              height: "60px",
              position: "relative",
            }}
          >
            <FaComments size={24} />
            {unreadCount > 0 && (
              <Badge
                bg="danger"
                pill
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  fontSize: "12px",
                }}
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card
          className="shadow-lg"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "350px",
            height: "500px",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <FaComments />
              <strong>Hỗ trợ trực tuyến</strong>
            </div>
            <Button
              variant="link"
              className="text-white p-0"
              onClick={handleToggle}
            >
              <FaTimes size={20} />
            </Button>
          </Card.Header>

          {/* Messages */}
          <Card.Body
            className="flex-grow-1 overflow-auto"
            style={{
              maxHeight: "360px",
              backgroundColor: "#f8f9fa",
            }}
          >
            <ListGroup variant="flush">
              {messages.map((msg) => (
                <ListGroup.Item
                  key={msg.id}
                  className="border-0 bg-transparent px-2 py-2"
                >
                  <div
                    className={`d-flex ${
                      msg.sender === "user"
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    <div
                      className={`rounded-3 px-3 py-2 ${
                        msg.sender === "user"
                          ? "bg-primary text-white"
                          : "bg-white border"
                      }`}
                      style={{
                        maxWidth: "80%",
                      }}
                    >
                      {msg.sender === "support" && (
                        <div className="small text-muted mb-1">
                          <FaUser className="me-1" />
                          Hỗ trợ viên
                        </div>
                      )}
                      <div>{msg.text}</div>
                      <div
                        className={`small mt-1 ${
                          msg.sender === "user"
                            ? "text-white-50"
                            : "text-muted"
                        }`}
                        style={{ fontSize: "10px" }}
                      >
                        {msg.timestamp.toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>

          {/* Input */}
          <Card.Footer className="bg-white border-top">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!message.trim()}
                >
                  <FaPaperPlane />
                </Button>
              </div>
            </Form>
          </Card.Footer>
        </Card>
      )}
    </>
  );
};

export default ChatBox;
