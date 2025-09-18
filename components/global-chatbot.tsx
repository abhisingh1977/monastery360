"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Bot, User, MapPin, Calendar, Camera, Archive } from "lucide-react"

interface Message {
  id: number
  type: "user" | "bot"
  content: string
  timestamp: Date
  suggestions?: string[]
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: "bot",
    content: "Namaste 🙏 I am your Monastery Guide. How may I help you explore Sikkim's sacred heritage today?",
    timestamp: new Date(),
    suggestions: [
      "Tell me about Rumtek Monastery",
      "What festivals are coming up?",
      "Show me virtual tours",
      "Find ancient manuscripts",
    ],
  },
]

const quickResponses = [
  {
    icon: MapPin,
    text: "Find monasteries near me",
    response:
      "I can help you locate monasteries in Sikkim! The closest major monasteries to most visitors are Rumtek Monastery (16km from Gangtok) and Enchey Monastery (3km from Gangtok). Would you like directions to any specific monastery?",
  },
  {
    icon: Calendar,
    text: "Upcoming festivals",
    response:
      "Here are the upcoming monastery festivals: Losar Festival at Rumtek Monastery (Feb 15), Chaam Dance at Pemayangtse (Mar 8), and Buddha Purnima at multiple locations (May 12). Would you like more details about any of these events?",
  },
  {
    icon: Camera,
    text: "Virtual tour options",
    response:
      "Our virtual tours offer immersive 360° experiences of sacred spaces! You can explore the Main Prayer Hall, Buddha Statue Chamber, Meditation Garden, Ancient Library, and Monks' Quarters. Each tour includes AI-powered narration in multiple languages. Which monastery would you like to visit virtually?",
  },
  {
    icon: Archive,
    text: "Digital archives",
    response:
      "Our digital archives contain over 1,247 preserved items including ancient manuscripts, murals, artifacts, and cultural treasures. You can search by type, century, or monastery. Are you looking for something specific like Buddhist texts, artwork, or historical documents?",
  },
]

export default function GlobalChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(content.trim())
      const botMessage: Message = {
        id: Date.now() + 1,
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("rumtek")) {
      return "Rumtek Monastery is the largest monastery in Sikkim and the seat of the Karmapa. Built in the 16th century, it houses precious relics and offers stunning views. You can take a virtual tour, check upcoming events, or get directions. What would you like to know more about?"
    }

    if (input.includes("festival") || input.includes("event")) {
      return "Upcoming festivals include Losar (Tibetan New Year) on Feb 15 at Rumtek, Chaam Dance on Mar 8 at Pemayangtse, and Buddha Purnima on May 12 at multiple locations. Each festival has unique cultural significance and rituals. Would you like details about any specific festival?"
    }

    if (input.includes("tour") || input.includes("visit")) {
      return "Our virtual tours offer immersive 360° experiences with AI narration in English, Hindi, Nepali, and Sikkimese. You can explore prayer halls, meditation gardens, and ancient libraries. Which monastery interests you most?"
    }

    if (input.includes("manuscript") || input.includes("archive")) {
      return "Our digital archives preserve over 1,200 cultural treasures including palm leaf manuscripts, ancient murals, and ritual artifacts. You can search by monastery, century, or type. Are you researching something specific?"
    }

    if (input.includes("direction") || input.includes("location")) {
      return "I can provide directions to any monastery in Sikkim! Most are accessible by road from Gangtok. Rumtek is 16km away, Enchey is 3km, and Pemayangtse is about 110km. Which monastery would you like directions to?"
    }

    if (input.includes("thank") || input.includes("thanks")) {
      return "You're most welcome! I'm here to help you explore Sikkim's rich monastery heritage. Feel free to ask about festivals, virtual tours, historical information, or anything else about our sacred sites. 🙏"
    }

    return "I understand you're interested in learning more about Sikkim's monasteries. I can help with information about locations, festivals, virtual tours, historical archives, and cultural significance. Could you be more specific about what you'd like to explore?"
  }

  const handleQuickResponse = (response: string) => {
    handleSendMessage(response)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageCircle className="h-6 w-6 text-white" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] z-50"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="shadow-2xl border-amber-200 bg-white">
              <CardHeader className="bg-gradient-to-r from-amber-600 to-red-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold">Monastery Guide</div>
                      <div className="text-xs text-amber-100">AI Assistant</div>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white text-xs">Online</Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                {/* Messages Area */}
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.type === "user"
                              ? "bg-amber-600 text-white"
                              : "bg-gradient-to-br from-amber-500 to-red-500 text-white"
                          }`}
                        >
                          {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>
                        <div
                          className={`rounded-lg p-3 ${
                            message.type === "user" ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          {message.suggestions && (
                            <div className="mt-3 space-y-1">
                              {message.suggestions.map((suggestion, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="block w-full text-left text-xs bg-white/20 hover:bg-white/30 rounded px-2 py-1 transition-colors"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-red-500 rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex space-x-1">
                            <motion.div
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.2 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.4 }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Quick Response Buttons */}
                <div className="p-4 border-t bg-gray-50">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {quickResponses.map((response, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickResponse(response.text)}
                        className="flex items-center space-x-2 p-2 text-xs bg-white border border-amber-200 rounded-lg hover:bg-amber-50 hover:border-amber-300 transition-colors"
                      >
                        <response.icon className="h-3 w-3 text-amber-600" />
                        <span className="text-gray-700 truncate">{response.text}</span>
                      </button>
                    ))}
                  </div>

                  {/* Input Area */}
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                      placeholder="Ask about monasteries, festivals, tours..."
                      className="flex-1 text-sm"
                    />
                    <Button
                      onClick={() => handleSendMessage(inputValue)}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-3"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
