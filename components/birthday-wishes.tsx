"use client"

import { useState, useEffect } from "react"
import { Gift, Cake, Send, List, Mail, X, ThumbsUp, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export function BirthdayWishesComponent() {
  const [isGiftOpen, setIsGiftOpen] = useState(false)
  const [wishes, setWishes] = useState<string[]>([])
  const [newWish, setNewWish] = useState("")
  const [showWishList, setShowWishList] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isLetterOpen, setIsLetterOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleOpenGift = () => {
    setIsGiftOpen(true)
    setShowWishList(false)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const handleAddWish = async() => {
    // if (newWish.trim()) {
    //   setWishes([...wishes, newWish.trim()])
    //   setNewWish("")
    //   // Here you would typically send the wish to a server
    //   console.log("Wish sent to server:", newWish.trim())
    // }
    if (newWish.trim()) {
      try {
        // 发送请求到服务器
        const response = await fetch('/api/test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ wish: newWish.trim() })
        });

        if (response.ok) {
          // 更新状态
          setWishes([...wishes, newWish.trim()]);
          setNewWish("");
          console.log("Wish sent to server:", newWish.trim());
        } else {
          console.error("Failed to send wish to server");
        }
      } catch (error) {
        console.error("Error sending wish to server:", error);
      }
    }
  }

  const handleLike = async () => {
    try {
      // 发送请求到服务器
      const response = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ liked: true })
      });

      if (response.ok) {
        // 获取响应数据
        const data = await response.json();
        // 更新状态
        setIsLiked(true);
        console.log("Like sent to server", data);
      } else {
        console.error("Failed to send like to server", response.statusText);
      }
    } catch (error) {
      console.error("Error sending like to server:", error);
    }
  }

  const toggleMusic = () => {
    const audio = document.getElementById('bgMusic') as HTMLAudioElement
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    return () => {
      const audio = document.getElementById('bgMusic') as HTMLAudioElement
      audio.pause()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-blue-200 flex items-center justify-center p-4">
      <audio id="bgMusic" loop>
        {/* <source src="https://example.com/path/to/your/music.mp3" type="audio/mpeg" /> */}
        {/* Your browser does not support the audio element. */}
      </audio>
      <Button
        onClick={toggleMusic}
        className="fixed top-4 right-4 bg-white/50 hover:bg-white/75 text-pink-600"
        variant="outline"
        size="icon"
      >
        {isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </Button>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(100)].map((_, index) => (//JavaScript的数组方法.map()来生成100个带有随机样式的<div>元素
            <div
              key={index}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}vw`,
                top: `-5vh`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                width: '4px', // 增加宽度
                height: '20px', // 保持高度较小
                borderRadius: '0%', // 移除圆角，使彩条看起来更直
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-pink-600">Happy Birthday!</CardTitle>
        </CardHeader>
        <CardContent>
          {!isGiftOpen ? (
            <Button
              onClick={handleOpenGift}
              className="w-full h-32 text-2xl bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white"
            >
              <Gift className="mr-2 h-8 w-8" /> Click me
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241018120017-680iCb3aECNMdHK2FcczFa5SYGMVF1.jpg"
                  alt="Birthday Person"
                  className="w-32 h-32 rounded-full border-4 border-pink-300"
                />
              </div>
              <Cake className="w-32 h-32 mx-auto text-pink-700" />
              
              <Button
                variant="outline"
                onClick={() => setIsLetterOpen(true)}
                className=" bg-blue-500 hover:bg-blue-600 text-white w-36 float-right"
              >
                Letter For You
                <Mail className="mr-2 h-4 w-4" /> 
              </Button>
              
              <p className="flex w-full text-center text-lg text-gray-700  rounded p-4">
                  "May your day be filled with joy and laughter!"
              </p>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="摘星辰..."
                  value={newWish}
                  onChange={(e) => setNewWish(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={handleAddWish} className="bg-blue-500 hover:bg-blue-600 text-white">
                  许愿
                  {/* <Send className="h-4 w-4" /> */}
                </Button>
              </div>
              <Button
                onClick={() => setShowWishList(!showWishList)}
                className="w-full bg-black hover:bg-gray-800 text-white"
              >
                {/* <List className="mr-2 h-4 w-4" />  */}
                {/* {showWishList ? "Hide" : "Show"} Wishes */}
                许愿池
              </Button>
              {showWishList && (
                <ul className="mt-4 space-y-2">
                  {wishes.map((wish, index) => (
                    <li key={index} className="bg-pink-100 p-2 rounded-md text-gray-700">
                      {wish}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog open={isLetterOpen} onOpenChange={setIsLetterOpen}>
        <DialogContent className="bg-pink-50 border-2 border-pink-300 ">
        <div className="absolute inset-0 bg-cover bg-center " style={{ backgroundImage: 'url(https://java-web-simon.oss-cn-beijing.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241022150924.jpg)' }}></div>
        <div className="relative z-10 bg-white bg-opacity-80 p-4 rounded-lg">
        <DialogHeader className="bg-opacity-80 bg-opacity-80">
            <DialogTitle className="text-2xl font-bold text-pink-600 ">Letter for You</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-700 bg-white p-4 bg-opacity-90">
            <p className="mb-4">Dear Augenstern,</p>
            <p className="mb-4">On this special day, I want to tell you how much you mean to me. Your presence in my life brings joy, laughter, and warmth. May this birthday be as wonderful as you are.</p>
            <p className="mb-4">Wishing you a year filled with exciting adventures, beautiful moments, and all the happiness you deserve.</p>
            <p>Happy Birthday!</p>
            <p className="mt-4">With love,</p>
            <p>Your Friend</p>
          </DialogDescription>
          <DialogFooter className="flex justify-between items-center">
            <Button onClick={handleLike} disabled={isLiked} className={isLiked ? "bg-pink-300" : "bg-pink-500 hover:bg-pink-600"}>
              <ThumbsUp className="mr-2 h-4 w-4" /> {isLiked ? "Liked!" : "Like"}
            </Button>
          </DialogFooter>
        </div>
        
        </DialogContent>
      </Dialog>
      <style jsx>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(720deg); }
        }
        .animate-confetti {
          animation: confetti-fall linear forwards;
        }
      `}</style>
    </div>
  )
}