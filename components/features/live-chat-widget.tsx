"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Bot, 
  Phone, 
  Mail, 
  MessageSquare,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface QuickAction {
  id: string
  label: string
  action: string
}

const quickActions: QuickAction[] = [
  { id: "1", label: "Product Information", action: "I need information about your seed varieties" },
  { id: "2", label: "Bulk Orders", action: "I'm interested in placing a bulk order" },
  { id: "3", label: "Technical Support", action: "I need technical support for farming" },
  { id: "4", label: "Pricing", action: "Can you provide pricing information?" },
]

const botResponses = {
  greeting: "Hello! Welcome to Savaj Seeds. I'm here to help you with any questions about our products and services. How can I assist you today?",
  product: "Great! We offer a wide variety of high-quality seeds including vegetables, grains, and specialty crops. Would you like information about a specific type of seed?",
  bulk: "Excellent! We offer competitive pricing for bulk orders. Our team can provide customized quotes based on your requirements. Let me connect you with our sales team.",
  technical: "Our agricultural experts are here to help! We provide comprehensive technical support including planting guides, pest management, and crop optimization advice.",
  pricing: "We offer competitive pricing across all our product lines. For detailed pricing information, I'll connect you with our sales team who can provide accurate quotes.",
  default: "Thank you for your message. Our team will get back to you shortly. For immediate assistance, you can also call us at +91 79 2345 6789.",
}

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isOnline, setIsOnline] = useState(true)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial greeting message
      const greetingMessage: Message = {
        id: "1",
        text: botResponses.greeting,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages([greetingMessage])
    }
  }, [isOpen, messages.length])

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes("product") || message.includes("seed") || message.includes("variety")) {
      return botResponses.product
    }
    if (message.includes("bulk") || message.includes("order") || message.includes("quantity")) {
      return botResponses.bulk
    }
    if (message.includes("technical") || message.includes("support") || message.includes("help") || message.includes("farming")) {
      return botResponses.technical
    }
    if (message.includes("price") || message.includes("cost") || message.includes("pricing")) {
      return botResponses.pricing
    }
    
    return botResponses.default
  }

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleQuickAction = (action: string) => {
    sendMessage(action)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  return (
    <>
      {/* Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
          >
            <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
            <span className="sr-only">Open chat</span>
          </Button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96">
          <Card className="shadow-2xl border-border/50">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-primary",
                      isOnline ? "bg-green-500" : "bg-gray-400"
                    )} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Savaj Seeds Support</CardTitle>
                    <div className="flex items-center gap-1 text-xs text-primary-foreground/80">
                      <Clock className="w-3 h-3" />
                      {isOnline ? "Online now" : "Offline"}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Messages Area */}
              <ScrollArea className="h-80 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-2",
                        message.sender === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.sender === "bot" && (
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-3 h-3 text-primary" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        <p>{message.text}</p>
                        <p className={cn(
                          "text-xs mt-1",
                          message.sender === "user" 
                            ? "text-primary-foreground/70" 
                            : "text-muted-foreground"
                        )}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="w-3 h-3 text-primary" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-2 justify-start">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-3 h-3 text-primary" />
                      </div>
                      <div className="bg-muted rounded-lg px-3 py-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Quick Actions */}
              {messages.length <= 1 && (
                <div className="p-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action) => (
                      <Badge
                        key={action.id}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                        onClick={() => handleQuickAction(action.action)}
                      >
                        {action.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t border-border/50">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit" size="sm" disabled={!inputValue.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                
                {/* Contact Options */}
                <div className="flex justify-center gap-4 mt-3 pt-3 border-t border-border/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => window.open("tel:+917923456789")}
                  >
                    <Phone className="w-3 h-3 mr-1" />
                    Call
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => window.open("mailto:info@savajseeds.com")}
                  >
                    <Mail className="w-3 h-3 mr-1" />
                    Email
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => window.open("https://wa.me/919173386405")}
                  >
                    <MessageCircle className="w-3 h-3 mr-1" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}