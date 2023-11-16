"use client";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import axios from "axios";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  isCompleleted?: boolean;
  nextChapterId?: string;
};

export const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleleted,
  nextChapterId
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      
      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
        isCompleleted: !isCompleleted
      });

      if (!isCompleleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
      
      toast.success("Progress updated.");
      router.refresh();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);    
    }
  }

  const Icon = isCompleleted ? XCircle : CheckCircle;


  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleleted ? "outline" : "success"}
      className="w-full md:w-auto"
    >
      {isCompleleted ? "Not completed": "Mark as completed"}
      <Icon className="h-4 w-4 ml-2"/>
    </Button>
  )
}