"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

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
  const Icon = isCompleleted ? XCircle : CheckCircle;


  return (
    <Button
      type="button"
      variant={isCompleleted ? "outline" : "success"}
      className="w-full md:w-auto"
    >
      {isCompleleted ? "Not completed": "Mark as completed"}
      <Icon className="h-4 w-4 ml-2"/>
    </Button>
  )
}